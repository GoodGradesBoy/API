import cloudscraper
import argparse

import json as JSON

# Get arguments.
parser = argparse.ArgumentParser()
parser.add_argument("method")
parser.add_argument("url")
parser.add_argument("data")
args = parser.parse_args()

# Initialize the scraper.
scraper = cloudscraper.create_scraper()

if (args.method == "get"):
    # Send a GET request to the endpoint.
    print(scraper.get(args.url).text)
elif (args.method == "post"):
    # Send a POST request to the endpoint with an optional payload
    print(scraper.post(args.url, JSON.loads(args.data) if args.data else {}).text)
else:
    print("That is an unsupported HTTP method!")
