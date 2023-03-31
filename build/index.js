"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const types_1 = require("./types");
(0, database_1.createUser)("1006", "felix@labenu.com", "678901");
(0, database_1.createProduct)("2006", "Fita k7", 15, types_1.CATEGORY.ELETRONICS);
(0, database_1.getProductById)("2003");
//# sourceMappingURL=index.js.map