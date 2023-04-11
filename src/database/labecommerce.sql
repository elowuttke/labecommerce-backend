-- Active: 1681240553493@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

SELECT * FROM users;

DROP TABLE users;

INSERT INTO users (id, email, password)
VALUES ("1001", "felipe@labenu.com", "123456"),
("1002", "fernanda@labenu.com", "234567"),
("1003", "fabio@labenu.com", "345678"),
("1004", "felicia@labenu.com", "456789"),
("1005", "fabiana@labenu.com", "567890");

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);

SELECT * FROM products;

DROP TABLE products;

INSERT INTO products (id, name, price, category)
VALUES ("2001", "Fivela", 30, "Acessórios"),
("2002", "Feldspato brincos", 20, "Acessórios"),
("2003", "Fatiota", 700, "Roupas e calçados"),
("2004", "Fitflop Tênis", 350, "Roupas e calçados"),
("2005", "Falexa", 240, "Eletrônicos");