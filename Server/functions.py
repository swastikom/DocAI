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

    # We need to split the text using Character Text Split such that it should not increase token size
    text_splitter = CharacterTextSplitter(
        separator="\n",
        chunk_size=800,
        chunk_overlap=200,
        length_function=len,
    )
    texts = text_splitter.split_text(raw_text)

    # Download embeddings from OpenAI
    embeddings = OpenAIEmbeddings(api_key=api_key)

    document_search = FAISS.from_texts(texts, embeddings)

    chain = load_qa_chain(openai, chain_type="stuff")

    docs = document_search.similarity_search(question)
    return chain.run(input_documents=docs, question=question)
