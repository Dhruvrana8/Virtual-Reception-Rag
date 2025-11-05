# 🏢 Virtual Reception

###  A Retrieval-Augmented Generation (RAG) powered application designed to serve as an intelligent Virtual Reception System.
This system allows users to interact with organizational or project documentation conversationally — getting precise answers instantly.
If the requested information isn’t found in the documents, the model gracefully responds with:
```
“Sorry, I do not have this information.”
```

### 🚀 Overview
Virtual Reception bridges the gap between static documentation and natural language understanding.
By combining LLMs (Large Language Models) with vector-based retrieval, it delivers accurate, document-grounded answers — making it ideal for businesses, projects, or institutions that want to automate FAQ-style or onboarding interactions.

## 🧠 Key Features

📄 RAG Framework — Combines LLMs with a vector store for context-aware responses.

🔍 Document Querying — Upload multiple docs (PDF, TXT, MD, etc.) and search naturally.

⚙️ Customizable Pipeline — Plug in your own models and embeddings (supports Hugging Face).

❌ Fallback Safety — When no relevant information is found, it politely declines with an appropriate response.

### 🧩 Modular Architecture — Easy to extend for domain-specific or enterprise setups.
```commandline

🧱 Project Architecture
Virtual Reception
.
├── .env
├── .gitignore
├── .python-version
├── config
├── data
│   └──
├── models
│   └──
├── notebooks
│   └── index.ipynb
├── pyproject.toml
├── README.md
├── requirements.txt
├── src
│   └── main.py
├── tests
└── uv.lock

```

### ⚙️ Tech Stack
Component	Technology
Framework	Python
RAG Model	Hugging Face (e.g. Mistral-7B-Instruct-v0.3, configurable)
Embeddings	Sentence Transformers / Hugging Face Embeddings
Vector Database	FAISS / ChromaDB
Frontend (Optional)	Streamlit / React
Deployment	Docker / Hugging Face Spaces

## 🧩 Setup Instructions
1️⃣ Clone the Repository
```commandline
git clone https://github.com/Dhruvrana8/virtual-reception-rag
cd virtual-reception
```

2️⃣ Create Virtual Environment
```
python -m venv venv
source venv/bin/activate   # for Mac/Linux
venv\Scripts\activate      # for Windows
```

3️⃣ Install Dependencies
```
pip install -r requirements.txt
```
4️⃣ Add Documents

Place your documents (PDFs, text files, or markdown) inside the data/ folder.

5️⃣ Run the Application
python app.py


## 📄 License

This project is licensed under the MIT License — feel free to use and modify it as needed.

## 👨‍💻 Author

[Dhruv Rana](https://www.dhruvrana.com/)
Post-Graduate in Artificial Intelligence and Machine Learning @ Lambton College
 • [GitHub](https://github.com/Dhruvrana8)
 • [LinkedIn](https://www.linkedin.com/in/dhruv-rana-bb94661b4/)