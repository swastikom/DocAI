from langchain_community.embeddings import OllamaEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain.chains.question_answering import load_qa_chain
# from langchain_openai import OpenAI
from langchain_community.chat_models import ChatOllama


# Google LLM

import google.generativeai as genai
from langchain import PromptTemplate
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import Chroma
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_google_genai import GoogleGenerativeAIEmbeddings


from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

genai.configure(api_key=os.environ.get("GOOGLE_API_KEY"))


def answer_question_ollama(raw_text, question):
  # Split the text into chunks using a character-based splitter
  text_splitter = CharacterTextSplitter(
      separator="\n",  # Split the text at newline characters
      chunk_size=1000,  # Maximum size of each chunk
      chunk_overlap=200,  # Overlap between consecutive chunks
      length_function=len,  # Function to calculate the length of each chunk
  )

  texts = text_splitter.split_text(raw_text)  # Split the raw text into chunks

  # embeddings from Ollama
  embeddings = OllamaEmbeddings(model='nomic-embed-text')

  # Create a FAISS index from the text chunks and their embeddings
  document_search = FAISS.from_texts(texts, embeddings)

  # LLM from Ollama
  model_name = "llama3"
  llm = ChatOllama(model=model_name)

  # Load the question-answering chain with the OpenAI model
  chain = load_qa_chain(llm,chain_type="stuff")

  # Perform a similarity search on the documents to find the most relevant chunks
  docs = document_search.similarity_search(question)

  # Use the question-answering chain to generate an answer based on the relevant documents
  result = chain.invoke({"input_documents": docs, "question": question})

  # Extract the answer text from the result
  answer = result["output_text"]

  return answer


def answer_question_gemini(raw_text, question):
  prompt_template = """Answer the question as precise as possible using the provided context. If the answer is
                    not contained in the context, say "answer not available in context" \n\n
                    Context: \n {context}?\n
                    Question: \n {question} \n
                    Answer:
                  """

  prompt = PromptTemplate(
    template=prompt_template, input_variables=["context", "question"]
  )

  model = ChatGoogleGenerativeAI(model="gemini-pro",temperature=0.8)

  chain = load_qa_chain(model, chain_type='stuff', prompt=prompt)
  text_splitter = RecursiveCharacterTextSplitter(chunk_size=10000, chunk_overlap=500)
  texts = text_splitter.split_text(raw_text)
  embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
  vector_index = Chroma.from_texts(texts, embeddings).as_retriever()
  docs = vector_index.invoke(question)
  stuff_answer = chain.invoke(
    {"input_documents": docs, "question": question}, return_only_outputs=True
  )
  return stuff_answer['output_text']



# from langchain_openai import OpenAIEmbeddings
# from langchain.text_splitter import CharacterTextSplitter
# from langchain_community.vectorstores import FAISS
# from langchain.chains.question_answering import load_qa_chain
# from langchain_openai import OpenAI

# from dotenv import load_dotenv
# import os

# # Load environment variables from .env file
# load_dotenv()

# def answer_question(raw_text, question):
#     # Ensure the OpenAI API key is set
#     api_key = os.getenv("OPENAI_API_KEY")
#     if not api_key:
#         raise ValueError("OPENAI_API_KEY environment variable not set")

#     # Initialize the OpenAI object with the API key
#     openai = OpenAI(api_key=api_key)

#     # Split the text into chunks using a character-based splitter
#     # The chunks should be small enough to avoid exceeding token limits
#     text_splitter = CharacterTextSplitter(
#         separator="\n",  # Split the text at newline characters
#         chunk_size=800,  # Maximum size of each chunk
#         chunk_overlap=200,  # Overlap between consecutive chunks
#         length_function=len,  # Function to calculate the length of each chunk
#     )
#     texts = text_splitter.split_text(raw_text)  # Split the raw text into chunks

#     # Download embeddings from OpenAI
#     embeddings = OpenAIEmbeddings(api_key=api_key)

#     # Create a FAISS index from the text chunks and their embeddings
#     document_search = FAISS.from_texts(texts, embeddings)

#     # Load the question-answering chain with the OpenAI model
#     chain = load_qa_chain(openai, chain_type="stuff")

#     # Perform a similarity search on the documents to find the most relevant chunks
#     docs = document_search.similarity_search(question)
    
#     # Use the question-answering chain to generate an answer based on the relevant documents
#     result = chain.invoke({"input_documents": docs, "question": question})
    
#     # Extract the answer text from the result
#     answer = result["output_text"]
    
#     return answer

# # Uncomment the following lines to test the function
# # if __name__ == "__main__":
# #     raw_text = "Your text here..."
# #     question = "Your question here..."
# #     answer = answer_question(raw_text, question)
# #     print(answer)

