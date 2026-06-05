import { useState } from 'react';
import { useRouter } from 'next/router';
import api from '../servicos/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/login', { email, senha });
      localStorage.setItem('token', res.data.access_token);
      router.push('/dashboard?aba=perfil');
    } catch {
      setErro('E-mail ou senha inválidos');
    }
  };

  return (
    <div>
      <h1>Ressaca Literária</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        <button type="submit">Entrar</button>
        {erro && <p>{erro}</p>}
      </form>
    </div>
  );
}