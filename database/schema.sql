CREATE DATABASE IF NOT EXISTS biblioteca_social;
USE biblioteca_social;

CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo ENUM('administrador','cliente','participante do projeto') NOT NULL
);

CREATE TABLE livros (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(150) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    genero VARCHAR(50)
);

CREATE TABLE biblioteca (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT,
    livro_id INT,
    status_leitura VARCHAR(30) DEFAULT 'nao_iniciado',
    data_inicio DATE,
    data_prevista_termino DATE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (livro_id) REFERENCES livros(id) ON DELETE CASCADE,
    UNIQUE KEY (usuario_id, livro_id)
);

CREATE TABLE grupos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    criador_id INT,
    FOREIGN KEY (criador_id) REFERENCES usuarios(id) ON DELETE SET NULL
);

CREATE TABLE participantes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    grupo_id INT,
    usuario_id INT,
    FOREIGN KEY (grupo_id) REFERENCES grupos(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE mensagens (
    id INT PRIMARY KEY AUTO_INCREMENT,
    grupo_id INT,
    usuario_id INT,
    mensagem TEXT,
    FOREIGN KEY (grupo_id) REFERENCES grupos(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
);

CREATE TABLE denuncias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    denunciante_id INT,
    denunciado_id INT,
    motivo TEXT,
    FOREIGN KEY (denunciante_id) REFERENCES usuarios(id) ON DELETE SET NULL,
    FOREIGN KEY (denunciado_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE INDEX idx_biblioteca_usuario ON biblioteca(usuario_id);
CREATE INDEX idx_biblioteca_status ON biblioteca(status_leitura);