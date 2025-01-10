import os
import requests
from PIL import Image
from PIL.Image import Resampling
from io import BytesIO

# Replace with your Unsplash Access Key
UNSPLASH_ACCESS_KEY = "PdaFurrec-USaPXTadpHIQqh_ebu6AX5Vj7hX_lWuCo"
OUTPUT_DIR = "/home/Jules/COURS/2024-2025/WEB/tp05_jacquin_jules/src/assets/product_pictures"

# The provided product data
products = [
    {
        "id": 1,
        "nom": "Laptop"
    },
    {
        "id": 2,
        "nom": "Mechanical keyboard"
    },
    {
        "id": 3,
        "nom": "Gaming mouse"
    },
    {
        "id": 4,
        "nom": "24-inch monitor"
    },
    {
        "id": 5,
        "nom": "1TB external hard drive"
    },
    {
        "id": 6,
        "nom": "64GB USB flash drive"
    },
    {
        "id": 7,
        "nom": "Multifunction printer"
    },
    {
        "id": 8,
        "nom": "Graphics card"
    },
    {
        "id": 9,
        "nom": "Headphones"
    },
    {
        "id": 10,
        "nom": "Wi-Fi router"
    },
    {
        "id": 11,
        "nom": "Wireless charger"
    },
    {
        "id": 12,
        "nom": "Laptop stand"
    },
    {
        "id": 13,
        "nom": "USB-C hub"
    },
    {
        "id": 14,
        "nom": "HD webcam"
    },
    {
        "id": 15,
        "nom": "Graphics tablet"
    },
    {
        "id": 16,
        "nom": "LED desk lamp"
    },
    {
        "id": 17,
        "nom": "Portable Bluetooth speaker"
    },
    {
        "id": 18,
        "nom": "20000mAh power bank"
    },
    {
        "id": 19,
        "nom": "USB microphone"
    },
    {
        "id": 20,
        "nom": "External sound card"
    },
    {
        "id": 21,
        "nom": "PC fan"
    },
    {
        "id": 22,
        "nom": "Wireless HDMI dongle"
    },
    {
        "id": 23,
        "nom": "Multiple charging station"
    },
    {
        "id": 24,
        "nom": "Smartphone case"
    },
    {
        "id": 25,
        "nom": "2-meter HDMI cable"
    },
    {
        "id": 26,
        "nom": "Wireless ergonomic mouse"
    },
    {
        "id": 27,
        "nom": "Desktop computer"
    },
    {
        "id": 28,
        "nom": "VR headset"
    },
    {
        "id": 29,
        "nom": "Laptop docking station"
    },
    {
        "id": 30,
        "nom": "XXL mouse pad"
    },
    {
        "id": 31,
        "nom": "Universal laptop charger"
    },
    {
        "id": 32,
        "nom": "Wi-Fi range extender"
    },
    {
        "id": 33,
        "nom": "SSD enclosure"
    },
    {
        "id": 34,
        "nom": "PC game controller"
    },
    {
        "id": 35,
        "nom": "Laptop backpack"
    },
    {
        "id": 36,
        "nom": "Wireless keyboard"
    },
    {
        "id": 37,
        "nom": "Laptop lock"
    },
    {
        "id": 38,
        "nom": "SD card reader"
    },
    {
        "id": 39,
        "nom": "Privacy screen filter"
    }
]




def search_unsplash_image(query):
    """Search Unsplash for an image related to the given query and return the first image URL."""
    url = "https://api.unsplash.com/search/photos"
    params = {
        "query": query,
        "per_page": 1
    }
    headers = {
        "Accept-Version": "v1",
        "Authorization": f"Client-ID {UNSPLASH_ACCESS_KEY}"
    }
    response = requests.get(url, params=params, headers=headers)
    response.raise_for_status()
    data = response.json()

    if data.get("results"):
        # Return the URL to the first image
        return data["results"][0]["urls"]["regular"]
    else:
        return None

def download_and_format_image(image_url, product_id, output_dir=OUTPUT_DIR, size=(800, 800)):
    """Download an image from the given URL and save it with the product ID as the filename.
       Optionally resize/format the image."""
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    response = requests.get(image_url)
    response.raise_for_status()

    # Open the image with PIL
    img = Image.open(BytesIO(response.content))
    img = img.convert("RGB")
    img = img.resize(size, Resampling.LANCZOS)

    filename = f"product_{product_id}.jpg"
    filepath = os.path.join(output_dir, filename)
    img.save(filepath, format="JPEG", quality=90)
    print(f"Image saved as {filepath}")

if __name__ == "__main__":
    for product in products:
        product_id = product["id"]
        product_name = product["nom"]
        print(f"Searching image for product {product_id}: {product_name}")

        image_url = search_unsplash_image(product_name)
        if image_url:
            download_and_format_image(image_url, product_id)
        else:
            print(f"No image found for product {product_id}: {product_name}")
