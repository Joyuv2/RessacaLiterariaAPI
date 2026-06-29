"use client";

import { useState } from 'react';
import api from '@/app/servicos/api';
import styles from '@/app/styles/login.module.css';
import { redirect } from 'next/navigation';
import Image from 'next/image';

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
      <div className={`${styles.card} flex flex-row justify-around`}>
        <div>
          <Image
            src="/imagens/logo_sem_fundo.png"
            alt="Ressaca Literária"
            className={`${styles.logo} select-none`}
            width={250}
            height={250}
            loading='eager'
          />

          <h1 className={`${styles.titulo} select-none`}>
            Ressaca Literária
          </h1>
        </div>

        <form
          className={`${styles.form} flex flex-col justify-center align-center`}
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