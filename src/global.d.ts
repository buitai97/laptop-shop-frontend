export { }

declare global {
    interface IProduct {
        detailDesc: string,
        factory: string,
        id: number,
        image: string,
        name: string,
        price: number,
        quantity: number,
        shortDesc: string,
        sold?: number,
        target: null
    }
    interface IUser {
        id: number,
        username: string,
        email: string,
        avatar: string,
        name: string,
        role: {
            id: number,
            name: string,
            description: string
        }
    }
}