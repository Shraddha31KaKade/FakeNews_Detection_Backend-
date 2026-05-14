import os
import sys

# Add the current directory to path so it can find 'app'
sys.path.append(os.getcwd())

from app.db.database import engine, Base
from app.models import user_model, history_model

# 1. Path to the database
db_path = "fake_news.db"

# 2. Delete the old database if it exists
if os.path.exists(db_path):
    try:
        # Check if file is locked
        os.remove(db_path)
        print(f"--- [SUCCESS] Old database '{db_path}' deleted. ---")
    except Exception as e:
        print(f"--- [ERROR] Could not delete database: {e} ---")
        print("Please make sure your uvicorn server is STOPPED before running this script.")
        sys.exit(1)
else:
    print(f"--- [INFO] No database found at {db_path}. Proceeding to create one. ---")

# 3. Recreate the database with the NEW schema
try:
    Base.metadata.create_all(bind=engine)
    print("--- [SUCCESS] Fresh database created with support for Guest searches. ---")
except Exception as e:
    print(f"--- [ERROR] Failed to create fresh database: {e} ---")
