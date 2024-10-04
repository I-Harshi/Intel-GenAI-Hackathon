# AI-Generated Honeypot with Passive CAPTCHA

## Overview

This project provides an AI-driven honeypot generator that creates customized honeypot scripts for various sectors such as e-commerce, blogs, social media, banking, forums, and more. The generated scripts include different security features like fake login forms, hidden inputs, fake buttons, fake carts, and passive CAPTCHA functionalities to detect and thwart bot activity.

## Features

- **Sector Selection**: Choose from multiple sectors to tailor the honeypot script.
- **Customizable Fields**: Select various security features to include in the generated script.
- **AI-Powered**: Utilizes state-of-the-art LLMs (e.g., GPT-Neo) to generate effective honeypot scripts.
- **Passive CAPTCHA Integration**: Includes mechanisms to verify user interactions without explicit challenges, enhancing user experience while detecting bots.

## Prerequisites

- Python 3.7 or later
- Required libraries:
  - `transformers`
  - `torch`

You can install the required libraries using pip:

pip install transformers torch


# Passive CAPTCHA with Behavioral Analysis and Honeypots

## Overview

This project implements a passive CAPTCHA system that integrates behavioral analysis to detect and differentiate between human users and bots. By leveraging keystroke dynamics, mouse pointer movements, screen resolution, and other behavioral factors, the system intelligently assesses user interactions. Additionally, customized honeypots are deployed to trap remaining bots. To enhance security, an active CAPTCHA layer is incorporated, utilizing dynamically generated images and pattern recognition techniques to challenge bots effectively.

## Features

- **Behavioral Analysis:** 
  - Monitors user interactions such as keystrokes and mouse movements.
  - Logs screen resolution and other environmental variables to build a profile of legitimate users.

- **Customized Honeypots:** 
  - Deploys honeypots designed to attract and identify bots based on their interaction patterns.
  - Adaptable to various web environments, ensuring robustness against diverse bot strategies.

- **Active CAPTCHA (Layer 2):** 
  - Generates complex images and tasks that require human-like responses (e.g., connect-the-dots, math equations).
  - Challenges bots with curvy patterns or specific orders that are difficult for automated scripts to navigate.
  
- **Robustness Against Evolving Threats:**
  - The system is designed to adapt to new bot strategies, ensuring long-term effectiveness.

## How It Works

1. **Passive CAPTCHA (Layer 1):**
   - **Data Collection:** 
     - Collects real-time data from user interactions, including:
       - Keystroke dynamics (timing and pressure).
       - Mouse pointer movements (speed, trajectory).
       - Screen resolution and browser details.
   - **Behavioral Analysis:**
     - Utilizes a Retrieval-Augmented Generation (RAG) model to analyze collected data.
     - Predicts user behavior to determine if the interaction is human or bot-driven.

2. **Customized Honeypots:**
   - Integrates customized honeypots within the web application.
   - Tracks interactions with these honeypots to identify and isolate bot activities.

3. **Active CAPTCHA (Layer 2):**
   - When uncertainty remains about a user’s legitimacy, the system prompts an active CAPTCHA challenge.
   - **Dynamic Challenges:**
     - Generates unique images that require human cognitive abilities to solve (e.g., connecting dots or solving math equations).
     - Employs patterns that are difficult for bots to replicate, enhancing the detection of automated scripts.


## Usage

- The passive CAPTCHA system will run in the background, continuously analyzing user behavior.
- Honeypots will operate seamlessly within the application to trap bots.
- Active CAPTCHA will be triggered as needed based on the analysis results.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

