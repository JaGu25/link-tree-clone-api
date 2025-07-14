DROP DATABASE IF EXISTS linktree_db;
CREATE DATABASE linktree_db;
USE linktree_db;

CREATE TABLE rol (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol_id INT NOT NULL,
    FOREIGN KEY (rol_id) REFERENCES rol(id)
);

CREATE TABLE perfil (
    usuario_id INT PRIMARY KEY,
    biografia TEXT,
    avatar_url VARCHAR(255),
    color_fondo VARCHAR(20),
    color_texto VARCHAR(20),
    FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);

CREATE TABLE enlace (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    url VARCHAR(255) NOT NULL,
    icono VARCHAR(100),
    color VARCHAR(20),
    orden INT,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);

CREATE TABLE click (
    id INT AUTO_INCREMENT PRIMARY KEY,
    enlace_id INT,
    ip VARCHAR(50),
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (enlace_id) REFERENCES enlace(id)
);

CREATE TABLE tema (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(255),
    color_fondo VARCHAR(20),
    color_texto VARCHAR(20)
);

CREATE TABLE visita (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    ip VARCHAR(50),
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);

INSERT INTO rol (nombre) VALUES ('admin'), ('user');

INSERT INTO usuario (nombre, email, password, rol_id)
VALUES 
('Matías', 'matias@correo.com', '1234', 2);

INSERT INTO perfil (usuario_id, biografia, avatar_url, color_fondo, color_texto)
VALUES 
(1, '¡Bienvenido a mis enlaces!', 'https://i.imgur.com/avatar.png', '#ffffff', '#000000');

INSERT INTO enlace (usuario_id, titulo, url, icono, color, orden)
VALUES 
(1, 'GitHub', 'https://github.com/matias', 'github', '#333333', 1),
(1, 'Instagram', 'https://instagram.com/matias', 'instagram', '#E1306C', 2);

INSERT INTO click (enlace_id, ip)
VALUES 
(1, '192.168.0.101'),
(2, '192.168.0.102');

INSERT INTO tema (nombre, descripcion, color_fondo, color_texto)
VALUES 
('Oscuro', 'Tema con fondo oscuro', '#000000', '#ffffff'),
('Claro', 'Tema con fondo blanco', '#ffffff', '#000000');

INSERT INTO visita (usuario_id, ip)
VALUES 
(1, '192.168.0.110'),
(1, '192.168.0.111');

SELECT * FROM rol;

SELECT * FROM usuario;

SELECT * FROM perfil;

SELECT * FROM enlace;

SELECT * FROM click;

SELECT * FROM tema;

SELECT * FROM visita;
