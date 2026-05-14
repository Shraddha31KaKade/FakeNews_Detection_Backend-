import httpx
import os
import re
from typing import List, Dict
from dotenv import load_dotenv

load_dotenv()

# Configuration from Environment
NEWS_API_KEY = os.getenv("NEWS_API_KEY", "")

# List of trusted news organizations for verification (India-focused)
TRUSTED_SOURCES = [
    "timesofindia.indiatimes.com", "ndtv.com", "thehindu.com", "indianexpress.com",
    "hindustantimes.com", "news18.com", "indiatoday.in", "zeenews.india.com",
    "business-standard.com", "scroll.in", "thewire.in", "livemint.com", "republicworld.com"
]

class NewsVerificationService:
    def __init__(self):
        self.api_key = NEWS_API_KEY
        self.base_url = "https://newsapi.org/v2/everything"

    def _extract_keywords(self, text: str) -> str:
        """
        Extracts key terms from the text for search query.
        Focuses on significant words while excluding very short or long strings.
        """
        # Remove non-alphanumeric characters (except spaces)
        clean_text = re.sub(r'[^\w\s]', ' ', text)
        words = clean_text.split()
        
        # Filter words by length to avoid prepositions/noise and URLs/garbage
        filtered_words = [w for w in words if 4 < len(w) < 20]
        
        # Select unique words to build a clean search query
        unique_words = []
        for w in filtered_words:
            if w.lower() not in unique_words:
                unique_words.append(w.lower())
        
        # Keywords extraction with priority for official agencies
        priority_words = ["IMD", "ISRO", "RBI", "Government", "Meteorological"]
        found_priority = [w for w in priority_words if w.lower() in text.lower()]
        
        # Combine priority words with unique context words
        final_keywords = found_priority + [w for w in unique_words if w.lower() not in [p.lower() for p in found_priority]]
        
        # Return top words and ensure Indian context
        query_base = " ".join(final_keywords[:6])
        if "india" not in query_base.lower() and "imd" not in query_base.lower():
            query_base += " India"
        return query_base

    async def verify_news(self, text: str) -> Dict:
        """
        Orchestrates keyword extraction, external API calling, and source credibility check.
        """
        if not self.api_key:
            # Fallback for when API key is missing
            print("WARNING: News API key not found in .env. Verification skipped.")
            return {"matched": False, "sources": []}

        # Handle empty or too short input
        if not text or len(text.strip()) < 20:
            return {"matched": False, "sources": []}

        query = self._extract_keywords(text)
        if not query:
            return {"matched": False, "sources": []}

        params = {
            "q": query,
            "sortBy": "relevancy",
            "pageSize": 5,
            "apiKey": self.api_key,
            "language": "en"
        }

        async with httpx.AsyncClient() as client:
            try:
                # Set a strict timeout to ensure performance isn't bottlenecked
                response = await client.get(self.base_url, params=params, timeout=5.0)
                
                if response.status_code != 200:
                    print(f"News API Error Code: {response.status_code}")
                    return {"matched": False, "sources": []}

                data = response.json()
                articles = data.get("articles", [])
                
                sources_list = []
                for art in articles:
                    url = art.get("url", "")
                    title = art.get("title", "No Title")
                    description = art.get("description", "No details available.")
                    source_name = art.get("source", {}).get("name", "Unknown Source")
                    
                    # Domain Extraction Logic
                    domain = ""
                    if url:
                        domain_match = re.search(r'https?://([^/]+)', url)
                        if domain_match:
                            domain = domain_match.group(1).replace("www.", "")

                    # STEP 2: Source Credibility Check
                    is_trusted = any(trusted in domain for trusted in TRUSTED_SOURCES)
                    
                    sources_list.append({
                        "title": title,
                        "description": description,
                        "url": url,
                        "source": source_name,
                        "domain": domain,
                        "credibility": "trusted" if is_trusted else "untrusted"
                    })

                return {
                    "matched": len(sources_list) > 0,
                    "sources": sources_list
                }

            except (httpx.TimeoutException, httpx.RequestError) as e:
                print(f"Performance/Network Issue with News API: {e}")
                return {"matched": False, "sources": []}
            except Exception as e:
                print(f"Unexpected error in verification layer: {e}")
                return {"matched": False, "sources": []}

# Singleton instance to persist across requests (Performance Optimization)
news_verification_service = NewsVerificationService()
