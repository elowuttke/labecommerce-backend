import express, { Request, Response } from 'express'
import cors from 'cors'
import { users, products, purchases, createUser, createProduct, getProductById } from "./database"
import { CATEGORY, TProduct, TPurchase, TUser } from "./types"

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
});

// PING
app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

createUser("1006", "felix@labenu.com", "678901")

createProduct("2006", "Fita k7", 15, CATEGORY.ELETRONICS)

getProductById("2003")

// GET ALL USERS
app.get('/users', (req: Request, res: Response) => {
    res.status(200).send(users)
})

// GET ALL PRODUCTS
app.get('/products', (req: Request, res: Response) => {
    res.status(200).send(products)
})

// GET PRODUCT BY NAME
app.get('/product/search', (req: Request, res: Response) => {
    const q = req.query.q as string
    const result = products.filter((product) => {
        return product.name.toLowerCase().includes(q.toLowerCase())
    })
    res.status(200).send(result)
})

// POST NEW USER
app.post('/users', (req: Request, res: Response) => {
    const id = req.body.id
    const email = req.body.email
    const password = req.body.password

    const newUser: TUser = { id, email, password }
    users.push(newUser)
    //console.log(users)

    res.status(201).send('Cadastro realizado com sucesso')
})

// POST NEW PRODUCT
app.post('/products', (req: Request, res: Response) => {
    const id = req.body.id
    const name = req.body.name
    const price = req.body.price
    const category = req.body.category

    const newProduct: TProduct = { id, name, price, category }
    products.push(newProduct)
    //console.log(products)

    res.status(201).send('Produto cadastrado com sucesso')
})

// POST NEW PURCHASE
app.post('/purchases', (req: Request, res: Response) => {
    const userId = req.body.userId
    const productId = req.body.productId
    const quantity = req.body.quantity
    const totalPrice = req.body.totalPrice

    const newPurchase: TPurchase = { userId, productId, quantity, totalPrice }
    purchases.push(newPurchase)
    console.log(purchases)

    res.status(201).send('Compra realizada com sucesso')
})