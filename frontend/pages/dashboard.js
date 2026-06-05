import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import BarraLateral from '../componentes/BarraLateral';
import PerfilInfo from '../componentes/PerfilInfo';
import AlterarSenha from '../componentes/AlterarSenha';
import Notificacoes from '../componentes/Notificacoes';
import Privacidade from '../componentes/Privacidade';
import api from '../servicos/api';

export default function Dashboard() {
  const router = useRouter();
  const { aba } = router.query;
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
      return;
    }
    api.get('/usuarios/me')
      .then(res => setUsuario(res.data))
      .catch(() => {
        localStorage.removeItem('token');
        router.push('/');
      })
      .finally(() => setCarregando(false));
  }, []);

  const sair = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  if (carregando) return <div>Carregando...</div>;

  const renderizar = () => {
    switch (aba) {
      case 'senha':
        return <AlterarSenha />;
      case 'notificacoes':
        return <Notificacoes />;
      case 'privacidade':
        return <Privacidade />;
      default:
        return <PerfilInfo usuario={usuario} setUsuario={setUsuario} />;
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <BarraLateral usuario={usuario} aoSair={sair} />
      <main style={{ flex: 1, padding: '1rem' }}>
        {renderizar()}
      </main>
    </div>
  );
}
