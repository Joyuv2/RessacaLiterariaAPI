"use client";

import { redirect } from 'next/navigation';
import { Usuario } from "@/app/models/usuario"
import "@/app/styles/usuario.css"

export default function BarraLateral({usuario, aoSair}: {usuario: Usuario|null, aoSair: () => void}) {
  if (usuario==null){
    usuario = {nome: "Convidado", email: "convidado@gmail.com", senha: "exemplo", id: "0", tipo: "exemplo"}
  } 
  return (
    <aside>
      <h3 className='select-none'>Meu perfil</h3>

      <div>
        <strong>{usuario?.nome}</strong>
        <br />
        {usuario?.email}
      </div>

      <button className='shadow-sm shadow-black' onClick={aoSair}>Sair da Conta</button>
    </aside>
  );
}