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
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES role(id)
);

CREATE TABLE profile (
    profile_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    bio TEXT,
    avatar_url VARCHAR(255),
    is_public BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id)
);


CREATE TABLE link (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    url VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    counter INT DEFAULT 0,
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


CREATE TABLE visit (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id)
);


CREATE TABLE click (
    id INT AUTO_INCREMENT PRIMARY KEY,
    link_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (link_id) REFERENCES link(id)
);



INSERT INTO role (name) VALUES ('admin'), ('user');


INSERT INTO user (name, email, password, role_id)
VALUES ('Matías Albites', 'matias@correo.com', '1234', 2);


INSERT INTO profile (user_id, bio, avatar_url, is_public)
VALUES (
    1,
    '¡Hola! Soy Matías y este es mi LinkTree personal.',
    'https://i.imgur.com/avatar.png',
    TRUE
);

INSERT INTO link (user_id, title, url, is_active)
VALUES 
(1, 'GitHub', 'https://github.com/matias', TRUE),
(1, 'YouTube', 'https://youtube.com/@matiasalbites', TRUE),
(1, 'Instagram', 'https://instagram.com/matiasalbites', TRUE);

INSERT INTO click (link_id) VALUES (1), (2);


INSERT INTO visit (user_id) VALUES (1), (1);

SELECT * FROM role;
SELECT * FROM user;
SELECT * FROM profile;
SELECT * FROM link;
SELECT * FROM click;
SELECT * FROM visit;


