"use client";

import { useState } from 'react';
import api from '@/app/servicos/api';
import styles from '@/app/styles/login.module.css';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await api.post('/login', {
        email,
        senha,
      });

      localStorage.setItem('token', res.data.access_token);
    } catch {
      setErro('E-mail ou senha inválidos');
    }
    if (localStorage.getItem('token')) {
      redirect('/dashboard', 'replace');
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

          <Link className='text-indigo-400 underline' href={"/auth/cadastro"}>Não está cadastrado? Clique aqui</Link>

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