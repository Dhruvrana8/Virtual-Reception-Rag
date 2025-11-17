from pathlib import Path
from typing import Union, List

from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_core.documents import Document


DEFAULT_EMBED_MODEL = "sentence-transformers/all-MiniLM-L6-v2"
DEFAULT_CHUNK_SIZE = 1000
DEFAULT_CHUNK_OVERLAP = 200


class EmbeddingPipeline:

    def __init__(
        self,
        pdf_path: Union[str, Path],
        save_dir: Union[str, Path] = "vectorstore",
        embed_model_name: str = DEFAULT_EMBED_MODEL,
        chunk_size: int = DEFAULT_CHUNK_SIZE,
        chunk_overlap: int = DEFAULT_CHUNK_OVERLAP,
        k_retriever: int = 6
    ):
        self.pdf_path = Path(pdf_path)
        self.save_dir = Path(save_dir)
        self.save_dir.mkdir(parents=True, exist_ok=True)

        self.embed_model_name = embed_model_name
        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap
        self.k_retriever = k_retriever

        self.chunks: List[Document] = []
        self.retriever = None
        self.vectorstore = None

    def load_and_split(self):
        docs = []
        paths = [self.pdf_path] if self.pdf_path.is_file(
        ) else list(self.pdf_path.glob("*.pdf"))

        for p in paths:
            loader = PyPDFLoader(str(p))
            docs.extend(loader.load())

        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=self.chunk_size,
            chunk_overlap=self.chunk_overlap,
        )
        self.chunks = text_splitter.split_documents(docs)

    def create_vectorstore(self):
        embeddings = HuggingFaceEmbeddings(model_name=self.embed_model_name)
        self.vectorstore = FAISS.from_documents(self.chunks, embeddings)

        # Save FAISS index
        self.vectorstore.save_local(self.save_dir)

        self.retriever = self.vectorstore.as_retriever(
            search_kwargs={"k": self.k_retriever})

    def run(self):
        self.load_and_split()
        self.create_vectorstore()

        print(f"\n*** Vectorstore saved to: {self.save_dir} ***")
        return self.retriever
