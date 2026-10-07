'use client'

import { Playfair_Display } from "next/font/google"
import styles from "@/app/styles/Pesquisa.module.css"
import axios from "axios"
import Image from "next/image"
import { useState } from "react"
import { Livro } from "@/app/models/livro"
import Link from "next/link"
import { twMerge } from "tailwind-merge"

// function imageLoader({ src }: {src: string | number}) {
//     if (src != "/imagens/naoencontrado.png") {
//     return `https://covers.openlibrary.org/b/id/${src}-M.jpg`
//     } else {
//         return '/imagens/naoencontrado.png'
//     }
// }

const playfair = Playfair_Display({
    subsets: ['latin']
})

export default function Page() {
    const [estado, setEstado] = useState('nada')
    const [livros, setLivros] = useState([])
    const [query, setQuery] = useState('')

    const getImage = (livro: Livro) => {
        if (livro.cover_i) {
            return(`https://covers.openlibrary.org/b/id/${livro.cover_i}-L.jpg`)
        } else {
            return('/imagens/naoencontrado.png')
        }
    }
    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        try {
            setEstado('carregando')
            setLivros([])
            e.preventDefault()
            const dados = new FormData(e.currentTarget)
            const res = await axios.get(`https://openlibrary.org/search.json?q=${dados.get('query')}&lang=pt`)
            setLivros(res.data.docs)
        } catch(e) {
            console.log(e)
        }
        setEstado('concluido')
    }
    return (
        <div>
            <header className={`${styles.barra_de_pesquisa} flex justify-center h-[5rem] items-center `}>
                <form onSubmit={handleSubmit} className="flex flex-row justify-center items-center w-[70vw] gap-6 bg-background h-1/2 p-2 rounded-lg font-sans">
                    <button type="submit" className="text-2xl cursor-pointer text-foreground">
                        <svg className="text-foreground"
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            fill="currentColor"
                            viewBox="0 -960 960 960"
                        >
                        <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580t75.5-184.5T380-840t184.5 75.5T640-580q0 44-14 83t-38 69l252 252zM380-400q75 0 127.5-52.5T560-580t-52.5-127.5T380-760t-127.5 52.5T200-580t52.5 127.5T380-400"></path>
                    </svg>
                    </button>
                    <input type="text" name="query" value={query} onChange={(e) => setQuery(e.target.value)} className="w-full focus:outline-0 text-foreground" placeholder="Insira o nome do livro" />
                        <svg onClick={() => {setQuery('');setLivros([])}}
                            className="cursor-pointer text-foreground"
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            fill="currentColor"
                            viewBox="0 -960 960 960"
                        >
                            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224z"></path>
                        </svg>
                </form>
            </header>
            <main>
                <div className="flex flex-row flex-wrap gap-20 font-sans min-h-[90vh] max-h-91 min-w-[100vw] justify-center items-center pt-5 overflow-scroll">
                    {livros.length != 0 && livros.map((livro: Livro, index)=> (
                        <div key={livro.key} className={`h-[25rem] w-[22rem] flex flex-col text-foreground flex-grow-0 p-4 bg-background2 rounded text-lg ${playfair.className} overflow-scroll`}>
                            {livro.title.length <= 70 && <span className="font-bold h-[4rem] mb-3 border-b-1 border-black">{livro.title}</span>}
                            {livro.title.length > 70 && <span className="font-bold h-[4rem] mb-3 border-b-1 border-black">{livro.title.slice(0,60)}...</span>}
                            <Image className=" justify-self-center max-h-[10rem] bg-gray-200  rounded-xl min-h-[10rem]"
                                src={getImage(livro)}
                                alt="Não encontrado"
                                width={120}
                                height={250}
                            />
                            {!livro.author_name && <span className="font-bold mt-3 border-t-1 border-black">Autor: Não encontrado</span>}
                            {livro.author_name && livro.author_name.length > 1 &&   
                            <span className="font-bold mt-3 border-t-1 border-black">Autores: {livro.author_name.map((autor, index) => (
                                <span key={index}><span>{autor}</span> <br /></span>
                            ))}</span>
                            }
                            {livro.author_name && livro.author_name.length == 1 && <span className="font-bold mt-3 border-t-1 border-black">Autor: {livro.author_name}</span>}
                            <Link href={`/livro?key=${livro.key}`} className="mt-3 text-center bg-background3 p-2 rounded hover:bg-background4 transition-colors">Ver mais</Link>
                        </div>
                    ))}
                    {estado == 'carregando' && <span className="">Carregando...</span>}
                </div> 
            </main>
        </div>
    )
}