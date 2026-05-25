async function buscarLivro() {

    const apiKey = "AIzaSyC0RcdObOI1GrHwBSpg_iXbB_BSE9B6wM0";

    const resposta = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=harry+potter&key=${apiKey}`
    );

    const dados = await resposta.json();

    dados.items.forEach(livro => {

        console.log("Título:", livro.volumeInfo.title);

        console.log("Autor:", livro.volumeInfo.authors);

        console.log("Ano:", livro.volumeInfo.publishedDate);

        console.log("------------------------");

    });

}

buscarLivro();
