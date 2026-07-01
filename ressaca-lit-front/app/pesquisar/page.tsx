'use client'

import styles from "@/app/styles/Pesquisa.module.css"
import axios from "axios"
import Image from "next/image"
import { useState } from "react"
import { Livro } from "@/app/models/livro"
import { StaticImport } from "next/dist/shared/lib/get-img-props"

// function imageLoader({ src }: {src: string | number}) {
//     if (src != "/imagens/naoencontrado.png") {
//     return `https://covers.openlibrary.org/b/id/${src}-M.jpg`
//     } else {
//         return '/imagens/naoencontrado.png'
//     }
// }

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
            const res = await axios.get(`https://openlibrary.org/search.json?q=${dados.get('query')}`)
            setLivros(res.data.docs)
        } catch(e) {
            console.log(e)
        }
        setEstado('concluido')
    }
    return (
        <div>
            <header className={`${styles.barra_de_pesquisa} flex justify-center h-[5rem] items-center sticky`}>
                <form onSubmit={handleSubmit} className="flex flex-row justify-center items-center w-[70vw] gap-6 bg-white h-1/2 p-2 rounded-full font-sans">
                    <input type="text" name="query" className="w-full focus:outline-0" placeholder="Insira o nome do livro" />
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
                <div className="flex flex-row flex-wrap gap-20 font-sans min-h-[100vh] min-w-[100vw] justify-center items-center pt-5">
                    {livros.length != 0 && livros.map((livro: any, index)=> (
                        <div key={livro.key} className="h-[35rem] w-[28rem] flex flex-col flex-grow-0 p-4 bg-gray-100 rounded-xl">
                            <span className="font-bold h-[3rem]">{livro.title}</span>
                            <Image className="self-center justify-self-center max-h-[25rem] bg-gray-200 p-2 rounded-xl min-h-[25rem]"
                                src={getImage(livro)}
                                alt="Não encontrado"
                                width={400}
                                height={250}
                            />
                        </div>
                    ))}
                    {estado == 'carregando' && <span className="">Carregando...</span>}
                </div> 
            </main>
        </div>
    )
}