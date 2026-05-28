CREATE DATABASE biblioteca_ressaca;
USE biblioteca_social;

-- Usuários
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(100) NOT NULL
);

-- Livros
CREATE TABLE livros (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(150) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    genero VARCHAR(50)
);

-- Biblioteca
CREATE TABLE biblioteca (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT,
    livro_id INT,
    status_leitura VARCHAR(30),
    data_inicio DATE,
    data_prevista_termino DATE,

    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (livro_id) REFERENCES livros(id)
);

--Grupo de leitura
CREATE TABLE grupos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    criador_id INT,

    FOREIGN KEY (criador_id) REFERENCES usuarios(id)
);

--Participantes do grupo
CREATE TABLE participantes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    grupo_id INT,
    usuario_id INT,

    FOREIGN KEY (grupo_id) REFERENCES grupos(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

--Mensagens do grupo
CREATE TABLE mensagens (
    id INT PRIMARY KEY AUTO_INCREMENT,
    grupo_id INT,
    usuario_id INT,
    mensagem TEXT,

    FOREIGN KEY (grupo_id) REFERENCES grupos(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Denúncias
CREATE TABLE denuncias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    denunciante_id INT,
    denunciado_id INT,
    motivo TEXT,

    FOREIGN KEY (denunciante_id) REFERENCES usuarios(id),
    FOREIGN KEY (denunciado_id) REFERENCES usuarios(id)
);


-- Funções

* `usuarios` → cadastro e login
* `livros` → livros do sistema
* `biblioteca` → livros salvos pelo usuário
* `grupos` → grupos de leitura
* `participantes` → membros dos grupos
* `mensagens` → chat dos grupos
* `denuncias` → denúncias de usuários
