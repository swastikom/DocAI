from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

# Base class for declarative class definitions
Base = declarative_base()

# Defines the Document model which represents a table in the database
class Document(Base):
    __tablename__ = "documents"  # Name of the table in the database

    # Defines columns for the table
    id = Column(Integer, primary_key=True, index=True)  # Primary key column
    filename = Column(String, index=True)  # Column for the filename
    file_path = Column(String, index=True)  # Column for the file path
