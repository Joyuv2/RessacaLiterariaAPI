import { useState } from 'react';
import api from '../servicos/api';

export default function AlterarSenha() {
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [msg, setMsg] = useState('');

  const enviar = async (e) => {
    e.preventDefault();
    if (novaSenha !== confirmar) {
      setMsg('As senhas não coincidem');
      return;
    }
    try {
      await api.put('/usuarios/me', { senha: novaSenha });
      setMsg('Senha alterada com sucesso!');
      setNovaSenha('');
      setConfirmar('');
    } catch {
      setMsg('Erro ao alterar senha');
    }
  };

  return (
    <div>
      <h1>Alterar senha</h1>
      <form onSubmit={enviar}>
        <input type="password" placeholder="Nova senha" value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)} required />
        <input type="password" placeholder="Confirmar nova senha" value={confirmar} onChange={(e) => setConfirmar(e.target.value)} required />
        <button type="submit">Alterar</button>
        {msg && <p>{msg}</p>}
      </form>
    </div>
  );
}
