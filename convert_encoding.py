import os
import pandas as pd

def convert_to_utf8(file_path):
    if file_path.endswith('.xlsx'):
        # Handle Excel files
        df = pd.read_excel(file_path)
        csv_path = file_path.replace('.xlsx', '.csv')
        df.to_csv(csv_path, index=False, encoding='utf-8')
        print(f"Converted {file_path} to {csv_path} with UTF-8 encoding")
    else:
        # Handle text files
        encodings = ['utf-16', 'utf-8', 'latin-1']
        for encoding in encodings:
            try:
                with open(file_path, 'r', encoding=encoding) as file:
                    content = file.read()
                break
            except (UnicodeDecodeError, FileNotFoundError):
                continue
        else:
            raise ValueError(f"Failed to read {file_path} with available encodings.")
        
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f"Converted {file_path} to UTF-8")

if __name__ == "__main__":
    files_to_convert = [
        'app/__init__.py',
        'app/routes.py',
        'models/recommendation_model.py',
        'templates/index.html',
        'tests/test_recommendation_model.py',
        'data/teas.xlsx'
    ]
    
    for file_path in files_to_convert:
        convert_to_utf8(file_path)