ALTER USER 'root'@'localhost' 
IDENTIFIED 
with 
mysql_native_password 
BY '@ITB123456';

CREATE DATABASE melodika; 
USE melodika;

CREATE TABLE usuario (
  id_usuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  senha_do_usuario VARCHAR(100) NOT NULL,
  data_de_nascimento DATE,
  email VARCHAR(50) NOT NULL UNIQUE,
  nome_do_perfil VARCHAR(100),
  apelido_do_usuario VARCHAR(20),
  genero VARCHAR(100),
  cpf_do_usuario VARCHAR(20),
  telefone_do_usuario VARCHAR(20),
  img_perfil_paste VARCHAR(100),
  tipo INT NOT NULL DEFAULT '1'
);

CREATE TABLE vendedor (
  id_do_vendedor INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nome_do_vendedor VARCHAR(100),
  email_do_vendedor VARCHAR(50) NOT NULL UNIQUE,
  cpf_do_vendedor VARCHAR(20),
  senha_do_vendedor VARCHAR(100) NOT NULL,
  telefone_do_vendedor VARCHAR(20)
);

CREATE TABLE mensagem (
  id_mensagem INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  mensagem VARCHAR(100),
  id_usuario INT,
  id_vendedor INT,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
  FOREIGN KEY (id_vendedor) REFERENCES vendedor(id_do_vendedor)
);

CREATE TABLE curso (
  nome_do_curso VARCHAR(100),
  id_do_curso INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  avaliacao VARCHAR(100),
  preco VARCHAR(100),
  data_do_curso DATE,
  id_vendedor INT,
  FOREIGN KEY (id_vendedor) REFERENCES vendedor(id_do_vendedor)
);

CREATE TABLE usuario_faz_curso (
  id_usuario_faz_curso INT PRIMARY KEY,
  id_do_curso INT,
  id_usuario INT,
  FOREIGN KEY (id_do_curso) REFERENCES curso(id_do_curso),
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE pagamento (
  id_do_pagamento INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_do_tipo VARCHAR(100),
  descricao_do_pagamento VARCHAR(100),
  id_vendedor INT,
  FOREIGN KEY (id_vendedor) REFERENCES vendedor(id_do_vendedor)
);

CREATE TABLE comentario (
  id_do_comentario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  avaliacao VARCHAR(100),
  data_do_comentario DATE,
  id_usuario INT,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

SELECT * FROM usuario

update usuario set tipo = '1' where id_usuario = '1'

DROP database melodika

