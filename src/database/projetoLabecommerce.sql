-- Active: 1681384210857@@127.0.0.1@3306

CREATE TABLE
    users (
        id INTEGER PRIMARY KEY UNIQUE NOT NULL,
        name VARCHAR (100) NOT NULL,
        email VARCHAR (100) UNIQUE NOT NULL,
        password VARCHAR (100) NOT NULL,
        created_at DEFAULT (DATETIME('now', 'localtime')) NOT NULL
    );

-- INSERT INTO
--     users(id, name, email, password)
-- VALUES (
--         "1001",
--         "Felipe",
--         "felipe@labenu.com",
--         "123456"
--     ), (
--         "1002",
--         "Fernanda",
--         "fernanda@labenu.com",
--         "234567"
--     ), (
--         "1003",
--         "Fabio",
--         "fabio@labenu.com",
--         "345678"
--     ), (
--         "1004",
--         "Felicia",
--         "felicia@labenu.com",
--         "456789"
--     ), (
--         "1005",
--         "Fabiana",
--         "fabiana@labenu.com",
--         "567890"
--     );

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

-- INSERT INTO
--     products (
--         id,
--         name,
--         price,
--         description,
--         image_url
--     )
-- VALUES (
--         "2001",
--         "Fivela",
--         30,
--         "Fivela Giratória e Removível para Cinto Masculino.",
--         "https://http2.mlstatic.com/D_NQ_NP_777594-MLB46503702095_062021-O.webp"
--     ), (
--         "2002",
--         "Feldspato brincos",
--         20,
--         "Brincos em duas pedras naturais feldspato, com fino acabamento em material banhado a ouro.",
--         "https://img.elo7.com.br/product/zoom/2610B16/brincos-de-pedras-naturais-feldspato-bijuterias-finas.jpg"
--     ), (
--         "2003",
--         "Fatiota",
--         700,
--         "As peças xadrez e o uso de cores, são excelentes alternativas para quem quer expandir os modelos para trabahar a criatividade. Ternos quadriculados, elegância e estilo!",
--         "https://media-cache.woxo.tech/cache?file=woxo%2Finstagram%2F%40fatiota.industria%2Findex%2F585f611579063ece3d89289a87544d6ac7133d21%2Fcache%2Fimage%2F3065601601231774076.png"
--     ), (
--         "2004",
--         "Fitflop Tênis",
--         350,
--         "Tênis de cano baixo Uberknit F-sporty Sneaker, FITFLOP, feminino",
--         "https://m.media-amazon.com/images/I/71QEPZl-b2L._AC_SX395_.jpg"
--     ), (
--         "2005",
--         "Falexa",
--         240,
--         "Echo Dot 3ª Geração Smart Speaker com Alexa - Amazon
-- Com o objetivo de facilitar a vida das pessoas, a tecnologia sempre nos apresenta itens que tornam as mais variadas tarefas cada vez mais ao alcance de nossas vozes e dedos. E para facilitar e gerenciar suas tarefas dentro casa, a Amazon desenvolveu a Echo Dot de 3a Geração Smart Speaker com Alexa. É uma assistente virtual com comando por voz, capaz de gerenciar tarefas domésticas e otimizar processos dentro de sua casa. Ela ajuda a organizar seu dia, proporcionar momentos de descontração e conectar você aos seus amigos e familiares. Confira a previsão do tempo sempre que quiser, liste suas tarefas e sua agenda, ouça suas músicas favoritas ou estações de rádio. Ela possui Skills, que são como aplicativos que te ajudam a fazer ainda mais coisas com a Alexa, assim você pode controlar seus dispositivos compatíveis por voz. Você pode monitorar câmeras de segurança, controlar luzes, adicionar lembretes e ligar aparelhos. Ainda dá para realizar ligações com amigos e familiares que tenham o aplicativo Alexa ou um dispositivo Echo. Além de tudo isso, sempre que desejar privacidade é possível desligar o microfone do aparelho.",
--         "https://a-static.mlcdn.com.br/800x560/echo-dot-3a-geracao-smart-speaker-com-alexa-amazon/siviotti/f9ab4d74c39a11ed8d7d4201ac18502f/5e1124f9eb65a30f4e07944643371047.jpeg"
--     );

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

-- INSERT INTO
--     purchases (id, total_price, user_id)
-- VALUES ("3001", 720, "1001"), ("3002", 40, "1002"), ("3003", 150, "1004"), ("3004", 150, "1003"), ("3005", 590, "1003"), ("3006", 350, "1002");

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

-- INSERT INTO
--     purchases_products (
--         purchase_id,
--         product_id,
--         quantity
--     )
-- VALUES ("3001", "2004", 2), ("3001", "2002", 1), ("3002", "2002", 2), ("3003", "2001", 5), ("3004", "2001", 5), ("3005", "2004", 1), ("3005", "2005", 1), ("3006", "2004", 1);

SELECT * FROM purchases_products;

DROP TABLE purchases_products;