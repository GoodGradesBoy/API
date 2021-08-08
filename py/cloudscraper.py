import cloudscraper
import argparse

# Get arguments
parser = argparse.ArgumentParser()
parser.add_argument("method")
parser.add_argument("url")
parser.add_argument("data")
args = parser.parse_args()

# Initialize the scraper.
scraper = cloudscraper.create_scraper()

if (args.method == "get"):
    print(scraper.get(args.url).text)
elif (args.method == "post"):
    print(scraper.post(args.url, args.data or {}).text)
else:
    print("That is an unsupported HTTP method!")
