import urllib.request
import re
from collections import Counter

url = "https://thequietus.com/reviews/"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
        colors = re.findall(r'#[A-Fa-f0-9]{3,6}', html)
        color_counts = Counter([c.upper() for c in colors])
        for color, count in color_counts.most_common(20):
            print(f"{color}: {count}")
except Exception as e:
    print(f"Error: {e}")
