-- Active: 1681240553493@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    );

INSERT INTO
    users (id, email, password)
VALUES (
        "1001",
        "felipe@labenu.com",
        "123456"
    ), (
        "1002",
        "fernanda@labenu.com",
        "234567"
    ), (
        "1003",
        "fabio@labenu.com",
        "345678"
    ), (
        "1004",
        "felicia@labenu.com",
        "456789"
    ), (
        "1005",
        "fabiana@labenu.com",
        "567890"
    );

SELECT * FROM users;

DROP TABLE users;

CREATE TABLE
    products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        category TEXT NOT NULL
    );

INSERT INTO
    products (id, name, price, category)
VALUES (
        "2001",
        "Fivela",
        30,
        "Acessórios"
    ), (
        "2002",
        "Feldspato brincos",
        20,
        "Acessórios"
    ), (
        "2003",
        "Fatiota",
        700,
        "Roupas e calçados"
    ), (
        "2004",
        "Fitflop Tênis",
        350,
        "Roupas e calçados"
    ), (
        "2005",
        "Falexa",
        240,
        "Eletrônicos"
    );

SELECT * FROM products;

DROP TABLE products;

-- Search Product by name

-- crie um termo de busca, por exemplo "monitor"

-- retorna o resultado baseado no termo de busca

SELECT * FROM products WHERE name LIKE "%alexa%";

-- Create User

-- crie um novo usuário

-- insere o item mockado na tabela users

INSERT INTO
    users (id, email, password)
VALUES (
        "1006",
        "fagner@labenu.com",
        "678901"
    );

SELECT * FROM users;

-- Create Product

-- crie um novo produto

-- insere o item mockado na tabela products

INSERT INTO
    products (id, name, price, category)
VALUES (
        "2006",
        "Faucet com led",
        460,
        "Eletrônicos"
    );

SELECT * FROM products;

-- Get Products by id

-- busca de produtos por id

SELECT * FROM products WHERE id = "2004";

-- Delete User by id

-- deleção de user por id

DELETE FROM users WHERE id = "1003";

-- Delete Product by id

-- deleção de produto por id

DELETE FROM products WHERE id = "2004";

-- Edit User by id

-- edição de user por id

UPDATE users
SET
    email = "filipinho@labenu.com",
    password = "654321"
WHERE id = "1001";

-- Edit Product by id

-- edição de produto por id

UPDATE products
SET
    name = "Feldspato pingente",
    price = 25
WHERE id = "2002";

-- Get All Users
-- retorna o resultado ordenado pela coluna email em ordem crescente
SELECT * FROM users
ORDER BY email ASC;

-- Get All Products versão 1
-- retorna o resultado ordenado pela coluna price em ordem crescente
-- limite o resultado em 20 iniciando pelo primeiro item
SELECT * FROM products
ORDER BY price ASC
LIMIT 20
OFFSET 0;


-- Get All Products versão 2
-- seleção de um intervalo de preços, por exemplo entre 100.00 e 300.00
-- retorna os produtos com preços dentro do intervalo definido em ordem crescente
SELECT * FROM products
WHERE price BETWEEN 100 AND 300
ORDER BY price ASC;
