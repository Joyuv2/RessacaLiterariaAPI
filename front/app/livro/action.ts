"use server"

import axios from "axios"

interface Livro {
    title: string,
    description: {type: string, value: string},
    authors: {author: {key:string}, type: {key:string}}[]
}

export async function getBook(key: string) {
    try {
        const book: Livro = await axios.get(`https://openlibrary.org${key}.json`).then(res => res.data)
        console.log(book)
        if (book) {
            return {result: "Success", book: book}
        } else {
            return {error: "erro, livro não encontrado"}
        }
    } catch(e) {
        return {error: String(e)}
    }
    
}