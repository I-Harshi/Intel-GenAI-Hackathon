from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
import numpy as np

app = Flask(__name__)

# Load your model
model = load_model('/model/bot_detection.h5')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    # Ensure the data is in the correct format
    # You might need to modify this based on your model's expected input
    if not data or 'features' not in data:
        return jsonify({'error': 'Invalid input'}), 400

    features = np.array(data['features']).reshape(1, -1)  # Reshape as needed
    prediction = model.predict(features)

    # Assuming your model outputs a probability, return it
    is_bot = (prediction[0][0] > 0.5)  # Adjust based on your model's output
    return jsonify({'is_bot': is_bot})

if __name__ == '__main__':
    app.run(debug=True)
