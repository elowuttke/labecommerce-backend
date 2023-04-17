-- Active: 1681384210857@@127.0.0.1@3306

CREATE TABLE
    users (
        id INTEGER PRIMARY KEY UNIQUE NOT NULL,
        name VARCHAR (100) NOT NULL,
        email VARCHAR (100) UNIQUE NOT NULL,
        password VARCHAR (100) NOT NULL,
        created_at DEFAULT (DATETIME('now', 'localtime')) NOT NULL
    );

SELECT * FROM users;

DROP TABLE users;

CREATE TABLE
    products (
        id INTEGER PRIMARY KEY UNIQUE NOT NULL,
        name VARCHAR (100) NOT NULL,
        price REAL NOT NULL,
        description VARCHAR (10000) NOT NULL,
        image_url VARCHAR (100)
    );

SELECT * FROM products;

DROP TABLE products;

CREATE TABLE
    purchases(
        id INTEGER PRIMARY KEY UNIQUE NOT NULL,
        user_id INTEGER NOT NULL,
        total_price REAL,
        created_at DEFAULT (DATETIME('now', 'localtime')) NOT NULL,
        paid BOOLEAN NOT NULL DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES users(id) --ON DELETE CASCADE
    );

SELECT * FROM purchases;

DROP TABLE purchases;

CREATE TABLE
    purchases_products (
        purchase_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        subtotal REAL NOT NULL,
        FOREIGN KEY (purchase_id) REFERENCES purchases(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
    );

SELECT * FROM purchases_products;

DROP TABLE purchases_products;