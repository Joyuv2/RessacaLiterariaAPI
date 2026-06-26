'use client';


import { useEffect, useState } from 'react';
import api from '@/app/servicos/api';
import "@/app/styles/usuario.css"

interface ItemBiblioteca {
  id: number;
  livro: {
    id: number;
    titulo: string;
    autor: string;
  };
  status_leitura: string;
  data_inicio: string | null;
  data_prevista_termino: string | null;
}


export default function BibliotecaPessoal() {
  const [livros, setLivros] = useState<ItemBiblioteca[]>([]);
  const [carregando, setCarregando] = useState(true);


  useEffect(() => {
    carregarBiblioteca();
  }, []);


  const carregarBiblioteca = async () => {
    try {
      const resposta = await api.get('/biblioteca/');
      setLivros(resposta.data);
    } catch (erro) {
      console.error('Erro ao carregar biblioteca', erro);
    } finally {
      setCarregando(false);
    }
  };


  const removerLivro = async (id: number) => {
    try {
      await api.delete(`/biblioteca/${id}`);
      setLivros(livros.filter((livro) => livro.id !== id));
    } catch (erro) {
      console.error('Erro ao remover livro', erro);
    }
  };


  if (carregando) return <p>Carregando biblioteca...</p>;


  return (
    <div>
      <h1>📚 Minha Biblioteca</h1>


      {livros.length === 0 ? (
        <p>Nenhum livro adicionado ainda.</p>
      ) : (
        <div className="biblioteca-grid">
          {livros.map((item) => (
            <div className="livro-card" key={item.id}>
              <h3>{item.livro.titulo}</h3>


              <p>
                <strong>Autor:</strong> {item.livro.autor}
              </p>


              <p>
                <strong>Status:</strong> {item.status_leitura}
              </p>


              {item.data_inicio && (
                <p>
                  <strong>Início:</strong> {item.data_inicio}
                </p>
              )}


              {item.data_prevista_termino && (
                <p>
                  <strong>Término:</strong> {item.data_prevista_termino}
                </p>
              )}


              <button
                onClick={() => removerLivro(item.id)}
                className="btn-remover"
              >
                Remover
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

