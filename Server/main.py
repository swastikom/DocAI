import os
import shutil
import logging
from fastapi import FastAPI, File, UploadFile, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pypdf import PdfReader
from database import SessionLocal, engine
import models, schemas, crud
from functions import answer_question

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create the database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Allow CORS for frontend
origins = [
    "http://localhost:3000", # Local frontend Origin
    "https://doc-ai-indol.vercel.app" # Deployed frontend Origin
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Path to upload files
UPLOAD_DIRECTORY = "uploaded_files/"

# Ensure the directories exist
os.makedirs(UPLOAD_DIRECTORY, exist_ok=True)

@app.post("/upload/", response_model=schemas.Document)
async def upload_file(file: UploadFile = File(...), db: Session = Depends(get_db)):
    # Check if the uploaded file is a PDF
    if file.content_type != 'application/pdf':
        raise HTTPException(status_code=400, detail="Only PDF files are allowed.")
    
    # Fetch all documents and delete them from the database and filesystem
    existing_documents = crud.get_documents(db)
    for doc in existing_documents:
        file_path = doc.file_path
        if os.path.exists(file_path):
            os.remove(file_path)
        crud.delete_document(db=db, document_id=doc.id)
    
    # Save the new file to the local filesystem
    file_location = os.path.join(UPLOAD_DIRECTORY, file.filename)
    with open(file_location, "wb") as f:
        shutil.copyfileobj(file.file, f)

    # Create the document metadata entry in the database
    document = schemas.DocumentCreate(filename=file.filename, file_path=file_location)
    db_document = crud.create_document(db=db, document=document)

    return db_document

@app.post("/answer/{document_id}/", response_model=schemas.AnswerResponse)
async def get_pdf_text(document_id: int, request: schemas.QuestionRequest, db: Session = Depends(get_db)):
    # Fetch the document from the database
    document = crud.get_document(db, document_id=document_id)
    if not document:
        raise HTTPException(status_code=404, detail="Document not found.")
    
    pdf_path = document.file_path

    # Check if the PDF file exists
    if not os.path.exists(pdf_path):
        raise HTTPException(status_code=404, detail=f"PDF file not found at {pdf_path}")
    
    try:
        logger.info(f"Opening PDF file at {pdf_path}")
        reader = PdfReader(pdf_path)
        text = ""
        for page_number, page in enumerate(reader.pages, start=1):
            page_text = page.extract_text()
            if page_text:
                text += page_text
            else:
                logger.warning(f"Failed to extract text from page {page_number}")
        
        # Check if any text was extracted from the PDF
        if not text:
            raise HTTPException(status_code=400, detail="No text extracted from the PDF.")
        
        # Get the answer to the question from the extracted text
        answer = answer_question(text, request.question)
        return {"document_id": document_id, "answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing PDF file: {e}")

@app.delete("/text/{document_id}/")
async def delete_pdf(document_id: int, db: Session = Depends(get_db)):
    # Fetch the document from the database
    document = crud.get_document(db, document_id=document_id)
    if not document:
        raise HTTPException(status_code=404, detail="Document not found.")
    
    file_path = document.file_path
    # Check if the PDF file exists and delete it
    if os.path.exists(file_path):
        os.remove(file_path)
    
    # Delete the document metadata from the database
    crud.delete_document(db=db, document_id=document_id)
    
    return {"detail": "Document deleted successfully"}

@app.get("/document/first")
async def get_first_document(db: Session = Depends(get_db)):
    # Fetch the first document from the database
    document_id = 1  
    document = crud.get_document_by_id(db, document_id)
    if not document:
        return "no document"
    return document

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))  
    uvicorn.run(app, host="0.0.0.0", port=port)  
