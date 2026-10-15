"use client"

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { getBook } from "./action";
import { useNav } from "../componentes/NavContext";

interface Livro {
    title: string,
    description?: {type: string, value: string},
    authors: {author: {key:string}, type: {key:string}}[]
}

function formatDescription(rawDescription?: string) {
    if (!rawDescription) return null;

    const cleaned = rawDescription
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<[^>]+>/g, " ")
        .replace(/\\\[/g, "[")
        .replace(/\\\]/g, "]")
        .replace(/\r/g, "")
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/^#{1,6}\s*/gm, "")
        .replace(/^---+\s*$/gm, "")
        .trim();

    if (!cleaned) return null;

    const sections = cleaned
        .split(/\n\s*\n+/)
        .map((section) => section.trim())
        .filter(Boolean);

    return sections.flatMap((section, index) => {
        const listMatches = [...section.matchAll(/^- \[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g)];

        if (listMatches.length > 0) {
            const heading = section
                .replace(/^- \[[^\]]+\]\([^\)]+\)\s*/g, "")
                .replace(/^contains\s*:?/i, "")
                .trim();

            return [
                ...(heading ? [
                    <p key={`heading-${index}`} className="text-base font-semibold uppercase tracking-wide text-left">
                        {heading}
                    </p>
                ] : []),
                <ul key={`list-${index}`} className="list-disc pl-6 space-y-2 text-left text-base leading-7">
                    {listMatches.map(([, label, url], itemIndex) => (
                        <li key={`${index}-${itemIndex}`}>
                            <a href={url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline break-all">
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>
            ];
        }

        const paragraphLines = section
            .split(/\n+/)
            .map((line) => line.trim())
            .filter(Boolean)
            .filter((line) => !/^contains$/i.test(line));

        if (paragraphLines.length === 0) return [];

        return paragraphLines.map((paragraph, paragraphIndex) => (
            <p key={`${index}-${paragraphIndex}`} className="text-base leading-7 text-justify whitespace-pre-line">
                {paragraph}
            </p>
        ));
    });
}

function LivroPageContent() {
    const { setLinks } = useNav();
    const [book, setBook] = useState<Livro>()
    const [error, setError] = useState<string>()
    const params = useSearchParams()
    const key = params.get("key")

    useEffect(() => {
        setLinks([
            { label: 'Livros', href: '/pesquisar' },
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
        <div className="flex flex-1 flex-col items-center justify-center min-h-[calc(100vh-120px)] py-8 px-4">
            {book && 
                <div className="flex flex-col items-center w-full max-w-5xl p-8 bg-background2 rounded-lg shadow-sm overflow-hidden">
                    <h1 className="text-3xl font-bold mb-6 text-center">Título: {book.title}</h1>
                    {book.description && (
                        <div className="w-full max-w-4xl space-y-4">
                            {formatDescription(book.description.value)}
                        </div>
                    )}
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

export default function Page() {
    return (
        <Suspense fallback={<div className="flex justify-center items-center h-screen">Carregando...</div>}>
            <LivroPageContent />
        </Suspense>
    );
}