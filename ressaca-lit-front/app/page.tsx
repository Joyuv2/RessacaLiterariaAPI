"use client";

import { useState } from 'react';
import api from '@/app/servicos/api';
import styles from '@/app/styles/login.module.css';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Image from 'next/image';

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
      <div className={`${styles.card} flex flex-row justify-around`}>
        <div className='flex flex-col'>
          <Image
            src="/imagens/logo_sem_fundo.png"
            alt="Ressaca Literária"
            className={`${styles.logo} select-none`}
            width={250}
            height={250}
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

          <Link className='text-gray-300 underline' href={"/auth/cadastro"}>Não está cadastrado? Clique aqui</Link>

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