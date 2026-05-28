from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
from datetime import date
from database.connection import get_db
from models import Usuario, Livro, Biblioteca
from services.auth_service import get_current_user
from services.biblioteca_service import (
    adicionar_livro_biblioteca, listar_biblioteca_usuario,
    obter_item_biblioteca, atualizar_item_biblioteca, deletar_item_biblioteca
)

router = APIRouter(prefix="/biblioteca", tags=["biblioteca"])

class BibliotecaAdd(BaseModel):
    livro_id: int
    status_leitura: Optional[str] = "nao_iniciado"
    data_inicio: Optional[date] = None
    data_prevista_termino: Optional[date] = None

class BibliotecaUpdate(BaseModel):
    status_leitura: Optional[str] = None
    data_inicio: Optional[date] = None
    data_prevista_termino: Optional[date] = None

@router.post("/adicionar", status_code=201)
def adicionar(dados: BibliotecaAdd, current_user: Usuario = Depends(get_current_user), db: Session = Depends(get_db)):
    livro = db.query(Livro).filter(Livro.id == dados.livro_id).first()
    if not livro:
        raise HTTPException(404, "Livro não existe")
    try:
        item = adicionar_livro_biblioteca(db, current_user.id, dados.livro_id, dados.status_leitura, dados.data_inicio, dados.data_prevista_termino)
        return {"msg": "Livro adicionado à biblioteca", "id": item.id}
    except ValueError as e:
        raise HTTPException(400, str(e))

@router.get("/")
def listar(current_user: Usuario = Depends(get_current_user), db: Session = Depends(get_db)):
    items = listar_biblioteca_usuario(db, current_user.id)
    resultado = []
    for item in items:
        livro = db.query(Livro).get(item.livro_id)
        resultado.append({
            "id": item.id,
            "livro": {"id": livro.id, "titulo": livro.titulo, "autor": livro.autor},
            "status_leitura": item.status_leitura,
            "data_inicio": item.data_inicio,
            "data_prevista_termino": item.data_prevista_termino
        })
    return resultado

@router.get("/{item_id}")
def detalhe(item_id: int, current_user: Usuario = Depends(get_current_user), db: Session = Depends(get_db)):
    item = obter_item_biblioteca(db, item_id, current_user.id)
    if not item:
        raise HTTPException(404, "Item não encontrado")
    livro = db.query(Livro).get(item.livro_id)
    return {
        "id": item.id,
        "livro": {"id": livro.id, "titulo": livro.titulo, "autor": livro.autor},
        "status_leitura": item.status_leitura,
        "data_inicio": item.data_inicio,
        "data_prevista_termino": item.data_prevista_termino
    }

@router.put("/{item_id}")
def atualizar(item_id: int, dados: BibliotecaUpdate, current_user: Usuario = Depends(get_current_user), db: Session = Depends(get_db)):
    item = obter_item_biblioteca(db, item_id, current_user.id)
    if not item:
        raise HTTPException(404, "Item não encontrado")
    atualizar_item_biblioteca(db, item, dados.status_leitura, dados.data_inicio, dados.data_prevista_termino)
    return {"msg": "Item atualizado"}

@router.delete("/{item_id}")
def remover(item_id: int, current_user: Usuario = Depends(get_current_user), db: Session = Depends(get_db)):
    item = obter_item_biblioteca(db, item_id, current_user.id)
    if not item:
        raise HTTPException(404, "Item não encontrado")
    deletar_item_biblioteca(db, item)
    return {"msg": "Livro removido da biblioteca"}