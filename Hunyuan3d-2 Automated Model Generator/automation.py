import tkinter as tk
from tkinter import ttk, filedialog, messagebox
import os
import shutil
import uuid
import re
import threading
import argparse
from gradio_client import Client, handle_file


# # Run automation mode in testing (only 2 images) and generate white models
# python automation.py --automation --mode testing --input_folder input --output_folder output 

# # Run automation mode in production (all images) with textured models
# python automation.py --automation --mode production --input_folder input --output_folder output --automation_texture


# -----------------------
# Helper Functions
# -----------------------
def get_unique_filename(directory, base_name, extension):
    """
    Generate a unique filename by appending a number if the file already exists.
    """
    path = os.path.join(directory, f"{base_name}{extension}")
    if not os.path.exists(path):
        return path
    i = 1
    while True:
        path = os.path.join(directory, f"{base_name}_{i}{extension}")
        if not os.path.exists(path):
            return path
        i += 1

def generate_3d_model(text=None, image_path=None, texture=False, server_url="http://127.0.0.1:42003/", output_dir="output",
                      mv_image_front=None, mv_image_back=None, mv_image_left=None, mv_image_right=None,
                      base_folder_name=None, **kwargs):
    """
    Generate a 3D model from a text prompt or an image using the Hunyuan3D-2 server and save it to an output folder.
    """
    if text is None and image_path is None:
        raise ValueError("Either text or image_path must be provided.")

    try:
        client = Client(server_url)
    except Exception as e:
        raise Exception(f"Failed to connect to the server at {server_url}: {str(e)}")

    # Prepare inputs
    image = handle_file(image_path) if image_path else None
    mv_front = handle_file(mv_image_front) if mv_image_front else None
    mv_back = handle_file(mv_image_back) if mv_image_back else None
    mv_left = handle_file(mv_image_left) if mv_image_left else None
    mv_right = handle_file(mv_image_right) if mv_image_right else None
    caption = text

    # Set default parameters
    steps = kwargs.get('steps', 5)
    guidance_scale = kwargs.get('guidance_scale', 5.0)
    seed = kwargs.get('seed', 1234)
    octree_resolution = kwargs.get('octree_resolution', 256)
    check_box_rembg = kwargs.get('remove_background', True)
    num_chunks = kwargs.get('num_chunks', 8000)
    randomize_seed = kwargs.get('randomize_seed', True)

    endpoint = "/generation_all" if texture else "/shape_generation"

    try:
        result = client.predict(
            caption=caption,
            image=image,
            mv_image_front=mv_front,
            mv_image_back=mv_back,
            mv_image_left=mv_left,
            mv_image_right=mv_right,
            steps=steps,
            guidance_scale=guidance_scale,
            seed=seed,
            octree_resolution=octree_resolution,
            check_box_rembg=check_box_rembg,
            num_chunks=num_chunks,
            randomize_seed=randomize_seed,
            api_name=endpoint
        )
    except Exception as e:
        raise Exception(f"Generation failed: {str(e)}")

    file_info = result[1] if texture else result[0]

    if isinstance(file_info, dict) and 'value' in file_info:
        file_path = file_info['value']
    else:
        raise ValueError("Unexpected response format: could not extract file path.")

    if not os.path.exists(file_path):
        parts = file_path.split(os.sep)
        if len(parts) < 2:
            raise ValueError("Invalid file path format: too few path components.")
        uuid_dir, filename = parts[-2], parts[-1]
        possible_base_dirs = [
            os.path.join(os.getcwd(), "gradio_cache"),
            r"C:\pinokio\cache\GRADIO_TEMP_DIR",
            r"C:\pinokio\cache\gradio_cache",
        ]
        for base_dir in possible_base_dirs:
            adjusted_path = os.path.join(base_dir, uuid_dir, filename)
            if os.path.exists(adjusted_path):
                file_path = adjusted_path
                break
        else:
            raise FileNotFoundError(f"Generated file not found at {file_path} or in expected directories.")

    print(f"Found generated file at: {file_path}")

    os.makedirs(output_dir, exist_ok=True)

    # Create output directory with base_folder_name or a new UUID if not provided
    if base_folder_name:
        unique_output_dir = os.path.join(output_dir, base_folder_name)
    else:
        unique_output_dir = os.path.join(output_dir, str(uuid.uuid4()))

    os.makedirs(unique_output_dir, exist_ok=True)

    output_filename = "textured_mesh" if texture else "white_mesh"
    extension = ".glb"
    output_path = get_unique_filename(unique_output_dir, output_filename, extension)

    try:
        shutil.copy2(file_path, output_path)
    except Exception as e:
        raise Exception(f"Failed to copy file to {output_path}: {str(e)}")

    print(f"Model copied to: {output_path}")
    return output_path

