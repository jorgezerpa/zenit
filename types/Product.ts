export interface Product {
    id: string
    name: string
    price: number
    images: Array<string>
}

export interface CartProduct {
    id: string
    quantity: number
}