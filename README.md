# 🔎 TF-IDF Search Engine

A learning-focused search engine built from scratch using **Python, Flask, HTML, CSS, and JavaScript**.

The project started as a Python-based document search engine and was gradually connected to a web frontend using a Flask API.

The search engine uses an **Inverted Index** and **TF-IDF (Term Frequency–Inverse Document Frequency)** to calculate document relevance and rank search results.

The main purpose of this project is to learn how search engines, ranking algorithms, backend APIs, and frontend-backend communication work by implementing them step by step.

---

# 🎯 Project Goal

The goal of this project is to understand and implement the basic components of a search engine rather than relying on an existing search library.

The current version searches through `.txt` documents and ranks matching documents using TF-IDF.

The project is being developed using a problem-solving approach where each part is divided into smaller problems and implemented individually.

---

# 🧠 Concepts Learned

## Search Engine

- Reading text files
- Text cleaning
- Tokenization
- Inverted Index
- Word frequency
- Term Frequency (TF)
- Document Frequency
- Inverse Document Frequency (IDF)
- TF-IDF
- Search ranking
- Multi-word search

## Python

- Lists
- Dictionaries
- Nested dictionaries
- Loops
- Functions
- File handling
- `os.scandir()`
- Mathematical calculations
- Sorting
- Returning values from functions

## Frontend

- HTML
- CSS
- JavaScript
- DOM manipulation
- Event listeners
- Dynamic rendering
- JavaScript objects
- Arrays
- `fetch()`
- Loading states
- No-result states
- Error handling

## Backend

- Flask
- HTTP requests
- HTTP responses
- Flask routes
- Query parameters
- JSON responses
- CORS
- Frontend-backend communication

---

# 🏗️ Architecture

```text
                         USER
                           │
                           ▼
                  ┌─────────────────┐
                  │    Frontend     │
                  │  HTML/CSS/JS    │
                  └────────┬────────┘
                           │
                           │ HTTP Request
                           ▼
                  ┌─────────────────┐
                  │      Flask      │
                  │   Backend API   │
                  └────────┬────────┘
                           │
                           │ search(query)
                           ▼
                  ┌─────────────────┐
                  │  Search Engine  │
                  │     TF-IDF      │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │    Documents    │
                  │      .txt       │
                  └─────────────────┘
```

---

# 🔍 How It Works

## 1. Document Processing

The Python backend scans the `documents` directory and reads the `.txt` files.

Example:

```text
documents/
├── dsa.txt
├── machine_learning.txt
├── networking.txt
├── operating_systems.txt
└── python.txt
```

The text is converted into words and basic cleaning is performed.

---

## 2. Inverted Index

An inverted index is created to map each word to the documents where it occurs and how many times it occurs.

Example:

```python
{
    "machine": {
        "python.txt": 1,
        "machine_learning.txt": 5
    }
}
```

This allows the search engine to quickly determine which documents contain a particular word.

---

## 3. Term Frequency

Term Frequency measures how frequently a word appears in a document.

```text
TF = Number of times the word occurs in the document
     -----------------------------------------------
              Total number of words
```

For example:

```text
machine occurs 5 times
document contains 100 words

TF = 5 / 100
   = 0.05
```

---

## 4. Inverse Document Frequency

IDF measures how common or rare a word is across the document collection.

The implementation uses:

```text
IDF = log(
    Total number of documents /
    Number of documents containing the word
)
```

A word appearing in many documents gets a lower IDF value.

A word appearing in fewer documents gets a higher IDF value.

---

## 5. TF-IDF

The final score is calculated using:

```text
TF-IDF = TF × IDF
```

The TF-IDF score represents the importance of a word in a particular document relative to the entire document collection.

---

## 6. Ranking

For a query containing multiple words, the search engine calculates TF-IDF scores for the matching documents.

The scores for the query words are combined for each document.

The documents are then sorted by their total score in descending order.

Example:

```text
machine_learning.txt → 0.21309
python.txt            → 0.05553
```

The document with the higher score is ranked first.

---

# 🌐 Flask API

The Flask backend provides a search endpoint.

## Search Endpoint

```http
GET /get-data?query=<search-term>
```

Example:

```text
http://127.0.0.1:5000/get-data?query=dsa
```

The request flow is:

```text
Client
  ↓
GET /get-data?query=dsa
  ↓
Flask
  ↓
request.args.get("query")
  ↓
search("dsa")
  ↓
TF-IDF
  ↓
Rank results
  ↓
JSON response
```

Example response:

```json
{
    "dsa.txt": 0.1234,
    "machine_learning.txt": 0.0456
}
```

---

# 🔄 Frontend and Backend Communication

The frontend uses JavaScript `fetch()` to communicate with the Flask API.

For example:

```text
User
  ↓
Enters "machine learning"
  ↓
JavaScript
  ↓
fetch()
  ↓
Flask API
  ↓
search("machine learning")
  ↓
TF-IDF ranking
  ↓
JSON response
  ↓
JavaScript
  ↓
Dynamic result rendering
```

---

# 🖥️ Frontend

The frontend provides a search interface where the user can:

- Enter a search query
- Press Enter to search
- Click the search button
- See a loading state
- See ranked search results
- See document relevance scores
- See a no-results message
- See an error message if communication with the backend fails

