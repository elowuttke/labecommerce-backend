"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./database");
const types_1 = require("./types");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
app.get('/ping', (req, res) => {
    res.send('Pong');
});
app.get('/users', (req, res) => {
    res.status(200).send(database_1.users);
});
(0, database_1.createUser)("1006", "felix@labenu.com", "678901");
(0, database_1.createProduct)("2006", "Fita k7", 15, types_1.CATEGORY.ELETRONICS);
(0, database_1.getProductById)("2003");
//# sourceMappingURL=index.js.map