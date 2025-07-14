DROP DATABASE IF EXISTS linktree_db;
CREATE DATABASE linktree_db;
USE linktree_db;

CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES role(id)
);

CREATE TABLE profile (
    user_id INT PRIMARY KEY,
    bio TEXT,
    avatar_url VARCHAR(255),
    background_color VARCHAR(20),
    text_color VARCHAR(20),
    FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE link (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    url VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE theme (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    background_color VARCHAR(20),
    text_color VARCHAR(20)
);


INSERT INTO role (name) VALUES ('admin'), ('user');

INSERT INTO user (name, email, password, role_id)
VALUES 
('Matías', 'matias@correo.com', '1234', 2);

INSERT INTO profile (user_id, bio, avatar_url, background_color, text_color)
VALUES 
(1, '¡Bienvenido a mis enlaces!', 'https://i.imgur.com/avatar.png', '#ffffff', '#000000');

INSERT INTO link (user_id, title, url, is_active)
VALUES 
(1, 'YouTube', 'https://youtube.com/@matiasalbites', TRUE);


INSERT INTO theme (name, description, background_color, text_color)
VALUES 
('Oscuro', 'Tema con fondo oscuro', '#000000', '#ffffff'),
('Claro', 'Tema con fondo blanco', '#ffffff', '#000000');



SELECT * FROM role;
SELECT * FROM user;
SELECT * FROM profile;
SELECT * FROM link;
SELECT * FROM theme;

