import { Product } from '@/types/Product'
import { create } from 'zustand'

interface ProductsState {
    products: Array<Product> // array of ids
}

const useProductsStore = create<ProductsState>()((set) => ({
    products: [
        { 
            id: "paralletes-lg", 
            name: "Barras paralelas grandes", 
            description: "",
            price: 140,
            images: [
                'images/products/parallettes-lg-1.png',
                'images/products/parallettes-lg-2.png',
            ],    
            tag: "Mas vendido"
        },
        { 
            id: "paralletes-md", 
            name: "Barras paralelas medianas", 
            price: 90,
            images: [
                'images/products/parallettes-md-1.png',
                'images/products/parallettes-md-2.png',
                'images/products/parallettes-md-3.png'
            ]    
        },
        { 
            id: "paralletes-sm", 
            name: "Barras paralelas pequeñas", 
            price: 60,
            images: [
                'images/products/parallettes-sm-1.png',
                'images/products/parallettes-sm-2.png',
            ]    
        },
        { 
            id: "pullup-bar-corner", 
            name: "Barra de dominadas para esquinas", 
            price: 50,
            images: ['images/homeHero/1.png', 'images/homeHero/2.png', 'images/homeHero/3.png']    
        },
        { 
            id: "olimpic-rings", 
            name: "Anillas olimpicas de madera", 
            price: 60,
            images: ['images/homeHero/1.png', 'images/homeHero/2.png', 'images/homeHero/3.png']    
        },
    ],

}))


export { useProductsStore }