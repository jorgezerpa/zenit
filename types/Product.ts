export interface Product {
    id: string
    name: string
    price: number
    images: Array<string>
    description?: string
    tag?: string // tag displayed on the product card 
}

export interface CartProduct {
    id: string
    quantity: number
}