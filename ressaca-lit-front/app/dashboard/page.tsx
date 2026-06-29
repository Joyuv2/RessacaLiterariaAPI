"use client";

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import BarraLateral from '@/app/componentes/BarraLateral';
import PerfilInfo from '@/app/componentes/PerfilInfo';
import AlterarSenha from '@/app/componentes/AlterarSenha';
import Notificacoes from '@/app/componentes/Notificacoes';
import Privacidade from '@/app/componentes/Privacidade';
import api from '@/app/servicos/api';
import BibliotecaPessoal from '../componentes/BibliotecaPessoal';
import "@/app/styles/usuario.css"

export default function Dashboard() {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [aba, setAba] = useState('perfil')

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      redirect('/', 'replace')
    }
    api.get('/usuarios/me')
      .then((res: any) => setUsuario(res.data))
      .catch(() => {
        localStorage.removeItem('token');
        redirect('/', 'replace');
      })
      .finally(() => setCarregando(false));
  }, []);

  const sair = () => {
    localStorage.removeItem('token');
    redirect('/', 'replace');
  };

  const handleClick = (aba: React.SetStateAction<string>) => {
    setAba(aba)
  }

  if (carregando) return <div>Carregando...</div>;

  return (
    <div style={{display: 'flex' }}>
      <BarraLateral usuario={usuario} aoSair={sair} />
      <main style={{ flex: 1, padding: '1rem' }}>
        <div className='flex flex-row justify-center gap-3 border-b-1 b-black pb-3 mb-3'>
          <div className='px-4 bg-white rounded-xl hover:shadow-sm hover:shadow-black cursor-pointer' onClick={() => handleClick('notificacoes')}>Notificações</div>
          <div className='px-4 bg-white rounded-xl hover:shadow-sm hover:shadow-black cursor-pointer' onClick={() => handleClick('perfil')}>Perfil de Usuario</div>
          <div className='px-4 bg-white rounded-xl hover:shadow-sm hover:shadow-black cursor-pointer' onClick={() => handleClick('senha')}>Alterar Senha</div>
          <div className='px-4 bg-white rounded-xl hover:shadow-sm hover:shadow-black cursor-pointer' onClick={() => handleClick('privacidade')}>Privacidade</div>
          <div className='px-4 bg-white rounded-xl hover:shadow-sm hover:shadow-black cursor-pointer' onClick={() => handleClick('biblioteca')}>Biblioteca</div>
        </div>
        <div id="pages">
          {aba == 'perfil' && (<div className='page' id='pagePerfil'><PerfilInfo usuario={usuario} setUsuario={setUsuario}/></div>)}
          {aba == 'senha' && (<div className='page' id='pageSenha'><AlterarSenha /></div>)}
          {aba == 'notificacoes' && (<div className='page' id='pageNotifica'><Notificacoes /></div>)}
          {aba == 'privacidade' && (<div className='page' id='pagePriva'><Privacidade /></div>)}
          {aba == 'biblioteca' && (<div className='page' id="pageBib"><BibliotecaPessoal /></div>)}
        </div>
      </main>
    </div>
  );
}
