from fastapi import FastAPI, File, UploadFile, HTTPException, Depends
from sqlalchemy.orm import Session
from functions import answer_question
from database import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware
import os
import shutil
import models, schemas, crud
import fitz


# Create the database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()


origins = [
    "http://localhost:3000",  # Add your frontend's origin here
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
    if file.content_type != 'application/pdf':
        raise HTTPException(status_code=400, detail="Only PDF files are allowed.")
    
    # Save the file to the local filesystem
    file_location = os.path.join(UPLOAD_DIRECTORY, file.filename)
    with open(file_location, "wb") as f:
        shutil.copyfileobj(file.file, f)

    # Create the document metadata entry
    document = schemas.DocumentCreate(filename=file.filename, file_path=file_location)
    db_document = crud.create_document(db=db, document=document)

    return db_document

@app.post("/answer/{document_id}/", response_model=schemas.AnswerResponse)
async def get_pdf_text(document_id: int, request: schemas.QuestionRequest, db: Session = Depends(get_db)):
    document = crud.get_document(db, document_id=document_id)
    if not document:
        raise HTTPException(status_code=404, detail="Document not found.")
    
    # Extract text from the PDF file
    pdf_path = document.file_path
    try:
        doc = fitz.open(pdf_path)
        text = ""
        for page in doc:
            text += page.get_text()
        
        answer = answer_question(text, request.question)
        return {"document_id": document_id, "answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error processing PDF file.")
    
@app.delete("/text/{document_id}/")
async def delete_pdf(document_id: int, db: Session = Depends(get_db)):
    document = crud.get_document(db, document_id=document_id)
    if not document:
        raise HTTPException(status_code=404, detail="Document not found.")
    
    # Delete the file from the local filesystem
    file_path = document.file_path
    if os.path.exists(file_path):
        os.remove(file_path)
    
    # Remove the document entry from the database
    crud.delete_document(db=db, document_id=document_id)
    
    return {"detail": "Document deleted successfully"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)