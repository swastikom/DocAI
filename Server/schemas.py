from pydantic import BaseModel

class DocumentBase(BaseModel):
    filename: str
    file_path: str

class DocumentCreate(DocumentBase):
    pass

class Document(DocumentBase):
    id: int

    class Config:
        from_attributes = True

class QuestionRequest(BaseModel):
    question: str

class AnswerResponse(BaseModel):
    document_id: int
    answer: str


