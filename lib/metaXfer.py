from PIL import Image
import piexif
import os

def copy_metadata(source_file, target_file, output_file):
    try:
        # Check if source file exists
        if not os.path.exists(source_file):
            print(f"Error: Source file '{source_file}' does not exist.")
            return

        # Check if target file exists
        if not os.path.exists(target_file):
            print(f"Error: Target file '{target_file}' does not exist.")
            return

        # Open the source file and extract its EXIF data
        print("Opening source file...")
        source_image = Image.open(source_file)
        source_exif = source_image.info.get("exif", None)

        if source_exif is None:
            print(f"Warning: No EXIF metadata found in source file '{source_file}'.")
        else:
            print(f"EXIF metadata extracted from source file '{source_file}'.")

        # Open the target file
        print("Opening target file...")
        target_image = Image.open(target_file)

        # Check if target image format supports EXIF
        if target_image.format != "JPEG":
            print(f"Target file '{target_file}' is not in JPEG format. Converting to JPEG...")
            temp_target_file = "temp_target.jpg"
            target_image.convert("RGB").save(temp_target_file, format="JPEG")
            target_image = Image.open(temp_target_file)
            print("Conversion to JPEG completed.")
        else:
            print(f"Target file '{target_file}' is in JPEG format.")

        # Attach the source EXIF data to the target image
        if source_exif is not None:
            print("Adding EXIF metadata to the target file...")
            exif_bytes = piexif.dump(piexif.load(source_exif))
            target_image.save(output_file, "jpeg", exif=exif_bytes)
            print(f"Metadata copied successfully to '{output_file}'.")
        else:
            print(f"No EXIF metadata to copy. Saving target file as '{output_file}' without metadata.")
            target_image.save(output_file, "jpeg")

        # Clean up the temporary file, if any
        if "temp_target_file" in locals() and os.path.exists(temp_target_file):
            os.remove(temp_target_file)
            print("Temporary files cleaned up.")
    except Exception as e:
        print(f"An error occurred: {e}")

# Example usage
source_file_path = input("Enter the path to the source image: ").strip()
target_file_path = input("Enter the path to the target image: ").strip()
output_file_path = input("Enter the path to save the output image: ").strip()

copy_metadata(source_file_path, target_file_path, output_file_path)