Search results are dynamically generated using JavaScript.

---

# 📁 Project Structure

```text
SEARCH_ENGINE/
│
├── backend/
│   ├── venv/
│   └── search_engine.py
│
├── documents/
│   ├── dsa.txt
│   ├── machine_learning.txt
│   ├── networking.txt
│   ├── operating_systems.txt
│   └── python.txt
│
├── index.html
├── script.js
├── style.css
└── README.md
```

> `venv` is a local Python virtual environment and should not be uploaded to GitHub.

---

# 🚀 How to Run

The project currently uses **two local servers**:

```text
Frontend → http://127.0.0.1:5500
Backend  → http://127.0.0.1:5000
```

Both need to be running.

---

## 1. Clone the Repository

```bash
git clone <your-repository-url>
cd SEARCH_ENGINE
```

Replace `<your-repository-url>` with your GitHub repository URL.

---

## 2. Create a Virtual Environment

Go into the backend folder:

```bash
cd backend
```

Create the virtual environment:

```bash
python3 -m venv venv
```

Activate it on macOS/Linux:

```bash
source venv/bin/activate
```

On Windows:

```bash
venv\Scripts\activate
```

---

## 3. Install Dependencies

Install Flask and Flask-CORS:

```bash
pip install flask flask-cors
```

---

## 4. Start the Flask Backend

Make sure you are inside:

```text
SEARCH_ENGINE/backend/
```

Run:

```bash
python search_engine.py
```

You should see:

```text
* Running on http://127.0.0.1:5000
```

Keep this terminal running.

---

## 5. Start the Frontend

Open a **second terminal**.

Go back to the project root:

```bash
cd ..
```

Open `index.html` using a local development server.

For example, using **VS Code Live Server**:

1. Open `index.html`.
2. Right-click the file.
3. Select **Open with Live Server**.

The frontend should open at:

```text
http://127.0.0.1:5500/index.html
```

---

## 6. Search

Enter a search term such as:

```text
machine learning
```

The frontend sends the query to Flask.

Flask performs the TF-IDF search and sends the ranked results back as JSON.

The JavaScript frontend then displays the results.

---

# 🧪 Test the API Directly

You can test the Flask API without using the frontend.

Open:

```text
http://127.0.0.1:5000/get-data?query=dsa
```

If the backend is working, it should return JSON containing the ranked documents.

Example:

```json
{
    "dsa.txt": 0.1234
}
```

---

# 🌍 CORS

The frontend and backend run on different ports:

```text
Frontend:
http://127.0.0.1:5500

Backend:
http://127.0.0.1:5000
```

Because they use different ports, they are different origins.

The backend therefore uses Flask-CORS to allow the frontend to communicate with the API.

```python
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
```

---

# 🛑 Stopping the Application

To stop the Flask server:

```text
Ctrl + C
```

The frontend server can be stopped through VS Code Live Server.

---

# 📌 Current Version — V1

## Search Engine

- [x] Read `.txt` documents
- [x] Basic text cleaning
- [x] Tokenization
- [x] Inverted index
- [x] Word frequency tracking
- [x] Document length calculation
- [x] TF calculation
- [x] IDF calculation
- [x] TF-IDF calculation
- [x] Multi-word search
- [x] Result ranking
- [x] Search function

## Frontend

- [x] Search interface
- [x] Search input handling
- [x] Dynamic result rendering
- [x] Loading state
- [x] No-results state
- [x] Error state

## Backend

- [x] Flask server
- [x] API route
- [x] Query parameters
- [x] Python search function integration
- [x] JSON response
- [x] CORS configuration

## Integration

- [x] JavaScript → Flask
- [x] Flask → Python search engine
- [x] Python search engine → Flask
- [x] Flask → JavaScript
- [x] Dynamic result display

---

# 🔮 Future Versions

The following features are planned for future versions and are intentionally not part of the current V1.

## V2

- Improved text preprocessing
- Stop-word handling
- Better tokenization
- Improved search queries
- Search result snippets

## V3

- PDF support
- DOCX support
- Dynamic document uploading
- Document deletion
- Document management

## V4

- Improved indexing
- Search performance improvements
- Better ranking techniques
- Search filters

## V5

- Vector search
- Embeddings
- Semantic search
- Comparison between keyword search and semantic search

## V6

- Database integration
- Persistent storage
- Production configuration
- Deployment
- Security improvements

---

# 🎓 Learning Approach

This project is being developed as a **learning-first major project**.

The goal is not to simply use existing libraries or copy an entire application.

Each major feature is divided into smaller problems.

The development process follows:

```text
Problem
   ↓
Attempt
   ↓
Understand the concept
   ↓
Implement
   ↓
Test
   ↓
Improve
```

This approach allows the concepts behind the technologies and algorithms to be understood through practical implementation.

---

# 👨‍💻 Author

**Shashank**

AI & ML Engineering Student

---

# 📊 Project Status

**V1 — Functional**

The current version can search a collection of `.txt` documents using a manually implemented TF-IDF ranking system.

The search engine is exposed through a Flask API and connected to a JavaScript frontend that dynamically displays the ranked results.