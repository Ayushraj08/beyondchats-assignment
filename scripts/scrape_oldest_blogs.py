import requests
from bs4 import BeautifulSoup
from datetime import datetime
import json

BLOG_URLS = [
    "https://beyondchats.com/blogs/introduction-to-chatbots/",
    "https://beyondchats.com/blogs/live-chatbot/",
    "https://beyondchats.com/blogs/virtual-assistant/",
    "https://beyondchats.com/blogs/lead-generation-chatbots/",
    "https://beyondchats.com/blogs/chatbots-for-small-business-growth/",
]

HEADERS = {
    "User-Agent": "Mozilla/5.0 (compatible; BeyondChatsAssignment/1.0)"
}


def scrape_blog(url):
    print(f"Scraping: {url}")
    response = requests.get(url, headers=HEADERS, timeout=10)
    response.raise_for_status()

    soup = BeautifulSoup(response.text, "html.parser")

    # Title
    title_tag = soup.find("h1")
    title = title_tag.get_text(strip=True) if title_tag else ""

    # Author & Date (best effort)
    meta_section = soup.find("div", class_="elementor-post-info")
    author = ""
    published_date = ""

    if meta_section:
        text = meta_section.get_text(" ", strip=True)
        # Example: "RITIKA SANKHLA / DECEMBER 6, 2023"
        parts = text.split("/")
        if len(parts) == 2:
            author = parts[0].strip()
            published_date = parts[1].strip()

    # Main content
    content_blocks = soup.select(".elementor-widget-theme-post-content p")
    paragraphs = [p.get_text(strip=True) for p in content_blocks]
    content = "\n\n".join(paragraphs)

    return {
        "title": title,
        "author": author,
        "published_date": published_date,
        "content": content,
        "source_url": url,
        "scraped_at": datetime.utcnow().isoformat()
    }


def main():
    articles = []

    for url in BLOG_URLS:
        try:
            article = scrape_blog(url)
            articles.append(article)
        except Exception as e:
            print(f"Failed to scrape {url}: {e}")

    with open("oldest_articles.json", "w", encoding="utf-8") as f:
        json.dump(articles, f, indent=2, ensure_ascii=False)

    print("Scraping completed. Data saved to oldest_articles.json")


if __name__ == "__main__":
    main()
