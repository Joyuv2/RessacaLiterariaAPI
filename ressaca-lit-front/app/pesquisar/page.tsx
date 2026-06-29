import styles from "@/app/styles/Pesquisa.module.css"
import axios from "axios"
import Image from "next/image"

export default function Page() {
    // const handleSubmit = async () => {
    //     try {
    //         const res = axios.get(q)
    //     }
    // }
    return (
        <div>
            <header className={`${styles.barra_de_pesquisa} flex justify-center h-[5rem] items-center`}>
                <form action="get" className="flex flex-row justify-center items-center w-[70vw] gap-6 bg-white h-1/2 p-2 rounded-full">
                    <input type="text" className="w-full focus:outline-0" placeholder="Insira o nome do livro" />
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

            </main>
        </div>
    )
}