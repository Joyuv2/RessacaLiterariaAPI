from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from typing import Optional
from database.connection import get_db
from models import Usuario
from services.auth_service import hash_password, verify_password, create_access_token, get_current_user

router = APIRouter(prefix="", tags=["auth"])

class UsuarioCreate(BaseModel):
    nome: str
    email: EmailStr
    senha: str
    tipo: Optional[str] = "cliente"

class UsuarioUpdate(BaseModel):
    nome: Optional[str] = None
    email: Optional[EmailStr] = None
    senha: Optional[str] = None

class LoginSchema(BaseModel):
    email: EmailStr
    senha: str

class UsuarioOut(BaseModel):
    id: int
    nome: str
    email: str
    tipo: str

@router.post("/cadastrar", status_code=201)
def cadastrar(user: UsuarioCreate, db: Session = Depends(get_db)):
    if db.query(Usuario).filter(Usuario.email == user.email).first():
        raise HTTPException(400, "E-mail já cadastrado")
    novo = Usuario(nome=user.nome, email=user.email, senha=hash_password(user.senha), tipo=user.tipo)
    db.add(novo)
    db.commit()
    db.refresh(novo)
    return {"msg": "Usuário criado", "id": novo.id}

@router.post("/login")
def login(login: LoginSchema, db: Session = Depends(get_db)):
    user = db.query(Usuario).filter(Usuario.email == login.email).first()
    if not user or not verify_password(login.senha, user.senha):
        raise HTTPException(401, "E-mail ou senha inválidos")
    token = create_access_token({"sub": str(user.id)})
    return {"access_token": token, "token_type": "bearer"}

@router.get("/usuarios/me", response_model=UsuarioOut)
def me(current_user: Usuario = Depends(get_current_user)):
    return current_user

@router.put("/usuarios/me")
def atualizar_perfil(dados: UsuarioUpdate, current_user: Usuario = Depends(get_current_user), db: Session = Depends(get_db)):
    if dados.nome:
        current_user.nome = dados.nome
    if dados.email:
        if db.query(Usuario).filter(Usuario.email == dados.email).first():
            raise HTTPException(400, "E-mail já em uso")
        current_user.email = dados.email
    if dados.senha:
        current_user.senha = hash_password(dados.senha)
    db.commit()
    return {"msg": "Perfil atualizado"}

@router.delete("/usuarios/me")
def deletar_conta(current_user: Usuario = Depends(get_current_user), db: Session = Depends(get_db)):
    db.delete(current_user)
    db.commit()
    return {"msg": "Conta deletada"}