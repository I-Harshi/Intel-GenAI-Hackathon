import json
import random

# Load the dataset of web forms with honeypots
with open('web_forms_dataset_with_honeypots.json', 'r') as f:
    form_dataset = json.load(f)

def generate_honeypot(category_list, num_honeypots=2):
    honeypots = []
    for category in category_list:
        # Filter forms based on the selected category
        forms_in_category = [form for form in form_dataset if form['category'] == category]
        
        # Randomly select forms and generate honeypots
        for form in random.sample(forms_in_category, min(len(forms_in_category), num_honeypots)):
            for _ in range(num_honeypots):
                fake_field = {
                    'tag': 'input',
                    'type': 'text',
                    'name': f'honeypot_{category}_{random.randint(100, 999)}',
                    'placeholder': f'Leave this field blank {random.randint(100, 999)}',
                    'style': 'display:none;'  # Hide honeypot field
                }
                honeypots.append(fake_field)
    
    return honeypots

# Example usage
categories_to_generate_honeypots = ['E-commerce', 'Social Media', 'Healthcare']
generated_honeypots = generate_honeypot(categories_to_generate_honeypots, num_honeypots=3)

# Print the generated honeypots
print(json.dumps(generated_honeypots, indent=4))
