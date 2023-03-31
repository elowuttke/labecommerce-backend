// import express, { Request, Response } from 'express'
// import cors from 'cors'
import { users, products, purchases, createUser, createProduct, getProductById } from "./database"
import { CATEGORY } from "./types"

// const app = express()

// app.use(express.json())
// app.use(cors())

// app.listen(3003, () => {
//     console.log("Servidor rodando na porta 3003")
// })

// app.get("/ping", (req: Request, res: Response) => {
//     res.send("Pong!")
// })

createUser("1006", "felix@labenu.com", "678901")

createProduct("2006", "Fita k7", 15, CATEGORY.ELETRONICS)

getProductById("2003")

//console.log("rodou o arquivo index.ts")
//console.log(users)
//console.log(products)
//console.log(purchases)