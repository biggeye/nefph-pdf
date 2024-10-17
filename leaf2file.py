import os
import re
import requests

# Function to download content from a URL
def download_content(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.text
    except requests.exceptions.RequestException as e:
        print(f"Failed to download from {url}: {e}")
        return None

# Function to parse markdown file and extract URLs
def parse_md_and_download(file_path):
    # Specify the encoding here to avoid UnicodeDecodeError
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    # Regex pattern to find URLs
    url_pattern = r'\[.*?\]\((https?:\/\/.*?)\)'
    urls = re.findall(url_pattern, content)

    compiled_code = ""

    # Download and compile content from each URL
    for url in urls:
        code = download_content(url)
        if code:
            compiled_code += f"## Code from {url}\n{code}\n\n"

    return compiled_code

# Save compiled code to a single file
def save_compiled_code(compiled_code, output_file):
    with open(output_file, 'w', encoding='utf-8') as file:
        file.write(compiled_code)

# Search the '.tree2leaf' subfolder and its subdirectories for .md files
def find_md_files_in_tree2leaf(directory):
    md_files = []
    tree2leaf_folder = os.path.join(directory, '.tree2leaf')

    # Ensure that the '.tree2leaf' folder exists
    if not os.path.exists(tree2leaf_folder):
        print(f"No '.tree2leaf' folder found in {directory}")
        return md_files

    # Search for .md files in '.tree2leaf' and its subdirectories
    for root, _, files in os.walk(tree2leaf_folder):
        for file in files:
            if file.endswith('.md'):
                md_files.append(os.path.join(root, file))
    
    return md_files

# Let the user choose a file from the list
def choose_md_file(md_files):
    if not md_files:
        print("No markdown files found in the '.tree2leaf' folder.")
        return None

    print("Found the following markdown files in the '.tree2leaf' folder:")
    for idx, file in enumerate(md_files):
        print(f"{idx + 1}. {file}")

    choice = input("Enter the number of the file you want to process: ")

    try:
        file_index = int(choice) - 1
        if 0 <= file_index < len(md_files):
            return md_files[file_index]
        else:
            print("Invalid choice.")
            return None
    except ValueError:
        print("Invalid input.")
        return None

# Main function to run the process
def main():
    current_directory = os.getcwd()

    # Find all .md files in the '.tree2leaf' subfolder
    md_files = find_md_files_in_tree2leaf(current_directory)

    # Allow the user to choose which file to process
    chosen_file = choose_md_file(md_files)
    if chosen_file:
        print(f"Processing file: {chosen_file}")

        # Parse the chosen file and compile the code
        compiled_code = parse_md_and_download(chosen_file)

        # Save the compiled code to an output file
        output_file = 'compiled_code.txt'
        save_compiled_code(compiled_code, output_file)

        print(f"Compiled code saved to {output_file}")

if __name__ == "__main__":
    main()
