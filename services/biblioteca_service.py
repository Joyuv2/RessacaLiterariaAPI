from sqlalchemy.orm import Session
from models import Biblioteca
from datetime import date
from typing import Optional

def adicionar_livro_biblioteca(db: Session, usuario_id: int, livro_id: int, status_leitura: str, data_inicio: Optional[date], data_prevista: Optional[date]) -> Biblioteca:
    existente = db.query(Biblioteca).filter_by(usuario_id=usuario_id, livro_id=livro_id).first()
    if existente:
        raise ValueError("Livro já está na biblioteca")
    nova = Biblioteca(
        usuario_id=usuario_id,
        livro_id=livro_id,
        status_leitura=status_leitura,
        data_inicio=data_inicio,
        data_prevista_termino=data_prevista
    )
    db.add(nova)
    db.commit()
    db.refresh(nova)
    return nova

def listar_biblioteca_usuario(db: Session, usuario_id: int):
    return db.query(Biblioteca).filter(Biblioteca.usuario_id == usuario_id).all()

def obter_item_biblioteca(db: Session, item_id: int, usuario_id: int) -> Optional[Biblioteca]:
    return db.query(Biblioteca).filter(Biblioteca.id == item_id, Biblioteca.usuario_id == usuario_id).first()

def atualizar_item_biblioteca(db: Session, item: Biblioteca, status_leitura: Optional[str], data_inicio: Optional[date], data_prevista: Optional[date]) -> Biblioteca:
    if status_leitura is not None:
        item.status_leitura = status_leitura
    if data_inicio is not None:
        item.data_inicio = data_inicio
    if data_prevista is not None:
        item.data_prevista_termino = data_prevista
    db.commit()
    db.refresh(item)
    return item

def deletar_item_biblioteca(db: Session, item: Biblioteca):
    db.delete(item)
    db.commit()