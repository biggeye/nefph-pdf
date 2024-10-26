import os
from PyPDF2 import PdfReader

# Directory containing all the PDF files
directory = './downloads'

# Function to extract text from a single PDF
def extract_text_from_pdf(pdf_path):
    try:
        with open(pdf_path, 'rb') as file:
            reader = PdfReader(file)
            text = ""
            for page in reader.pages:
                text += page.extract_text()
            return text
    except Exception as e:
        print(f"Error reading {pdf_path}: {e}. Skipping this file.")
        return None

# Parse all PDFs in the folder
pdf_data = []
for filename in os.listdir(directory):
    if filename.endswith('.pdf'):
        pdf_path = os.path.join(directory, filename)
        extracted_text = extract_text_from_pdf(pdf_path)
        if extracted_text:
            # Store extracted text and filename in a list if extraction is successful
            pdf_data.append({
                "filename": filename,
                "text": extracted_text
            })

# Print extracted text for each file
for entry in pdf_data:
    print(f"Extracted text from {entry['filename']}:")
    print(entry['text'])  # This prints the entire text
