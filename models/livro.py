from sqlalchemy import Column, Integer, String
from database.connection import Base

class Livro(Base):
    __tablename__ = "livros"
    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String(150), nullable=False)
    autor = Column(String(100), nullable=False)
    genero = Column(String(50))