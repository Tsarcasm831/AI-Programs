# Gemini Image Generator

A powerful image generation system built with Google's Gemini AI, designed to create game icons and visual assets.

## Features

- **AI-Powered Icon Generation**: Utilizes Gemini AI to create custom game icons based on item properties
- **Batch Processing**: Processes icons in batches with progress tracking
- **Rate Limiting**: Implements delays between API calls to prevent server overload
- **Progress Tracking**: Saves progress to resume if interrupted
- **Custom Prompts**: Generates tailored AI prompts based on item properties

## Project Structure

- `gemini-imgen.py`: Main image generation script using Gemini AI
- `generate_item_icons.py`: Script for batch processing game item icons
- `icon_progress_tracker.json`: Tracks progress of icon generation
- `randomitems.js`: Source data for game items
- `randomitems_icons/`: Directory containing generated icons

## Usage

1. Ensure you have a valid Gemini API key
2. Run `generate_item_icons.py` to process icons in batches
3. Monitor progress in `icon_progress_tracker.json`
4. Generated icons will be saved in `randomitems_icons/`

## Requirements

- Python 3.x
- Google's Gemini API access
- Required Python packages (see requirements.txt)
- **Important**: Create a `.env` file in the parent directory with your Gemini API key:
  ```
  gemini_api_key=[YOUR_API_KEY_HERE]
  ```

### Getting Your Gemini API Key

To use this project, you'll need a Gemini API key. Here's how to get one:

1. **Sign up for Google Cloud Platform**:
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable billing for your project

2. **Enable the Gemini API**:
   - Go to the [API Library](https://console.cloud.google.com/apis/library)
   - Search for "Gemini API"
   - Click "Enable"

3. **Create API credentials**:
   - Navigate to [APIs & Services > Credentials](https://console.cloud.google.com/apis/credentials)
   - Click "Create Credentials" > "Service account key"
   - Select "New service account"
   - Give it a name and select "Gemini API" as the role
   - Choose "JSON" as the key type and download the key file

4. **Set up your environment**:
   - Create a `.env` file in the parent directory
   - Add your API key in the following format:
     ```
     gemini_api_key=YOUR_DOWNLOADED_API_KEY
     ```

**Note**: Keep your API key secure and never share it publicly or commit it to version control.

## Progress Tracking

The system uses a JSON-based progress tracker to:
- Process files in batches (default 10 files per batch)
- Resume from where it left off if interrupted
- Show progress information and percent complete
- Add delays between API requests to avoid server overload

## Created By

Lord Tsarcasm
March 24, 2025

---

This project is part of a larger game development system, specifically designed for generating consistent and high-quality game icons using AI technology.
