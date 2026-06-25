"use client";

import { useState } from 'react';
import api from '@/app/servicos/api';
import styles from '@/app/styles/login.module.css';
import { redirect } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await api.post('/cadastrar', {
        email,
        senha,
        nome,
      });

      localStorage.setItem('token', res.data.access_token);
    } catch {
      setErro('Erro ao cadastrar, tente novamente');
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
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />


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
            Cadastrar
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