from fastapi import FastAPI
from .database import engine, Base
from .routers import auth, documents, chats
from dotenv import load_dotenv

load_dotenv()
# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Virtual Reception RAG Backend")

from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(documents.router)
app.include_router(chats.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Virtual Reception RAG API"}
