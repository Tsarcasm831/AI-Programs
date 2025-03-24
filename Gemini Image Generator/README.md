# Gemini Image Generator

Gemini Image Generator is a simple tool that uses Google's Gemini AI to generate game icons and visual assets. It is designed to handle batch processing and track progress, making it a useful addition to your game development toolkit.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Gemini API Key Setup](#gemini-api-key-setup)
- [Progress Tracking](#progress-tracking)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)
- [Credits](#credits)

## Features

- **AI-Powered Icon Generation**: Creates game icons using Gemini AI based on the properties of each item.
- **Batch Processing**: Processes icons in batches, simplifying the handling of larger sets of items.
- **Rate Limiting**: Adds delays between API calls to avoid overloading the server.
- **Progress Tracking**: Uses a JSON file to keep track of progress and resume if interrupted.
- **Custom Prompts**: Generates prompts for each item based on its specific properties.

## Project Structure

├── gemini-imgen.py # Main script for image generation using Gemini AI ├── generate_item_icons.py # Script for batch processing game item icons ├── icon_progress_tracker.json # JSON file for tracking icon generation progress ├── randomitems.js # Source data for game items └── randomitems_icons/ # Directory where generated icons are saved

bash
Copy code

## Installation

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/yourusername/gemini-image-generator.git
   cd gemini-image-generator
Install Dependencies
Ensure you have Python 3.x installed, then run:

bash
Copy code
pip install -r requirements.txt
Configuration
Before running the scripts, create a .env file in the project root directory to store your Gemini API key:

ini
Copy code
gemini_api_key=[YOUR_API_KEY_HERE]
Security Tip: Keep your API key secure and do not commit it to version control.

Usage
Obtain a Gemini API Key
(See Gemini API Key Setup for detailed instructions.)

Run the Batch Processing Script
Execute the following command to generate game icons in batches:

bash
Copy code
python generate_item_icons.py
Monitor Progress
Check the icon_progress_tracker.json file to view progress and resume if interrupted.

Access Generated Icons
Generated icons will be saved in the randomitems_icons/ directory.

Gemini API Key Setup
To use the Gemini API, follow these steps:

Sign Up for Google Cloud Platform

Visit the Google Cloud Console at https://console.cloud.google.com/.

Create a new project or select an existing one.

Enable billing for your project.

Enable the Gemini API

Open the API Library at https://console.cloud.google.com/apis/library.

Search for "Gemini API" and click Enable.

Create API Credentials

Navigate to the Credentials section at https://console.cloud.google.com/apis/credentials.

Click Create Credentials and select Service account key.

Create a new service account, assign it a name, and choose the Gemini API role.

Select JSON as the key type and download your key file.

Configure Your Environment

Open your .env file in the project root.

Add your API key in the following format:

ini
Copy code
gemini_api_key=YOUR_DOWNLOADED_API_KEY
Progress Tracking
The system uses a JSON-based tracker (icon_progress_tracker.json) to:

Process files in batches (default: 10 files per batch)

Resume processing from the last saved state if interrupted

Display progress and percentage completed

Enforce delays between API requests to avoid server overload

Troubleshooting
Missing or Invalid API Key: Verify that your .env file exists and contains the correct Gemini API key.

Rate Limit Issues: If you encounter server overload warnings, try increasing the delay between API calls.

Batch Processing Errors: Review the icon_progress_tracker.json file for error messages and try re-running the script.

Contributing
Contributions are welcome! If you'd like to improve Gemini Image Generator, please fork this repository and submit a pull request. Ensure that your contributions follow the project's guidelines and include any necessary tests.

License
This project is licensed under the MIT License.

Credits
Developed by Lord Tsarcasm
March 24, 2025

Gemini Image Generator is part of a larger game development system, focused on generating consistent and quality game icons using AI technology.