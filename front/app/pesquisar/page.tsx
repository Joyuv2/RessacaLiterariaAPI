'use client'

import { Playfair_Display } from "next/font/google"
import styles from "@/app/styles/Pesquisa.module.css"
import axios from "axios"
import Image from "next/image"
import { useState } from "react"
import { Livro } from "@/app/models/livro"
import Link from "next/link"

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
                <form onSubmit={handleSubmit} className="flex flex-row justify-center items-center w-[70vw] gap-6 bg-white h-1/2 p-2 rounded-full font-sans">
                    <input type="text" name="query" className="w-full focus:outline-0 text-black" placeholder="Insira o nome do livro" />
                    <button type="submit" className="text-2xl cursor-pointer">
                        <Image 
                            src={"/imagens/Lupa.png"} 
                            height={30} 
                            width={30}
                            alt=""
                            />
                    </button>
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