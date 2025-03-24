"""
Item Icon Generator
Description: This script reads the items from randomitems.js and uses gemini-imgen.py to generate
an icon for each item. It saves the icons to a 'randomitems_icons' directory and includes progress
tracking to support resuming if the process is interrupted.
"""
import os
import re
import json
import time
import subprocess
import argparse
from pathlib import Path

def extract_items_from_js(js_file_path):
    """
    Extract item objects from the randomitems.js file
    
    Args:
        js_file_path: Path to the randomitems.js file
        
    Returns:
        A list of dictionaries containing item data
    """
    with open(js_file_path, 'r', encoding='utf-8') as f:
        js_content = f.read()
    
    # Look for items array defined in the generateRandomItems function
    items_pattern = r'\{[\s\n]*name:\s*[\'"](.+?)[\'"],[\s\n]*description:\s*[\'"](.+?)[\'"],[\s\n]*type:\s*[\'"](.+?)[\'"],[\s\n]*rarity:\s*[\'"](.+?)[\'"]'
    
    items = []
    for match in re.finditer(items_pattern, js_content, re.DOTALL):
        name, description, item_type, rarity = match.groups()
        
        # Create a clean item object
        item = {
            'name': name,
            'description': description,
            'type': item_type,
            'rarity': rarity
        }
        items.append(item)
    
    return items

def load_progress(progress_file):
    """Load progress from a JSON file if it exists"""
    if os.path.exists(progress_file):
        with open(progress_file, 'r') as f:
            return json.load(f)
    return {'completed': [], 'total': 0, 'last_index': -1}

def save_progress(progress_file, progress_data):
    """Save progress to a JSON file"""
    with open(progress_file, 'w') as f:
        json.dump(progress_data, f)

def generate_icon_prompt(item):
    """Generate a prompt for the Gemini API based on item properties"""
    prompt = f"Generate a detailed 2D game icon for a {item['rarity'].lower()} {item['type']} item called '{item['name']}'. {item['description']}"
    
    # Add additional context based on item type
    if item['type'] == 'consumable':
        prompt += " The icon should be suitable for a fantasy RPG consumable item."
    elif item['type'] == 'equipment':
        prompt += " The icon should look like a high-quality fantasy RPG weapon or equipment."
    elif item['type'] == 'material':
        prompt += " The icon should represent a crafting material in a fantasy RPG game."
        
    # Add style guidance
    prompt += " Use a vibrant fantasy art style with clear details and a transparent background. Make it look professional like items from World of Warcraft or Diablo."
    
    return prompt

def sanitize_filename(name):
    """Convert item name to a valid and clean filename"""
    # Replace invalid filename characters with underscores
    filename = re.sub(r'[\\/*?:"<>|]', "_", name)
    # Replace spaces with underscores
    filename = filename.replace(" ", "_")
    return filename.lower()

def main():
    parser = argparse.ArgumentParser(description='Generate item icons using Gemini AI')
    parser.add_argument('--batch-size', type=int, default=10, 
                        help='Number of items to process before pausing (default: 10)')
    parser.add_argument('--delay', type=float, default=2.0,
                        help='Delay in seconds between API requests (default: 2.0)')
    parser.add_argument('--force-restart', action='store_true',
                        help='Force restart from the beginning, ignoring previous progress')
    parser.add_argument('--test-mode', action='store_true',
                        help='Run in test mode, processing only the first 3 items')
    parser.add_argument('--skip-first', type=int, default=0,
                        help='Skip the first N items (useful for resuming after test mode)')
    
    args = parser.parse_args()
    
    # Paths
    script_dir = os.path.dirname(os.path.abspath(__file__))
    randomitems_js_path = os.path.join(script_dir, "randomitems.js")
    gemini_script_path = os.path.join(script_dir, "gemini-imgen.py")
    icons_dir = os.path.join(script_dir, "randomitems_icons")
    progress_file = os.path.join(script_dir, "icon_progress_tracker.json")
    
    # Create icons directory if it doesn't exist
    os.makedirs(icons_dir, exist_ok=True)
    
    # Extract items from randomitems.js
    try:
        items = extract_items_from_js(randomitems_js_path)
        if not items:
            print("No items found in randomitems.js")
            return
        print(f"Found {len(items)} items in randomitems.js")
    except Exception as e:
        print(f"Error extracting items: {str(e)}")
        return
    
    # Load or initialize progress tracking
    if args.force_restart and os.path.exists(progress_file):
        os.remove(progress_file)
        
    progress = load_progress(progress_file)
    progress['total'] = len(items)
    
    # Determine start index based on arguments
    start_index = 0
    if args.skip_first > 0:
        start_index = args.skip_first
        print(f"Skipping the first {args.skip_first} items as requested")
    elif not args.force_restart:
        start_index = progress['last_index'] + 1
    
    # Determine end index for test mode
    end_index = len(items)
    if args.test_mode:
        end_index = min(3, len(items))
        print(f"TEST MODE: Processing only the first {end_index} items")
    
    # Process items
    batch_count = 0
    
    for i in range(start_index, end_index):
        item = items[i]
        item_name = item['name']
        
        # Skip if this item was already processed
        if item_name in progress['completed'] and not args.force_restart:
            print(f"Skipping already processed item: {item_name}")
            continue
            
        # Generate filename for this item
        filename = sanitize_filename(item_name) + ".png"
        output_path = os.path.join(icons_dir, filename)
        
        # Generate prompt for Gemini
        prompt = generate_icon_prompt(item)
        
        print(f"\nProcessing item {i+1}/{end_index}: {item_name}")
        print(f"Prompt: {prompt}")
        
        try:
            # Call gemini-imgen.py with the generated prompt
            cmd = ["python", gemini_script_path, prompt, "--output", output_path]
            
            # Run the command
            subprocess.run(cmd, check=True)
            
            # Update progress
            if item_name not in progress['completed']:
                progress['completed'].append(item_name)
            progress['last_index'] = i
            save_progress(progress_file, progress)
            
            # Show progress percentage
            completed_count = len(progress['completed'])
            if args.test_mode:
                percent_complete = completed_count / end_index * 100
                print(f"Test Progress: {percent_complete:.1f}% ({completed_count}/{end_index})")
            else:
                percent_complete = completed_count / progress['total'] * 100
                print(f"Progress: {percent_complete:.1f}% ({completed_count}/{progress['total']})")
            
            # Batch processing
            batch_count += 1
            if batch_count >= args.batch_size:
                print(f"\nCompleted batch of {args.batch_size} items. Pausing...")
                print(f"To continue, run the script again.")
                print(f"To start over, use --force-restart")
                break
                
            # Add delay between requests to avoid overloading the API
            if i < end_index - 1:
                print(f"Waiting {args.delay} seconds before next request...")
                time.sleep(args.delay)
                
        except Exception as e:
            print(f"Error generating icon for {item_name}: {str(e)}")
            # Still save progress so we don't lose track
            save_progress(progress_file, progress)
    
    # Final status
    if args.test_mode:
        print("\nTest completed! To generate icons for all items, run without the --test-mode flag.")
        print(f"To skip the {end_index} items you just processed, use --skip-first {end_index}")
    elif len(progress['completed']) == progress['total']:
        print("\nAll item icons have been generated successfully!")
    else:
        print(f"\nProcessed {len(progress['completed'])}/{progress['total']} items.")
        print("Run the script again to continue processing remaining items.")

if __name__ == "__main__":
    main()
