import random
import math
import os
from PIL import Image, ImageDraw, ImageFont, ImageTk
import tkinter as tk

class PointTracingGame:
    def __init__(self, root, image_directory):
        self.root = root
        self.root.title("Point Tracing Game")
        self.image_directory = image_directory
        self.setup_game()

    def setup_game(self):
        self.bg_image = self.load_random_image()
        self.width, self.height = self.bg_image.size
        self.num_points = random.randint(3, 5)
        self.points_image, self.points = self.create_points_image()
        self.combined_image = Image.alpha_composite(self.bg_image.convert('RGBA'), self.points_image)

        self.tk_image = ImageTk.PhotoImage(self.combined_image)
        self.canvas = tk.Canvas(self.root, width=self.width, height=self.height)
        self.canvas.create_image(0, 0, anchor=tk.NW, image=self.tk_image)
        self.canvas.pack()

        self.feedback_label = tk.Label(self.root, text="Trace the points in order!", font=("Arial", 16))
        self.feedback_label.pack(pady=10)

        self.reset_game_state()
        self.bind_events()
        self.root.after(15000, self.stop_tracing_due_to_timeout)

    def reset_game_state(self):
        self.traced_path = []
        self.mouse_movements = []
        self.is_drawing = False
        self.visited_order = []
        self.lines_connected = []
        self.tracing_active = True

    def bind_events(self):
        self.canvas.bind("<Button-1>", self.on_click)
        self.canvas.bind("<B1-Motion>", self.on_draw)
        self.canvas.bind("<ButtonRelease-1>", self.on_release)

    def load_random_image(self):
        image_files = [os.path.join(root, file)
                       for root, _, files in os.walk(self.image_directory)
                       for file in files if file.lower().endswith(('.png', '.jpg', '.jpeg'))]
        return Image.open(random.choice(image_files)).resize((500, 500))

    def create_points_image(self):
        image = Image.new('RGBA', (self.width, self.height), (255, 255, 255, 0))
        draw = ImageDraw.Draw(image)
        font = ImageFont.truetype("arialbd.ttf", 32) if os.path.exists("arialbd.ttf") else ImageFont.load_default()

        points = []
        margin, dot_radius, min_distance = 50, 20, 50

        for i in range(self.num_points):
            while True:
                x, y = random.randint(margin, self.width - margin), random.randint(margin, self.height - margin)
                if all(math.hypot(x - px, y - py) >= min_distance for px, py in points):
                    points.append((x, y))
                    draw.ellipse((x - dot_radius, y - dot_radius, x + dot_radius, y + dot_radius), fill=(255, 0, 0, 255))
                    text = str(i + 1)
                    bbox = draw.textbbox((0, 0), text, font=font)
                    text_x, text_y = x - (bbox[2] - bbox[0]) // 2, y - (bbox[3] - bbox[1]) // 2
                    draw.text((text_x, text_y), text, fill=(255, 255, 255), font=font)
                    break

        return image, points

    def on_click(self, event):
        if not self.tracing_active or len(self.lines_connected) >= self.num_points - 1:
            return
        self.is_drawing = True
        self.traced_path.append((event.x, event.y))
        self.mouse_movements.append((event.x, event.y))
        self.canvas.create_oval(event.x - 5, event.y - 5, event.x + 5, event.y + 5, fill="blue")

    def on_draw(self, event):
        if not self.tracing_active or not self.is_drawing or len(self.lines_connected) >= self.num_points - 1:
            return
        last_x, last_y = self.traced_path[-1]
        self.traced_path.append((event.x, event.y))
        self.canvas.create_line(last_x, last_y, event.x, event.y, fill="blue", width=3)
        self.mouse_movements.append((event.x, event.y))

    def on_release(self, event):
        if not self.tracing_active:
            return
        self.is_drawing = False
        self.check_order()

    def check_order(self):
        self.visited_order = []
        for trace in self.traced_path:
            for i, point in enumerate(self.points):
                if self.is_near(point, trace):
                    if len(self.visited_order) == 0 and i == 0:
                        self.visited_order.append(i)
                    elif len(self.visited_order) > 0 and i == len(self.visited_order):
                        self.visited_order.append(i)
                        if len(self.visited_order) > 1:
                            self.lines_connected.append((self.visited_order[-2], self.visited_order[-1]))
                        break

        if len(self.visited_order) == self.num_points and len(self.lines_connected) == self.num_points - 1:
            self.stop_tracing("You traced all points correctly with lines!")
        else:
            self.feedback_label.config(text="Incorrect tracing! Make sure to connect all points in the correct order.")

    @staticmethod
    def is_near(point, pos, threshold=15):
        return all(abs(a - b) < threshold for a, b in zip(point, pos))

    def stop_tracing_due_to_timeout(self):
        if self.tracing_active:
            self.stop_tracing("Time is up! You didn't trace all points in time.")

    def stop_tracing(self, message):
        self.tracing_active = False
        self.feedback_label.config(text=message)
        self.canvas.unbind("<Button-1>")
        self.canvas.unbind("<B1-Motion>")
        self.canvas.unbind("<ButtonRelease-1>")

if __name__ == "__main__":
    root = tk.Tk()
    image_directory = r"active\dataset\Pebbles"
    app = PointTracingGame(root, image_directory)
    root.mainloop()
