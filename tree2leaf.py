﻿import os

base_url = "https://github.com/biggeye/nefph-pdf/tree/main/"

def write_files(md_file, dir_path, base_path, depth):
    files = sorted(f for f in os.listdir(dir_path) if os.path.isfile(os.path.join(dir_path, f)))
    for file in files:
        relative_path = os.path.join(base_path, file).replace('\\', '/')
        full_url = f"{base_url}{relative_path}"
        md_file.write(f"{'    ' * depth}└── [{file}]({full_url})\n")

def process_directory(dir_path, output_md_path, base_path='', depth=0):
    dirs = sorted(d for d in os.listdir(dir_path) if os.path.isdir(os.path.join(dir_path, d)) and d not in skip_dirs)
    files = sorted(f for f in os.listdir(dir_path) if os.path.isfile(os.path.join(dir_path, f)))

    with open(output_md_path, 'a', encoding='utf-8') as md_file:
        if depth > 0:  # Avoid writing root directory as a folder
            md_file.write(f"{'    ' * (depth - 1)}└── 📁{os.path.basename(dir_path)}\n")

        for file in files:
            relative_path = os.path.join(base_path, file).replace('\\', '/')
            full_url = f"{base_url}{relative_path}"
            md_file.write(f"{'    ' * depth}└── [{file}]({full_url})\n")

    for d in dirs:
        sub_dir_path = os.path.join(dir_path, d)
        new_base_path = os.path.join(base_path, d).replace('\\', '/')
        process_directory(sub_dir_path, output_md_path, new_base_path, depth + 1)


skip_dirs = {'node_modules', '.next', '.git', 'dist', 'build'}

def generate_markdown_for_directory(start_path, output_dir):
    for root_dir in sorted(os.listdir(start_path)):
        if root_dir in skip_dirs or not os.path.isdir(os.path.join(start_path, root_dir)):
            continue
        root_dir_path = os.path.join(start_path, root_dir)
        output_md_path = os.path.join(output_dir, f"{root_dir}.md")
        with open(output_md_path, 'w', encoding='utf-8') as output_md:
            output_md.write(f"# {root_dir}\n\n")  # Initialize file with root directory name
        base_path = root_dir  # Initialize base path with root directory
        process_directory(root_dir_path, output_md_path, base_path, 0)

start_path = '/users/jenni/source/repos/biggeye/nefph-pdf/'
output_dir = '/users/jenni/source/repos/biggeye/'
generate_markdown_for_directory(start_path, output_dir)