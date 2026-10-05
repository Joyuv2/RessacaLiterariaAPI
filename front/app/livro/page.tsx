"use client"

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getBook } from "./action";
import { useNav } from "../componentes/NavContext";

interface Livro {
    title: string,
    description: {type: string, value: string},
    authors: {author: {key:string}, type: {key:string}}[]
}

export default function Page() {
    const { setLinks } = useNav();
    const [book, setBook] = useState<Livro>()
    const [error, setError] = useState<string>()
    const params = useSearchParams()
    const key = params.get("key")

    useEffect(() => {
        setLinks([
            { label: 'Livros', href: '/livros' },
            { label: 'Entrar', href: '/login' },
        ]);
    }, [setLinks]);

    useEffect(() => {
        getBook(key!).then((v) => {
            if (!v.error) {
                setBook(v.book)
            } else {
                setError(v.error)
            }
        })
        
    }, [key])

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            {book && 
                <div className="flex flex-col items-center w-95/100 p-10 bg-background2 h-90/100">
                    <h1 className="text-3xl font-bold">Título: {book.title}</h1>
                    <h2 className="text-xl">{book.description.value}</h2>
                </div>
            }
            {error && 
                <div>
                    <h1>{error}</h1>
                </div>
            }
        </div>
    )
}