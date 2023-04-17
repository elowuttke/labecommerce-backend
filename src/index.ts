import express, { Request, Response } from 'express'
import cors from 'cors'
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

        const users = await db.select("*").from("users")

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

        const products = await db.select("*").from("products")

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

        const [product] = await db("products").where({ id: id })

        if (product) {
            res.status(200).send(product)
        }

        if (!product) {
            res.status(400)
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
            res.status(400)
            throw new Error('query params deve possuir pelo menos um caractere')
        }

        const [product] = await db("products")
            .select()
            .where("name", "LIKE", `%${q}%`)

        if (!product) {
            res.status(404)
            throw new Error(`Não tem produto cadastrado com "${q}".`)
        }

        res.status(200).send(product)
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

        const [idExists] = await db("users").where({ id: id })

        if (!idExists) {
            res.status(404)
            throw new Error('"id" não cadastrado.')
        }

        const [purchase] = await db("purchases").where({ user_id: id })

        if (!purchase) {
            res.status(404)
            throw new Error('Não tem purchase cadastrado com este "id" de usuário.')
        }

        res.status(200).send(purchase)

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
            res.status(400)
            throw new Error('"id" precisa ser definido')
        } else if (id !== undefined) {
            if (typeof id !== "number") {
                res.status(400)
                throw new Error('"id" deve ser um number')
            }
            if (id < 1000 || id > 1999) {
                res.status(400)
                throw new Error('"id" deve iniciar com 1, deve ser um número entre 1000 e 1999.')
            }

            const [idExists] = await db("users").where({ id: id })
            if (idExists) {
                res.status(400)
                throw new Error('"id" já cadastrado. Não é possível criar mais de uma conta com a mesma "id".')
            }
        }

        if (name === undefined) {
            res.status(400)
            throw new Error('"name" precisa ser definido')
        } else if (name !== undefined) {
            if (typeof name !== "string") {
                res.status(400)
                throw new Error('"name" deve ser uma string')
            }
        }

        if (email === undefined) {
            res.status(400)
            throw new Error('"email" precisa ser definido')
        } else if (email !== undefined) {
            if (typeof email !== "string") {
                res.status(400)
                throw new Error('"email" deve ser uma string')
            }
            if (!email.match("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")) {
                res.status(400)
                throw new Error('"email" deve ser no modelo seuemail@dominio.com.br')
            }

            const [emailExists] = await db("users").where({ email: email })
            if (emailExists) {
                res.status(400)
                throw new Error('"email" já cadastrado. Não é possível criar mais de uma conta com o mesmo "email".')
            }
        }

        if (password === undefined) {
            res.status(400)
            throw new Error('"password" precisa ser definido')
        } else if (password !== undefined) {
            if (typeof password !== "string") {
                res.status(400)
                throw new Error('"password" deve ser uma string')
            }
        }

        const newUser = { id, name, email, password }
        await db("users").insert(newUser)

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
            res.status(400)
            throw new Error('"id" precisa ser definido')
        } else if (id !== undefined) {
            if (typeof id !== "number") {
                res.status(400)
                throw new Error('"id" deve ser um number')
            }
            if (id < 2000 || id > 2999) {
                res.status(400)
                throw new Error('"id" deve iniciar com 2, deve ser um número entre 2000 e 2999.')
            }

            const [idExists] = await db("products").where({ id: id })
            if (idExists) {
                res.status(400)
                throw new Error('"id" já cadastrado. Não é possível criar mais de um produto com o mesmo "id".')
            }
        }

        if (name === undefined) {
            res.status(400)
            throw new Error('"name" precisa ser definido')
        } else if (name !== undefined) {
            if (typeof name !== "string") {
                res.status(400)
                throw new Error('"name" deve ser uma string')
            }
        }

        if (price === undefined) {
            res.status(400)
            throw new Error('"price" precisa ser definido')
        } else if (price !== undefined) {
            if (typeof price !== "number") {
                res.status(400)
                throw new Error('"price" deve ser um número real')
            }
        }

        if (description === undefined) {
            res.status(400)
            throw new Error('"description" precisa ser definido')
        } else if (description !== undefined) {
            if (typeof description !== "string") {
                res.status(400)
                throw new Error('"description" deve ser uma string')
            }
        }

        if (imageUrl === undefined) {
            res.status(400)
            throw new Error('"image_url" precisa ser definido')
        } else if (imageUrl !== undefined) {
            if (typeof imageUrl !== "string") {
                res.status(400)
                throw new Error('"image_url" deve ser uma string')
            }
        }

        const newProduct = { id, name, price, description, image_url: imageUrl }
        await db("products").insert(newProduct)

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
            res.status(400)
            throw new Error('"id" precisa ser definido')
        } else if (id !== undefined) {
            if (typeof id !== "number") {
                res.status(400)
                throw new Error('"id" deve ser um number')
            }
            if (id < 3000 || id > 3999) {
                res.status(400)
                throw new Error('"id" deve iniciar com 3, deve ser um número entre 3000 e 3999.')
            }

            const [idExists] = await db("purchases").where({ id: id })
            if (idExists) {
                res.status(400)
                throw new Error('"id" já cadastrado. Não é possível criar mais de um purchase com o mesmo "id".')
            }
        }

        if (buyer === undefined) {
            res.status(400)
            throw new Error('"user_id" precisa ser definido')
        } else if (buyer !== undefined) {
            if (typeof buyer !== "number") {
                res.status(400)
                throw new Error('"user_id" deve ser um number')
            }
            if (buyer < 1000 || buyer > 1999) {
                res.status(400)
                throw new Error('"user_id" deve iniciar com 1, deve ser um número entre 1000 e 1999.')
            }

            const [buyerExists] = await db("users").where({ id: buyer })
            if (!buyerExists) {
                res.status(400)
                throw new Error('"user_id" não cadastrado.')
            }
        }

        const newPurchase = { id, user_id: buyer }
        await db("purchases").insert(newPurchase)

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

