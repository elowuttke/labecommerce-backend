import { TUser, TProduct, TPurchase, CATEGORY } from "./types";

export const users: TUser[] = [
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

const getAllUsers = () => console.log(users)

export const createUser = (id: string, email: string, password: string) => {
    const newUser: TUser = {
        id,
        email,
        password
    }
    console.log("Cadastro realizado com sucesso")
    users.push(newUser)
    getAllUsers()
}

//createUser("1006", "felix@labenu.com", "678901")


export const products: TProduct[] = [
    {
        id: "2001",
        name: "Fivela",
        price: 30,
        category: CATEGORY.ACCESSORIES
    },
    {
        id: "2002",
        name: "Feldspato brincos",
        price: 20,
        category: CATEGORY.ACCESSORIES
    },
    {
        id: "2003",
        name: "Fatiota",
        price: 700,
        category: CATEGORY.CLOTHES_AND_SHOES
    },
    {
        id: "2004",
        name: "Fitflop Tênis",
        price: 350,
        category: CATEGORY.CLOTHES_AND_SHOES
    },
    {
        id: "2005",
        name: "Falexa",
        price: 240,
        category: CATEGORY.ELETRONICS
    },
]

export const getAllProducts = () => console.log(products)

export const createProduct = (id: string, name: string, price: number, category: CATEGORY) => {
    const newProduct: TProduct = {
        id,
        name,
        price,
        category
    }
    console.log("Produto criado com sucesso")
    products.push(newProduct)
    getAllProducts()
}
//createProduct("2006", "Fita k7", 15, CATEGORY.ELETRONICS)

export const getProductById = (idToSearch: string) => {
    const result = products.find((product) => product.id === idToSearch)
    if (!result) {
        console.log("undefined")
    } else {
        console.log(result)
    }
}
//getProductById("2004")

export const purchases: TPurchase[] = [
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
]
