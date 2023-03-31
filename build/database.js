"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchases = exports.getProductById = exports.createProduct = exports.getAllProducts = exports.products = exports.createUser = exports.users = void 0;
const types_1 = require("./types");
exports.users = [
    {
        id: "1001",
        email: "felipe@labenu.com",
        password: "123456",
    },
    {
        id: "1002",
        email: "fernanda@labenu.com",
        password: "234567",
    },
    {
        id: "1003",
        email: "fabio@labenu.com",
        password: "345678",
    },
    {
        id: "1004",
        email: "felicia@labenu.com",
        password: "456789",
    },
    {
        id: "1005",
        email: "fabiana@labenu.com",
        password: "567890",
    }
];
const getAllUsers = () => console.log(exports.users);
const createUser = (id, email, password) => {
    const newUser = {
        id,
        email,
        password
    };
    console.log("Cadastro realizado com sucesso");
    exports.users.push(newUser);
    getAllUsers();
};
exports.createUser = createUser;
exports.products = [
    {
        id: "2001",
        name: "Fivela",
        price: 30,
        category: types_1.CATEGORY.ACCESSORIES
    },
    {
        id: "2002",
        name: "Feldspato brincos",
        price: 20,
        category: types_1.CATEGORY.ACCESSORIES
    },
    {
        id: "2003",
        name: "Fatiota",
        price: 700,
        category: types_1.CATEGORY.CLOTHES_AND_SHOES
    },
    {
        id: "2004",
        name: "Fitflop Tênis",
        price: 350,
        category: types_1.CATEGORY.CLOTHES_AND_SHOES
    },
    {
        id: "2005",
        name: "Falexa",
        price: 240,
        category: types_1.CATEGORY.ELETRONICS
    },
];
const getAllProducts = () => console.log(exports.products);
exports.getAllProducts = getAllProducts;
const createProduct = (id, name, price, category) => {
    const newProduct = {
        id,
        name,
        price,
        category
    };
    console.log("Produto criado com sucesso");
    exports.products.push(newProduct);
    (0, exports.getAllProducts)();
};
exports.createProduct = createProduct;
const getProductById = (idToSearch) => {
    const result = exports.products.find((product) => product.id === idToSearch);
    if (!result) {
        console.log("undefined");
    }
    else {
        console.log(result);
    }
};
exports.getProductById = getProductById;
exports.purchases = [
    {
        userId: "1001",
        productId: "2005",
        quantity: 3,
        totalPrice: 720
    },
    {
        userId: "1002",
        productId: "2002",
        quantity: 2,
        totalPrice: 40
    },
    {
        userId: "1004",
        productId: "2001",
        quantity: 5,
        totalPrice: 150
    },
];
//# sourceMappingURL=database.js.map