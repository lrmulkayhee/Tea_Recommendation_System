import requests
import pandas as pd

def fetch_tea_data(api_url):
    response = requests.get(api_url)
    if response.status_code == 200:
        tea_data = response.json()
        return tea_data
    else:
        print(f"Failed to fetch data: {response.status_code}")
        return None

def save_to_csv(data, file_path):
    df = pd.DataFrame(data)
    df.to_csv(file_path, index=False)

if __name__ == "__main__":
    api_url = "https://api.boonakis.com/tea"  # Replace with the actual API URL
    tea_data = fetch_tea_data(api_url)
    if tea_data:
        save_to_csv(tea_data, "data/teas.csv")