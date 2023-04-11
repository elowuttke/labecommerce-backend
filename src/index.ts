import express, { Request, Response } from 'express'
import cors from 'cors'
import { users, products, purchases } from "./database"
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

// GET ALL USERS
app.get('/users', (req: Request, res: Response) => {
    try {
        res.status(200).send(users)
    } catch (error: any) {
        console.log(error)
        res.send(error.message)
    }
})

// GET ALL PRODUCTS
app.get('/products', (req: Request, res: Response) => {
    try {
        res.status(200).send(products)
    } catch (error: any) {

    }
})

// SEARCH PRODUCT BY ID
app.get('/products/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const result = products.find((product) => product.id === id)

        if (result) {
            res.status(200).send(result)
        }

        if (!result) {
            throw new Error('Não tem produto cadastrado com este "id".')
        }

    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
})

// SEARCH PRODUCT BY NAME
app.get('/product/search', (req: Request, res: Response) => {
    try {
        const q = req.query.q as string

        if (q.length < 1) {
            throw new Error('query params deve possuir pelo menos um caractere')
        }

        const result = products.filter((product) => {
            return product.name.toLowerCase().includes(q.toLowerCase())
        })

        res.status(200).send(result)
    } catch (error: any) {
        console.log(error)
        res.send(error.message)
    }
})

// SEARCH USER PURCHASES BY USER ID
app.get('/users/:id/purchases', (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const idExists = users.find((user) => user.id === id)
        if (!idExists) {
            throw new Error('"id" não cadastrado.')
        }

        const result = purchases.filter((purchase) => purchase.userId === id)

        if (result.length < 1) {
            throw new Error('Não tem purchase cadastrado com este "id" de usuário.')
        }

        res.status(200).send(result)

    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }

})