# -----------------------
# Automation Mode Functionality
# -----------------------
def automate_generation(input_folder, output_folder, mode='production', **params):
    """
    Automatically scans the input folder for images and generates a 3D model (.glb) for each.
    In testing mode, only the first two images are processed.
    """
    # List image files (supporting common extensions)
    valid_extensions = ('.png', '.jpg', '.jpeg', '.bmp', '.gif')
    image_files = [f for f in os.listdir(input_folder) if f.lower().endswith(valid_extensions)]
    image_files.sort()  # sort for predictable order

    if not image_files:
        print("No image files found in the input folder.")
        return

    if mode == 'testing':
        image_files = image_files[:2]
        print("Running in testing mode (processing only 2 images).")
    else:
        print(f"Running in production mode (processing all {len(image_files)} images).")

    for image_file in image_files:
        image_path = os.path.join(input_folder, image_file)
        # Use the image file name (without extension) as the base folder name (sanitize it)
        base_folder_name = re.sub(r'[\/:*?"<>|]', '_', os.path.splitext(image_file)[0])
        print(f"Processing image: {image_file}")
        try:
            model_path = generate_3d_model(
                text=None,
                image_path=image_path,
                texture=params.get("texture", False),
                output_dir=output_folder,
                steps=params.get("steps", 5),
                guidance_scale=params.get("guidance_scale", 5.0),
                seed=params.get("seed", 1234),
                octree_resolution=params.get("octree_resolution", 256),
                remove_background=params.get("remove_background", True),
                num_chunks=params.get("num_chunks", 8000),
                randomize_seed=params.get("randomize_seed", True),
                base_folder_name=base_folder_name
            )
            print(f"Success: Model saved to {model_path}\n")
        except Exception as e:
            print(f"Error processing {image_file}: {str(e)}\n")

