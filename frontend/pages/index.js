import { useState } from 'react';
import { useRouter } from 'next/router';
import api from '../servicos/api';
import styles from '../styles/login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post('/login', {
        email,
        senha,
      });

      localStorage.setItem('token', res.data.access_token);
      router.push('/dashboard?aba=perfil');
    } catch {
      setErro('E-mail ou senha inválidos');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img
          src="/imagens/logo_sem_fundo.png"
          alt="Ressaca Literária"
          className={styles.logo}
        />

        <h1 className={styles.titulo}>
          Ressaca Literária
        </h1>

        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <input
            className={styles.input}
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className={styles.input}
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <button
            className={styles.botao}
            type="submit"
          >
            Entrar
          </button>

          {erro && (
            <p className={styles.erro}>
              {erro}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}