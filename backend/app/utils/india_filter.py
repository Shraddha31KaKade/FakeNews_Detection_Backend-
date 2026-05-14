# backend/app/utils/india_filter.py

def is_india_related(text: str) -> bool:
    """
    Checks if the news text is related to the Indian context.
    Uses a refined list of Indian entities, cities, and cultural markers.
    """
    indian_keywords = [
        "india", "indian", "bharat", "hindustan",
        "modi", "rahul gandhi", "amit shah", "kejriwal",
        "delhi", "mumbai", "pune", "bengaluru", "chennai", "kolkata", "hyderabad",
        "isro", "imd", "rbi", "bjp", "congress", "aap", "trinamool",
        "crore", "lakh", "rupee", "inr", "pan card", "aadhaar",
        "ayodhya", "kashmir", "karnataka", "maharashtra", "gujarat", "punjab",
        "bollywood", "cricket", "ipl", "kohli", "dhoni"
    ]
    
    text_lower = text.lower()
    return any(word in text_lower for word in indian_keywords)
