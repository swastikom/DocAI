from sqlalchemy.orm import Session
import models, schemas

# Function to create a new document in the database
def create_document(db: Session, document: schemas.DocumentCreate):
    # Create a new Document object using the data from the request
    db_document = models.Document(filename=document.filename, file_path=document.file_path)
    # Add the new document to the database session
    db.add(db_document)
    # Commit the transaction to save the changes to the database
    db.commit()
    # Refresh the database object to reflect any changes made during the commit
    db.refresh(db_document)
    # Return the newly created document
    return db_document

# Function to retrieve a document from the database by its ID
def get_document(db: Session, document_id: int):
    return db.query(models.Document).filter(models.Document.id == document_id).first()

# Function to retrieve all documents from the database
def get_documents(db: Session):
    return db.query(models.Document).all()

# Function to delete a document from the database by its ID
def delete_document(db: Session, document_id: int):
    # Query the database for the document by its ID
    document = db.query(models.Document).filter(models.Document.id == document_id).first()
    # If the document exists, delete it from the database
    if document:
        db.delete(document)
        # Commit the transaction to save the changes to the database
        db.commit()

# Function to retrieve a document from the database by its ID
def get_document_by_id(db: Session, document_id: int):
    return db.query(models.Document).filter(models.Document.id == document_id).first()
