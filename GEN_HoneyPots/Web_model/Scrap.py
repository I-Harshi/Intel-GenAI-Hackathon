import requests
from bs4 import BeautifulSoup
import json
import random

# Categorized list of websites to scrape (main pages)
websites = {
    'E-commerce': [
        "https://www.amazon.com",
        "https://www.ebay.com",
        "https://www.walmart.com",
        "https://www.shopify.com",
    ],
    'Social Media': [
        "https://www.facebook.com",
        "https://twitter.com",
        "https://www.instagram.com",
        "https://www.linkedin.com",
    ],
    'Educational': [
        "https://www.coursera.org",
        "https://www.khanacademy.org",
        "https://www.edx.org",
        "https://www.udemy.com",
    ],
    'Healthcare': [
        "https://www.medplusmart.com/",
        "https://www.nih.gov/",
        "https://www.medibuddy.in/",
    ],
}

# Function to extract forms from a webpage
def extract_forms(url):
    try:
        response = requests.get(url, timeout=10)  # Add timeout for better error handling
        response.raise_for_status()  # Raise an error for bad responses
        soup = BeautifulSoup(response.text, 'html.parser')

        # Find all forms on the page
        forms = soup.find_all('form')
        form_data = []

        for form in forms:
            form_details = {
                'action': form.get('action'),
                'method': form.get('method'),
                'inputs': []
            }

            # Extract input fields, select fields, and textarea fields
            inputs = form.find_all(['input', 'select', 'textarea'])
            for input_field in inputs:
                input_details = {
                    'tag': input_field.name,
                    'type': input_field.get('type'),
                    'name': input_field.get('name'),
                    'placeholder': input_field.get('placeholder'),
                }
                form_details['inputs'].append(input_details)

            form_data.append(form_details)

        return form_data

    except requests.exceptions.SSLError as ssl_err:
        print(f"SSL error occurred for {url}: {ssl_err}")
        return []  # Return an empty list if there's an SSL error
    except requests.exceptions.RequestException as e:
        print(f"An error occurred while accessing {url}: {e}")
        return []  # Return an empty list for other request errors

# Function to generate fake honeypot fields
def generate_honeypots(num_fields=2):
    fake_fields = []
    for i in range(num_fields):
        fake_field = {
            'tag': 'input',
            'type': 'text',
            'name': f'fake_field_{i}',
            'placeholder': f'Leave this field blank {random.randint(100, 999)}',
            'style': 'display:none;'  # Hide honeypot field
        }
        fake_fields.append(fake_field)
    return fake_fields

# Scrape forms from all websites and categorize them
form_dataset_with_honeypots = []

for category, urls in websites.items():
    for website in urls:
        print(f"Scraping forms from {website} in category: {category}")
        forms = extract_forms(website)

        # Add category to each form if forms were successfully extracted
        if forms:
            for form in forms:
                form['category'] = category
                honeypots = generate_honeypots()
                form['inputs'].extend(honeypots)
            form_dataset_with_honeypots.extend(forms)

# Save the dataset to a JSON file
with open('web_forms_dataset_with_honeypots.json', 'w') as f:
    json.dump(form_dataset_with_honeypots, f, indent=4)

print("Web form dataset with honeypots saved to web_forms_dataset_with_honeypots.json")
