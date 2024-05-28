from sqlalchemy.orm import Session
import models, schemas

def create_document(db: Session, document: schemas.DocumentCreate):
    db_document = models.Document(filename=document.filename, file_path=document.file_path)
    db.add(db_document)
    db.commit()
    db.refresh(db_document)
    return db_document

def get_document(db: Session, document_id: int):
    return db.query(models.Document).filter(models.Document.id == document_id).first()

def delete_document(db: Session, document_id: int):
    document = db.query(models.Document).filter(models.Document.id == document_id).first()
    if document:
        db.delete(document)
        db.commit()
