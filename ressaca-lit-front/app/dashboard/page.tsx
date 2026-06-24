"use client";

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import BarraLateral from '@/app/componentes/BarraLateral';
import PerfilInfo from '@/app/componentes/PerfilInfo';
import AlterarSenha from '@/app/componentes/AlterarSenha';
import Notificacoes from '@/app/componentes/Notificacoes';
import Privacidade from '@/app/componentes/Privacidade';
import api from '@/app/servicos/api';

export default function Dashboard() {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [aba, setAba] = useState('perfil')

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      redirect('/')
    }
    api.get('/usuarios/me')
      .then((res: any) => setUsuario(res.data))
      .catch(() => {
        localStorage.removeItem('token');
        redirect('/');
      })
      .finally(() => setCarregando(false));
  }, []);

  const sair = () => {
    localStorage.removeItem('token');
    redirect('/');
  };

  const handleClick = (aba: React.SetStateAction<string>) => {
    setAba(aba)
  }

  if (carregando) return <div>Carregando...</div>;

  return (
    <div style={{display: 'flex' }}>
      <BarraLateral usuario={usuario} aoSair={sair} />
      <main style={{ flex: 1, padding: '1rem' }}>
        <div className='flex flex-row gap-4 cursor-pointer'>
          <div onClick={() => handleClick('notificacoes')}>Notificações</div>
          <div onClick={() => handleClick('perfil')}>Perfil de Usuario</div>
          <div onClick={() => handleClick('senha')}>Alterar Senha</div>
          <div onClick={() => handleClick('privacidade')}>Privacidade</div>
        </div>
        <div id="pages">
          {aba == 'perfil' && (<div className='page' id='pagePerfil'><PerfilInfo usuario={usuario} setUsuario={setUsuario}/></div>)}
          {aba == 'senha' && (<div className='page' id='pageSenha'><AlterarSenha /></div>)}
          {aba == 'notificacoes' && (<div className='page' id='pageNotifica'><Notificacoes /></div>)}
          {aba == 'privacidade' && (<div className='page' id='pagePriva'><Privacidade /></div>)}
        </div>
      </main>
    </div>
  );
}
