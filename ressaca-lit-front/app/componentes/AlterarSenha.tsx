import { useState } from 'react';
import api from '../servicos/api';
import "@/app/styles/usuario.css"

export default function AlterarSenha() {
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [msg, setMsg] = useState('');

  const enviar = async (e: React.SubmitEvent<HTMLFormElement>) => {
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
    } catch (err) {
      setMsg('Erro ao alterar senha');
    }
  };

  return (
    <div className="secao-usuario alterar-senha-wrapper">
      <h1>Alterar senha</h1>

      <form onSubmit={enviar} className="form-usuario">
        <input
          type="password"
          placeholder="Nova senha"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirmar nova senha"
          value={confirmar}
          onChange={(e) => setConfirmar(e.target.value)}
          required
        />

        <button className="btn-primario" type="submit">
          Alterar
        </button>

        {msg && <p className="mensagem-feedback">{msg}</p>}
      </form>
    </div>
  );
}