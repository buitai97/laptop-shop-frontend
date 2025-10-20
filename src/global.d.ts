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
}