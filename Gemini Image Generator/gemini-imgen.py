"""
Name: Gemini Image Generator
Description: This program initializes the Gemini API for image generation and outputs an image based on a given prompt.
use the script in these ways:

Basic usage with prompt:
python gemini-imgen.py "Your prompt here"
With custom output filename:
python gemini-imgen.py "Your prompt here" --output my_custom_image.png
The script will:

Display the prompt being used
Show any generated text description
Save the image with the specified filename
Display the generated image
Handle any errors gracefully
Let me know if you'd like to:

Add more configuration options
Implement batch processing
Add image size or quality settings
Add more detailed error handling
"""
import argparse
from google import genai
from google.genai import types
from PIL import Image
from io import BytesIO
import os
import dotenv
dotenv.load_dotenv()    
def generate_image(prompt, output_filename):
    """
    Generate an image using Gemini API based on the provided prompt.
    
    Args:
        prompt (str): The text prompt for image generation
        output_filename (str): The filename to save the generated image
    """
    # Initialize the client with your API key
    client = genai.Client(api_key=os.getenv('gemini_api_key'))

    print(f"Generating image from prompt: {prompt}")
    
    response = client.models.generate_content(
        model="gemini-2.0-flash-exp-image-generation",
        contents=prompt,
        config=types.GenerateContentConfig(
            response_modalities=['Text', 'Image']
        )
    )

    for part in response.candidates[0].content.parts:
        if part.text is not None:
            print(f"Description: {part.text}")
        elif part.inline_data is not None:
            image = Image.open(BytesIO(part.inline_data.data))
            image.save(output_filename)
            print(f"Image saved as {output_filename}")
            image.show()

def main():
    parser = argparse.ArgumentParser(description='Generate images using Gemini AI')
    parser.add_argument('prompt', type=str, help='The text prompt for image generation')
    parser.add_argument('--output', type=str, default='gemini-native-image.png', 
                       help='Output filename (default: gemini-native-image.png)')
    
    args = parser.parse_args()
    
    try:
        generate_image(args.prompt, args.output)
    except Exception as e:
        print(f"Error generating image: {str(e)}")

if __name__ == "__main__":
    main()
