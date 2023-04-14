import express, { Request, Response } from 'express'
import cors from 'cors'
//import { CATEGORY, TProduct, TPurchase, TUser } from "./types"
import { db } from './database/knex';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
});

// PING
app.get('/ping', async (req: Request, res: Response) => {
    try {
        res.status(200).send('Pong!')
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

// GET ALL USERS
app.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await db.raw(`
        SELECT * FROM users;
        `)

        res.status(200).send(users)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

// GET ALL PRODUCTS
app.get('/products', async (req: Request, res: Response) => {
    try {
        const products = await db.raw(`
        SELECT * FROM products;
        `)

        res.status(200).send(products)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

// SEARCH PRODUCT BY ID
app.get('/products/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const [result] = await db.raw(`
        SELECT * FROM products 
        WHERE id = "${id}";`)

        if (result) {
            res.status(200).send(result)
        }

        if (!result) {
            throw new Error('Não tem produto cadastrado com este "id".')
        }

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})


// SEARCH PRODUCT BY NAME
app.get('/product/search', async (req: Request, res: Response) => {
    try {
        const q = req.query.q as string

        if (q.length < 1) {
            throw new Error('query params deve possuir pelo menos um caractere')
        }

        const result = await db.raw(`SELECT * FROM products WHERE name LIKE "%${q}%"`)

        res.status(200).send(result)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

// SEARCH USER PURCHASES BY USER ID
app.get('/users/:id/purchases', async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const [idExists] = await db.raw(`
        SELECT * FROM users 
        WHERE id = "${id}";`)

        if (!idExists) {
            throw new Error('"id" não cadastrado.')
        }

        const result = await db.raw(`
        SELECT * FROM purchases
        WHERE user_id = "${id}";`)

        if (result.length < 1) {
            throw new Error('Não tem purchase cadastrado com este "id" de usuário.')
        }

        res.status(200).send(result)

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

})

// CREATE NEW USER
app.post('/users', async (req: Request, res: Response) => {
    try {
        const id = req.body.id
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password

        if (id === undefined) {
            throw new Error('"id" precisa ser definido')
        } else if (id !== undefined) {
            if (typeof id !== "number") {
                throw new Error('"id" deve ser um number')
            }
            if (id < 1000 || id > 1999) {
                throw new Error('"id" deve iniciar com 1, deve ser um número entre 1000 e 1999.')
            }

            const [idExists] = await db.raw(`
            SELECT * FROM users
            WHERE id = "${id}";`)
            if (idExists) {
                throw new Error('"id" já cadastrado. Não é possível criar mais de uma conta com a mesma "id".')
            }
        }

        if (name === undefined) {
            throw new Error('"name" precisa ser definido')
        } else if (name !== undefined) {
            if (typeof name !== "string") {
                throw new Error('"name" deve ser uma string')
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
            const [emailExists] = await db.raw(`
            SELECT * FROM users
            WHERE email = "${email}"`)
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

        await db.raw(`INSERT INTO users (id, name, email, password)
         VALUES ("${id}","${name}","${email}","${password}");`)

        res.status(201).send('Cadastro realizado com sucesso')
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})


// CREATE NEW PRODUCT
app.post('/products', async (req: Request, res: Response) => {
    try {
        const id = req.body.id
        const name = req.body.name
        const price = req.body.price
        const description = req.body.description
        const imageUrl = req.body.image_url

        if (id === undefined) {
            throw new Error('"id" precisa ser definido')
        } else if (id !== undefined) {
            if (typeof id !== "number") {
                throw new Error('"id" deve ser um number')
            }
            if (id < 2000 || id > 2999) {
                throw new Error('"id" deve iniciar com 2, deve ser um número entre 2000 e 2999.')
            }
            const [idExists] = await db.raw(`
            SELECT * FROM products
            WHERE id = "${id}";`)
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
                throw new Error('"price" deve ser um número real')
            }
        }

        if (description === undefined) {
            throw new Error('"description" precisa ser definido')
        } else if (description !== undefined) {
            if (typeof description !== "string") {
                throw new Error('"description" deve ser uma string')
            }
        }

        if (imageUrl === undefined) {
            throw new Error('"imageUrl" precisa ser definido')
        } else if (imageUrl !== undefined) {
            if (typeof imageUrl !== "string") {
                throw new Error('"image_url" deve ser uma string')
            }
        }

        await db.raw(`INSERT INTO products (id, name, price, description, image_url)
        VALUES ("${id}","${name}","${price}","${description}", "${imageUrl}");`)

        res.status(201).send('Produto cadastrado com sucesso')
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

// CREATE NEW PURCHASE
app.post('/purchases', async (req: Request, res: Response) => {
    try {
        const id = req.body.id
        const buyer = req.body.user_id

        if (id === undefined) {
            throw new Error('"id" precisa ser definido')
        } else if (id !== undefined) {
            if (typeof id !== "number") {
                throw new Error('"id" deve ser um number')
            }
            if (id < 3000 || id > 3999) {
                throw new Error('"id" deve iniciar com 3, deve ser um número entre 3000 e 3999.')
            }
            const [idExists] = await db.raw(`
            SELECT * FROM purchases
            WHERE id = "${id}";`)
            if (idExists) {
                throw new Error('"id" já cadastrado. Não é possível criar mais de um purchase com o mesmo "id".')
            }
        }

        if (buyer === undefined) {
            throw new Error('"user_id" precisa ser definido')
        } else if (buyer !== undefined) {
            if (typeof buyer !== "number") {
                throw new Error('"user_id" deve ser um number')
            }
            if (buyer < 1000 || buyer > 1999) {
                throw new Error('"user_id" deve iniciar com 1, deve ser um número entre 1000 e 1999.')
            }
            const [buyerExists] = await db.raw(`
            SELECT * FROM users
            WHERE id = "${buyer}";`)
            if (!buyerExists) {
                throw new Error('"user_id" não cadastrado.')
            }
        }

        await db.raw(`INSERT INTO purchases (id, user_id)
        VALUES ("${id}", "${buyer}");`)

        res.status(201).send('Compra cadastrada com sucesso')
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

/*
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
*/