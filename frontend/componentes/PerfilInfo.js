import { useState } from 'react';
import api from '../servicos/api';

export default function PerfilInfo({ usuario, setUsuario }) {
  const [editando, setEditando] = useState(false);
  const [nome, setNome] = useState(usuario.nome);
  const [email, setEmail] = useState(usuario.email);
  const [novaSenha, setNovaSenha] = useState('');

  const salvar = async () => {
    const dados = { nome, email };
    if (novaSenha) dados.senha = novaSenha;
    try {
      const res = await api.put('/usuarios/me', dados);
      setUsuario(res.data);
      setEditando(false);
      setNovaSenha('');
      alert('Perfil atualizado');
    } catch {
      alert('Erro ao atualizar perfil');
    }
  };

  return (
    <div>
      <h1>Minhas Informações</h1>
      {!editando ? (
        <div>
          <p><strong>Nome:</strong> {usuario.nome}</p>
          <p><strong>E-mail:</strong> {usuario.email}</p>
          <button onClick={() => setEditando(true)}>Editar</button>
        </div>
      ) : (
        <div>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" />
          <input type="password" value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)} placeholder="Nova senha (opcional)" />
          <button onClick={salvar}>Salvar</button>
          <button onClick={() => setEditando(false)}>Cancelar</button>
        </div>
      )}
    </div>
  );
}