// CREATE NEW USER
app.post('/users', (req: Request, res: Response) => {
    try {
        const id = req.body.id
        const email = req.body.email
        const password = req.body.password

        if (id === undefined) {
            throw new Error('"id" precisa ser definido')
        } else if (id !== undefined) {
            if (typeof id !== "string") {
                throw new Error('"id" deve ser uma string')
            }
            if (id[0] !== "1") {
                throw new Error('"id" deve iniciar com 1')
            }
            const idExists = users.find((user) => user.id === id)
            if (idExists) {
                throw new Error('"id" já cadastrado. Não é possível criar mais de uma conta com a mesma "id".')
            }
        }

        if (email === undefined) {
            throw new Error('"email" precisa ser definido')
        } else if (email !== undefined) {
            if (typeof email !== "string") {
                throw new Error('"email" deve ser uma string')
            }
            if (!email.match("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")) {
                throw new Error('"email" deve ser no modelo seuemail@dominio.com.br')
            }
            const emailExists = users.find((user) => user.email === email)
            if (emailExists) {
                throw new Error('"email" já cadastrado. Não é possível criar mais de uma conta com o mesmo "email".')
            }
        }

        if (password === undefined) {
            throw new Error('"password" precisa ser definido')
        } else if (password !== undefined) {
            if (typeof password !== "string") {
                throw new Error('"password" deve ser uma string')
            }
        }

        const newUser: TUser = { id, email, password }
        users.push(newUser)

        res.status(201).send('Cadastro realizado com sucesso')
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
})

// CREATE NEW PRODUCT
app.post('/products', (req: Request, res: Response) => {
    try {
        const id = req.body.id
        const name = req.body.name
        const price = req.body.price
        const category = req.body.category

        if (id === undefined) {
            throw new Error('"id" precisa ser definido')
        } else if (id !== undefined) {
            if (typeof id !== "string") {
                throw new Error('"id" deve ser uma string')
            }
            if (id[0] !== "2") {
                throw new Error('"id" deve iniciar com 2')
            }
            const idExists = products.find((product) => product.id === id)
            if (idExists) {
                throw new Error('"id" já cadastrado. Não é possível criar mais de um produto com o mesmo "id".')
            }
        }

        if (name === undefined) {
            throw new Error('"name" precisa ser definido')
        } else if (name !== undefined) {
            if (typeof name !== "string") {
                throw new Error('"name" deve ser uma string')
            }
        }

        if (price === undefined) {
            throw new Error('"price" precisa ser definido')
        } else if (price !== undefined) {
            if (typeof price !== "number") {
                throw new Error('"price" deve ser um número')
            }
        }

        if (category === undefined) {
            throw new Error('"category" deve ser definida, as opções são: "Acessórios", "Roupas e calçados", "Eletrônicos".')
        } else if (category !== undefined) {
            if (typeof category !== "string") {
                throw new Error('"category" deve ser uma string')
            }
            if (category !== CATEGORY.ACCESSORIES &&
                category !== CATEGORY.CLOTHES_AND_SHOES &&
                category !== CATEGORY.ELETRONICS) {
                throw new Error('"category" deve ser um dos tipos válidos: "Acessórios", "Roupas e calçados", "Eletrônicos".')
            }
        }

        const newProduct: TProduct = { id, name, price, category }
        products.push(newProduct)

        res.status(201).send('Produto cadastrado com sucesso')
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
})

// CREATE NEW PURCHASE
app.post('/purchases', (req: Request, res: Response) => {
    try {
        const userId: string = req.body.userId
        const productId: string = req.body.productId
        const quantity: number = req.body.quantity
        const totalPrice: number = req.body.totalPrice

        if (userId === undefined) {
            throw new Error('"userId" precisa ser definido')
        } else if (userId !== undefined) {
            if (typeof userId !== "string") {
                throw new Error('"userId" deve ser uma string')
            }
            if (userId[0] !== "1") {
                throw new Error('"userId" deve iniciar com 1')
            }
            const userIdExists = users.find((user) => user.id === userId)
            if (!userIdExists) {
                throw new Error('"userId" não cadastrado.')
            }
        }

        if (productId === undefined) {
            throw new Error('"productId" precisa ser definido')
        } else if (productId !== undefined) {
            if (typeof productId !== "string") {
                throw new Error('"productId" deve ser uma string')
            }
            if (productId[0] !== "2") {
                throw new Error('"productId" deve iniciar com 2')
            }
            const productIdExists = products.find((product) => product.id === productId)
            if (!productIdExists) {
                throw new Error('"productId" não cadastrado.')
            }
        }

        if (quantity === undefined) {
            throw new Error('"quantity" precisa ser definido')
        } else if (quantity !== undefined) {
            if (typeof quantity !== "number") {
                throw new Error('"quantity" deve ser um número')
            }
        }

        if (totalPrice === undefined) {
            throw new Error('"totalPrice" precisa ser definido')
        } else if (totalPrice !== undefined) {
            if (typeof totalPrice !== "number") {
                throw new Error('"totalPrice" deve ser um número')
            }
        }
        //TRAVEI AQUI
        /*const priceOfOne = products.find((product) => {
            product.id === productId
            //if (product.price) {
                return product.price
            //}
        })
        const result = priceOfOne * quantity
        if (totalPrice !== result) {
            throw new Error('"totalPrice" deve ser = preço unitário * quantidade.')
        }
    }
    //product.id === productId
    //const res = product.price
    //return res*/

        const newPurchase: TPurchase = { userId, productId, quantity, totalPrice }
        purchases.push(newPurchase)

        res.status(201).send('Compra realizada com sucesso')
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
})

// EDIT USER BY ID
app.put('/users/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const idExists = users.find((user) => user.id === id)
        if (!idExists) {
            throw new Error('"id" não cadastrado.')
        }

        const newEmail = req.body.email as string | undefined
        const newPassword = req.body.password as string | undefined

        if (newEmail !== undefined) {
            if (typeof newEmail !== "string") {
                throw new Error('"email" deve ser uma string')
            }
            if (!newEmail.match("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")) {
                throw new Error('"email" deve ser no modelo seuemail@dominio.com.br')
            }
            const emailExists = users.find((user) => user.email === newEmail)
            if (emailExists) {
                throw new Error('"email" já cadastrado. Não é possível criar mais de uma conta com o mesmo "email".')
            }
        }

        if (newPassword !== undefined) {
            if (typeof newPassword !== "string") {
                throw new Error('"password" deve ser uma string')
            }
        }

        const userToEdit = users.find((user) => user.id === id)

        if (userToEdit) {
            userToEdit.email = newEmail || userToEdit.email
            userToEdit.password = newPassword || userToEdit.password
        }
        res.status(200).send('Cadatro  atualizado com sucesso')
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
})

// EDIT PRODUCT BY ID
app.put('/products/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const idExists = products.find((product) => product.id === id)
        if (!idExists) {
            throw new Error('"id" não cadastrado.')
        }

        const newName = req.body.name as string | undefined
        const newPrice = req.body.price as number
        const newCategory = req.body.category as CATEGORY | undefined

        if (newName !== undefined) {
            if (typeof newName !== "string") {
                throw new Error('"name" deve ser uma string')
            }
        }

        if (newPrice !== undefined) {
            if (typeof newPrice !== "number") {
                throw new Error('"price" deve ser um número')
            }
        }

        if (newCategory !== undefined) {
            if (typeof newCategory !== "string") {
                throw new Error('"category" deve ser uma string')
            }
            if (newCategory !== CATEGORY.ACCESSORIES &&
                newCategory !== CATEGORY.CLOTHES_AND_SHOES &&
                newCategory !== CATEGORY.ELETRONICS) {
                throw new Error('"category" deve ser um dos tipos válidos: "Acessórios", "Roupas e calçados", "Eletrônicos".')
            }
        }

        const productToEdit = products.find((product) => product.id === id)

        if (productToEdit) {
            productToEdit.name = newName || productToEdit.name
            productToEdit.price = isNaN(newPrice) ? productToEdit.price : newPrice
            productToEdit.category = newCategory || productToEdit.category
        }
        res.status(200).send('Produto atualizado com sucesso')
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)

    }
})

// DELETE USER BY ID
app.delete('/users/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const idExists = users.find((user) => user.id === id)
        if (!idExists) {
            throw new Error('"id" não cadastrado.')
        }

        const userIndex = users.findIndex((user) => user.id === id)

        if (userIndex >= 0) {
            users.splice(userIndex, 1)
        }
        res.status(200).send('User apagado com sucesso')
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
})

// DELETE PRODUCT BY ID
app.delete('/products/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const idExists = products.find((product) => product.id === id)
        if (!idExists) {
            throw new Error('"id" não cadastrado.')
        }

        const productIndex = products.findIndex((product) => product.id === id)

        if (productIndex >= 0) {
            products.splice(productIndex, 1)
        }
        res.status(200).send('Product apagado com sucesso')
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
})