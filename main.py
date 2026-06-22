from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth_router, biblioteca_router

app = FastAPI(title="Ressaca Literária API", version="1.0")

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(biblioteca_router)

@app.get("/")
def root():
    return {"message": "API do projeto Ressaca Literária - CRUD de usuário e biblioteca"}