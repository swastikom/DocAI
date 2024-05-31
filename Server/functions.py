from langchain_openai import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain.chains.question_answering import load_qa_chain
from langchain_openai import OpenAI

from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

def answer_question(raw_text, question):
    # Ensure the OpenAI API key is set
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise ValueError("OPENAI_API_KEY environment variable not set")

    # Initialize the OpenAI object with the API key
    openai = OpenAI(api_key=api_key)

    # Split the text into chunks using a character-based splitter
    # The chunks should be small enough to avoid exceeding token limits
    text_splitter = CharacterTextSplitter(
        separator="\n",  # Split the text at newline characters
        chunk_size=800,  # Maximum size of each chunk
        chunk_overlap=200,  # Overlap between consecutive chunks
        length_function=len,  # Function to calculate the length of each chunk
    )
    texts = text_splitter.split_text(raw_text)  # Split the raw text into chunks

    # Download embeddings from OpenAI
    embeddings = OpenAIEmbeddings(api_key=api_key)

    # Create a FAISS index from the text chunks and their embeddings
    document_search = FAISS.from_texts(texts, embeddings)

    # Load the question-answering chain with the OpenAI model
    chain = load_qa_chain(openai, chain_type="stuff")

    # Perform a similarity search on the documents to find the most relevant chunks
    docs = document_search.similarity_search(question)
    
    # Use the question-answering chain to generate an answer based on the relevant documents
    result = chain.invoke({"input_documents": docs, "question": question})
    
    # Extract the answer text from the result
    answer = result["output_text"]
    
    return answer

# Uncomment the following lines to test the function
# if __name__ == "__main__":
#     raw_text = "Your text here..."
#     question = "Your question here..."
#     answer = answer_question(raw_text, question)
#     print(answer)