# -----------------------
# GUI Mode Functionality
# -----------------------
def run_gui():
    root = tk.Tk()
    root.title("3D Model Generator")

    # Variables
    generate_from_var = tk.StringVar(value="Text")
    selected_dir = tk.StringVar()
    output_dir_var = tk.StringVar(value="output")
    use_mv_var = tk.BooleanVar()
    front_path = tk.StringVar()
    back_path = tk.StringVar()
    left_path = tk.StringVar()
    right_path = tk.StringVar()
    texture_var = tk.BooleanVar()

    # Frames
    text_frame = tk.Frame(root)
    image_frame = tk.Frame(root)
    mv_frame = tk.Frame(image_frame)
    params_frame = tk.Frame(root)

    # Text Frame Widgets
    tk.Label(text_frame, text="Caption:").grid(row=0, column=0, sticky="w")
    caption_entry = tk.Entry(text_frame, width=50)
    caption_entry.grid(row=0, column=1)

    # Image Frame Widgets
    tk.Button(image_frame, text="Select Directory", command=lambda: select_directory()).grid(row=0, column=0, sticky="w")
    tk.Label(image_frame, text="Select Image:").grid(row=1, column=0, sticky="w")
    image_combobox = ttk.Combobox(image_frame, state="readonly", width=47)
    image_combobox.grid(row=1, column=1)
    tk.Checkbutton(image_frame, text="Use multi-view images", variable=use_mv_var, command=lambda: toggle_mv()).grid(row=2, column=0, columnspan=2, sticky="w")
    mv_frame.grid(row=3, column=0, columnspan=2, sticky="w")
    mv_frame.grid_remove()  # Initially hidden
    tk.Button(mv_frame, text="Select Front Image", command=lambda: select_image(front_path)).grid(row=0, column=0)
    tk.Button(mv_frame, text="Select Back Image", command=lambda: select_image(back_path)).grid(row=0, column=1)
    tk.Button(mv_frame, text="Select Left Image", command=lambda: select_image(left_path)).grid(row=1, column=0)
    tk.Button(mv_frame, text="Select Right Image", command=lambda: select_image(right_path)).grid(row=1, column=1)

    # Parameters Frame Widgets
    row = 0
    tk.Label(params_frame, text="Steps:").grid(row=row, column=0, sticky="w")
    steps_entry = tk.Entry(params_frame)
    steps_entry.insert(0, "5")
    steps_entry.grid(row=row, column=1)
    row += 1
    tk.Label(params_frame, text="Guidance Scale:").grid(row=row, column=0, sticky="w")
    guidance_entry = tk.Entry(params_frame)
    guidance_entry.insert(0, "5.0")
    guidance_entry.grid(row=row, column=1)
    row += 1
    tk.Label(params_frame, text="Seed:").grid(row=row, column=0, sticky="w")
    seed_entry = tk.Entry(params_frame)
    seed_entry.insert(0, "1234")
    seed_entry.grid(row=row, column=1)
    row += 1
    tk.Label(params_frame, text="Octree Resolution:").grid(row=row, column=0, sticky="w")
    octree_entry = tk.Entry(params_frame)
    octree_entry.insert(0, "256")
    octree_entry.grid(row=row, column=1)
    row += 1
    remove_bg_var = tk.BooleanVar(value=True)
    tk.Checkbutton(params_frame, text="Remove Background", variable=remove_bg_var).grid(row=row, column=0, columnspan=2, sticky="w")
    row += 1
    tk.Label(params_frame, text="Num Chunks:").grid(row=row, column=0, sticky="w")
    chunks_entry = tk.Entry(params_frame)
    chunks_entry.insert(0, "8000")
    chunks_entry.grid(row=row, column=1)
    row += 1
    randomize_seed_var = tk.BooleanVar(value=True)
    tk.Checkbutton(params_frame, text="Randomize Seed", variable=randomize_seed_var).grid(row=row, column=0, columnspan=2, sticky="w")
    row += 1
    tk.Checkbutton(params_frame, text="Generate Textured Model", variable=texture_var).grid(row=row, column=0, columnspan=2, sticky="w")

    # Main Window Layout
    tk.Label(root, text="Generate from:").grid(row=0, column=0, sticky="w")
    tk.Radiobutton(root, text="Text", variable=generate_from_var, value="Text", command=lambda: update_input_frame()).grid(row=0, column=1, sticky="w")
    tk.Radiobutton(root, text="Image", variable=generate_from_var, value="Image", command=lambda: update_input_frame()).grid(row=0, column=2, sticky="w")
    text_frame.grid(row=1, column=0, columnspan=3, sticky="w")
    image_frame.grid(row=1, column=0, columnspan=3, sticky="w")
    image_frame.grid_remove()  # Initially hidden
    params_frame.grid(row=2, column=0, columnspan=3, sticky="w")
    tk.Label(root, text="Output Directory:").grid(row=3, column=0, sticky="w")
    tk.Label(root, textvariable=output_dir_var).grid(row=3, column=1, sticky="w")
    tk.Button(root, text="Select", command=lambda: select_output_dir()).grid(row=3, column=2, sticky="w")
    generate_button = tk.Button(root, text="Generate", command=lambda: start_generation())
    generate_button.grid(row=4, column=0, columnspan=3)

    # Helper Functions for GUI
    def select_directory():
        dir_path = filedialog.askdirectory()
        if dir_path:
            selected_dir.set(dir_path)
            image_files = [f for f in os.listdir(dir_path) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp', '.gif'))]
            image_combobox['values'] = image_files
            if image_files:
                image_combobox.current(0)

    def toggle_mv():
        if use_mv_var.get():
            mv_frame.grid()
        else:
            mv_frame.grid_remove()

    def select_image(path_var):
        path = filedialog.askopenfilename(filetypes=[("Image files", "*.png;*.jpg;*.jpeg;*.bmp;*.gif")])
        if path:
            path_var.set(path)

    def update_input_frame():
        if generate_from_var.get() == "Text":
            image_frame.grid_remove()
            text_frame.grid()
        else:
            text_frame.grid_remove()
            image_frame.grid()

    def select_output_dir():
        dir_path = filedialog.askdirectory()
        if dir_path:
            output_dir_var.set(dir_path)

    def start_generation():
        if generate_from_var.get() == "Text" and not caption_entry.get().strip():
            messagebox.showerror("Error", "Caption is required")
            return
        elif generate_from_var.get() == "Image" and not image_combobox.get():
            messagebox.showerror("Error", "Please select an image")
            return
        generate_button.config(state="disabled")
        thread = threading.Thread(target=run_generation)
        thread.start()

    def run_generation():
        try:
            if generate_from_var.get() == "Text":
                caption = caption_entry.get().strip()
                image_path = None
                mv_front = mv_back = mv_left = mv_right = None
                base_folder_name = re.sub(r'[\/:*?"<>|]', '_', caption) or "model"
            else:
                dir_path = selected_dir.get()
                selected_image = image_combobox.get()
                if not selected_image:
                    raise ValueError("No image selected")
                image_path = os.path.join(dir_path, selected_image)
                caption = None
                if use_mv_var.get():
                    mv_front = front_path.get() or None
                    mv_back = back_path.get() or None
                    mv_left = left_path.get() or None
                    mv_right = right_path.get() or None
                else:
                    mv_front = mv_back = mv_left = mv_right = None
                base_name = os.path.splitext(selected_image)[0]
                base_folder_name = re.sub(r'[\/:*?"<>|]', '_', base_name) or "model"

            # Collect parameters from GUI entries
            steps = int(steps_entry.get())
            guidance_scale = float(guidance_entry.get())
            seed = int(seed_entry.get())
            octree_resolution = int(octree_entry.get())
            remove_background = remove_bg_var.get()
            num_chunks = int(chunks_entry.get())
            randomize_seed = randomize_seed_var.get()
            texture = texture_var.get()
            output_dir = output_dir_var.get()

            # Generate the 3D model
            model_path = generate_3d_model(
                text=caption,
                image_path=image_path,
                texture=texture,
                output_dir=output_dir,
                mv_image_front=mv_front,
                mv_image_back=mv_back,
                mv_image_left=mv_left,
                mv_image_right=mv_right,
                steps=steps,
                guidance_scale=guidance_scale,
                seed=seed,
                octree_resolution=octree_resolution,
                remove_background=remove_background,
                num_chunks=num_chunks,
                randomize_seed=randomize_seed,
                base_folder_name=base_folder_name
            )
            root.after(0, lambda: messagebox.showinfo("Success", f"Model saved to: {model_path}"))
        except Exception as e:
            root.after(0, lambda: messagebox.showerror("Error", str(e)))
        finally:
            root.after(0, lambda: generate_button.config(state="normal"))

    root.mainloop()

# -----------------------
# Main Entry Point
# -----------------------
def main():
    parser = argparse.ArgumentParser(description="3D Model Generator with Automation Mode")
    parser.add_argument("--automation", action="store_true", help="Run in automation mode (non-GUI)")
    parser.add_argument("--mode", choices=["testing", "production"], default="production",
                        help="Choose 'testing' (process 2 images) or 'production' (process all images)")
    parser.add_argument("--input_folder", type=str, help="Path to the input folder containing images")
    parser.add_argument("--output_folder", type=str, default="output", help="Path to the output folder")
    # Additional parameters for generation in automation mode
    parser.add_argument("--steps", type=int, default=5, help="Number of inference steps")
    parser.add_argument("--guidance_scale", type=float, default=5.0, help="Guidance scale")
    parser.add_argument("--seed", type=int, default=1234, help="Seed for random number generation")
    parser.add_argument("--octree_resolution", type=int, default=256, help="Octree resolution")
    parser.add_argument("--remove_background", action="store_true", help="Remove background flag")
    parser.add_argument("--num_chunks", type=int, default=8000, help="Number of chunks")
    parser.add_argument("--randomize_seed", action="store_true", help="Randomize seed flag")
    # New flag: only used in automation mode to generate textured models.
    parser.add_argument("--automation_texture", action="store_true", help="In automation mode, generate textured model")
    # Existing texture flag (remains available for GUI mode)
    parser.add_argument("--texture", action="store_true", help="Generate textured model (for GUI mode)")
    args = parser.parse_args()

    if args.automation:
        if not args.input_folder:
            print("Error: --input_folder is required when running in automation mode.")
            return
        automate_generation(
            input_folder=args.input_folder,
            output_folder=args.output_folder,
            mode=args.mode,
            steps=args.steps,
            guidance_scale=args.guidance_scale,
            seed=args.seed,
            octree_resolution=args.octree_resolution,
            remove_background=args.remove_background,
            num_chunks=args.num_chunks,
            randomize_seed=args.randomize_seed,
            texture=args.automation_texture  # use the automation-specific flag
        )
    else:
        run_gui()

if __name__ == "__main__":
    main()
