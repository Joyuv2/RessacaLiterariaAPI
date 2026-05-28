from sqlalchemy import Column, Integer, String, Enum
from database.connection import Base

class Usuario(Base):
    __tablename__ = "usuarios"
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False, index=True)
    senha = Column(String(255), nullable=False)
    tipo = Column(Enum("administrador", "cliente", "participante do projeto"), nullable=False, default="cliente")