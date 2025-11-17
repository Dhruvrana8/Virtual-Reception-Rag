from pathlib import Path
from rag_pipeline import RAGPipeline


def initialize_rag_pipeline():
    """
    Helper to initialize and run a basic RAGPipeline query loop.
    """
    vectorstore_dir = "./vectorstore"
    pipeline = RAGPipeline(vectorstore_dir)

    print("\nType a question to query the documents, or type 'exit' to quit.\n")
    while True:
        try:
            question = input("Your question: ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\nExiting RAG pipeline.")
            break

        if question.lower() in ("exit", "quit"):
            print("Goodbye!")
            break

        if not question:
            continue

        try:
            answer = pipeline.query(question)
            print(f"\nAnswer:\n{answer}\n")
        except Exception as e:
            print(f"Error during query: {e}")


def main():
    vectorstore_dir = "./vectorstore"
    vectorstore_path = Path(vectorstore_dir)

    # Check if index files exist
    pkl_index = vectorstore_path / "index.pkl"
    faiss_index = vectorstore_path / "index.faiss"

    if pkl_index.exists() and faiss_index.exists():
        print("Index files found. Running RAG pipeline...")
        initialize_rag_pipeline()
    else:
        print("Index files not found. Please build the vectorstore first.")


if __name__ == "__main__":
    main()
