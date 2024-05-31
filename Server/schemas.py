from pydantic import BaseModel

# Base model for documents, containing common fields
class DocumentBase(BaseModel):
    filename: str
    file_path: str

# Model for creating a new document, inherits from DocumentBase
class DocumentCreate(DocumentBase):
    pass

# Model for a document with an ID, used in responses
class Document(DocumentBase):
    id: int

    # Configuration to allow ORM mode
    class Config:
        from_attributes = True

# Model for handling question requests
class QuestionRequest(BaseModel):
    question: str

# Model for the answer response, containing the document ID and the answer
class AnswerResponse(BaseModel):
    document_id: int
    answer: str
