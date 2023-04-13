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

SELECT * FROM users ORDER BY email ASC;

-- Get All Products versão 1

-- retorna o resultado ordenado pela coluna price em ordem crescente

-- limite o resultado em 20 iniciando pelo primeiro item

SELECT * FROM products ORDER BY price ASC LIMIT 20 OFFSET 0;

-- Get All Products versão 2

-- seleção de um intervalo de preços, por exemplo entre 100.00 e 300.00

-- retorna os produtos com preços dentro do intervalo definido em ordem crescente

SELECT *
FROM products
WHERE price BETWEEN 100 AND 300
ORDER BY price ASC;

-- Criação da tabela de pedidos

-- nome da tabela: purchases

-- colunas da tabela:

-- id (TEXT, PK, único e obrigatório)

-- total_price (REAL e obrigatório)

-- paid (INTEGER e obrigatório)

-- created_at (TEXT e opcional)

-- buyer_id (TEXT, obrigatório e FK = referencia a coluna id da tabela users)

CREATE TABLE
    purchases(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        total_price REAL NOT NULL,
        paid INTEGER NOT NULL,
        --0 para false (não pago), e 1 para true (pago)
        created_at TEXT,
        buyer_id TEXT NOT NULL,
        FOREIGN KEY (buyer_id) REFERENCES users(id)
    );

-- Crie dois pedidos para cada usuário cadastrado

-- No mínimo 4 no total (ou seja, pelo menos 2 usuários diferentes) e devem iniciar com a data de entrega nula.

INSERT INTO
    purchases (id, total_price, paid, buyer_id)
VALUES ("3001", 720, 0, "1001"), ("3002", 40, 0, "1002"), ("3003", 150, 0, "1004"), ("3004", 150, 0, "1003"), ("3005", 590, 0, "1003"), ("3006", 350, 0, "1002");

SELECT * FROM purchases;

DROP TABLE purchases;

-- b) Edite o status da data de entrega de um pedido

-- Simule que o pedido foi entregue no exato momento da sua edição (ou seja, data atual).

UPDATE purchases SET created_at = DATETIME('now') WHERE id = "3001";

-- Crie a query de consulta utilizando junção para simular um endpoint de histórico de compras de um determinado usuário.

-- Mocke um valor para a id do comprador, ela deve ser uma das que foram utilizadas no exercício 2.

SELECT
    purchases.id AS purchaseId,
    total_price,
    paid,
    buyer_id AS buyerId,
    users.email
FROM purchases
    INNER JOIN users ON users.id = purchases.buyer_id;

-- Criação da tabela de relações

-- nome da tabela: purchases_products

-- colunas da tabela:

-- purchase_id (TEXT e obrigatório, não deve ser único)

-- product_id (TEXT e obrigatório, não deve ser único)

-- quantity (INTEGER e obrigatório, não deve ser único)

CREATE TABLE
    purchases_products (
        purchase_id TEXT NOT NULL,
        product_id TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        FOREIGN KEY (purchase_id) REFERENCES purchases(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
    );

-- Inserção dos dados

-- Popule sua tabela purchases_products simulando 3 compras de clientes.

INSERT INTO
    purchases_products (
        purchase_id,
        product_id,
        quantity
    )
VALUES ("3001", "2004", 2), ("3001", "2002", 1), ("3002", "2002", 2), ("3003", "2001", 5), ("3004", "2001", 5), ("3005", "2004", 1), ("3005", "2005", 1), ("3006", "2004", 1);

-- Consulta com junção INNER JOIN

-- Mostre em uma query todas as colunas das tabelas relacionadas (purchases_products, purchases e products).

SELECT * FROM purchases_products ;

SELECT
    purchases_products.purchase_id AS purchaseId,
    purchases_products.product_id AS productId,
    products.name,
    products.price,
    purchases_products.quantity,
    purchases.total_price,
    purchases.buyer_id AS buyerId
FROM purchases_products
    INNER JOIN products ON products.id = productId
    INNER JOIN purchases ON purchases.id = purchaseId;