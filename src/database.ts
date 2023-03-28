import { TUser, TProduct, TPurchase } from "./types";

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

export const products: TProduct[] = [
    {
        id: "2001",
        name: "Feijão",
        price: 10,
        category: "alimento"
    },
    {
        id: "2002",
        name: "Farofa",
        price: 7,
        category: "alimento"
    },
    {
        id: "2003",
        name: "Figo",
        price: 20,
        category: "alimento"
    },
    {
        id: "2004",
        name: "Faca",
        price: 3,
        category: "bazar"
    },
    {
        id: "2005",
        name: "Festão",
        price: 40,
        category: "bazar"
    },
]

export const purchases: TPurchase[] = [
    {
        userId: "1001",
        productId: "2005",
        quantity: 3,
        totalPrice: 120
    },
    {
        userId: "1002",
        productId: "2002",
        quantity: 2,
        totalPrice: 14
    },
    {
        userId: "1004",
        productId: "2001",
        quantity: 5,
        totalPrice: 50
    },
]

    // userId: string,
    // productId: string,
    // quantity: number,
    // totalPrice: number