// EDIT USER BY ID
app.put('/users/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const [idExists] = await db("users").where({ id: id })
        if (!idExists) {
            res.status(404)
            throw new Error('"id" não cadastrado.')
        }

        const newName = req.body.name as string | undefined
        const newEmail = req.body.email as string | undefined
        const newPassword = req.body.password as string | undefined

        if (newName !== undefined) {
            if (typeof newName !== "string") {
                res.status(400)
                throw new Error('"name" deve ser uma string')
            }
        }

        if (newEmail !== undefined) {
            if (typeof newEmail !== "string") {
                res.status(400)
                throw new Error('"email" deve ser uma string')
            }
            if (!newEmail.match("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")) {
                res.status(400)
                throw new Error('"email" deve ser no modelo seuemail@dominio.com.br')
            }

            const [emailExists] = await db("users").where({ email: newEmail })
            if (emailExists) {
                res.status(400)
                throw new Error('"email" já cadastrado. Não é possível criar mais de uma conta com o mesmo "email".')
            }
        }

        if (newPassword !== undefined) {
            if (typeof newPassword !== "string") {
                res.status(400)
                throw new Error('"password" deve ser uma string')
            }
        }

        const [userToEdit] = await db("users").where({ id: id })

        if (userToEdit) {

            const updatedUser = {
                name: newName || userToEdit.name,
                email: newEmail || userToEdit.email,
                password: newPassword || userToEdit.password
            }
            await db("users").update(updatedUser).where({ id: id })
        }

        res.status(200).send('Cadatro  atualizado com sucesso')
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

// EDIT PRODUCT BY ID
app.put('/products/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const [idExists] = await db("products").where({ id: id })
        if (!idExists) {
            res.status(404)
            throw new Error('"id" não cadastrado.')
        }

        const newName = req.body.name as string | undefined
        const newPrice = req.body.price as number
        const newDescription = req.body.description as string | undefined
        const newImageUrl = req.body.image_url as string | undefined

        if (newName !== undefined) {
            if (typeof newName !== "string") {
                res.status(400)
                throw new Error('"name" deve ser uma string')
            }
        }

        if (newPrice !== undefined) {
            if (typeof newPrice !== "number") {
                res.status(400)
                throw new Error('"price" deve ser um número')
            }
        }

        if (newDescription !== undefined) {
            if (typeof newDescription !== "string") {
                res.status(400)
                throw new Error('"description" deve ser uma string')
            }
        }

        if (newImageUrl !== undefined) {
            if (typeof newImageUrl !== "string") {
                res.status(400)
                throw new Error('"image_url" deve ser uma string')
            }
        }

        const [productToEdit] = await db("products").where({ id: id })
        if (productToEdit) {
            const updatedProduct = {
                name: newName || productToEdit.name,
                price: isNaN(newPrice) ? productToEdit.price : newPrice,
                description: newDescription || productToEdit.description,
                image_url: newImageUrl || productToEdit.image_url
            }
            await db("products").update(updatedProduct).where({ id: id })
        }

        res.status(200).send('Produto atualizado com sucesso')
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

// DELETE USER BY ID
app.delete('/users/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        if (id === undefined) {
            res.status(400)
            throw new Error('"id" precisa ser definido')
        }

        const [idExists] = await db("users").where({ id: id })
        if (!idExists) {
            res.status(400)
            throw new Error('"id" não cadastrado.')
        }


        await db("users").del().where({ id: id })

        res.status(200).send('User deletado com sucesso')
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

// DELETE PRODUCT BY ID
app.delete('/products/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        if (id === undefined) {
            res.status(400)
            throw new Error('"id" precisa ser definido')
        }

        const [idExists] = await db("products").where({ id: id })
        if (!idExists) {
            res.status(400)
            throw new Error('"id" não cadastrado.')
        }

        await db("products").del().where({ id: id })

        res.status(200).send('Product apagado com sucesso')
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
