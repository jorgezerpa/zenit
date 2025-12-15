import { Product } from '@/types/Product'
import { create } from 'zustand'

interface ProductsState {
    products: Array<Product> // array of ids
}

const useProductsStore = create<ProductsState>()((set) => ({
    products: [
  { 
    id: "plb-hd-001", 
    name: "Heavy-Duty Doorway Pull-Up Bar", 
    price: 39.99,
    images: ['images/homeHero/1.png', 'images/homeHero/2.png', 'images/homeHero/3.png','images/homeHero/1.png', 'images/homeHero/2.png', 'images/homeHero/3.png','images/homeHero/1.png', 'images/homeHero/2.png', 'images/homeHero/3.png','images/homeHero/1.png', 'images/homeHero/2.png', 'images/homeHero/3.png','images/homeHero/1.png', 'images/homeHero/2.png', 'images/homeHero/3.png','images/homeHero/1.png', 'images/homeHero/2.png', 'images/homeHero/3.png',]    
},
{ 
    id: "pbd-pr-002", 
    name: "Portable Low Parallette Dip Bars (Pair)", 
    price: 79.50,
    images: ['images/homeHero/1.png', 'images/homeHero/2.png', 'images/homeHero/3.png']    
},
{ 
    id: "rgs-sl-003", 
    name: "Olympic Gymnastic Rings with Numbered Straps", 
    price: 54.95,
    images: ['images/homeHero/1.png', 'images/homeHero/2.png', 'images/homeHero/3.png']    
},
{ 
    id: "rwc-md-004", 
    name: "Multi-Function Wall Mount Pull-Up Station", 
    price: 129.00,
    images: ['images/homeHero/1.png', 'images/homeHero/2.png', 'images/homeHero/3.png']    
},
{ 
    id: "abw-rd-005", 
    name: "Premium Steel Ab Wheel Roller", 
    price: 24.99,
    images: ['images/homeHero/1.png', 'images/homeHero/2.png', 'images/homeHero/3.png']    
},
{ 
    id: "pud-rv-006", 
    name: "Resistance Band Set (5-Level)", 
    price: 29.99,
    images: ['images/homeHero/1.png', 'images/homeHero/2.png', 'images/homeHero/3.png']    
},
{ 
    id: "str-mat-007", 
    name: "High-Density Foam Exercise Mat (6' x 4')", 
    price: 45.00,
    images: ['images/homeHero/1.png', 'images/homeHero/2.png', 'images/homeHero/3.png']    
},
{ 
    id: "hld-bl-008", 
    name: "Hand Grip Strengthener (Adjustable 10-60kg)", 
    price: 14.95,
    images: ['images/homeHero/1.png', 'images/homeHero/2.png', 'images/homeHero/3.png']    
},
{ 
    id: "wvt-sd-009", 
    name: "Adjustable Weighted Vest (20 lbs)", 
    price: 99.99,
    images: ['images/homeHero/1.png', 'images/homeHero/2.png', 'images/homeHero/3.png']    
},
{ 
    id: "plb-cm-010", 
    name: "Ceiling Mount Gravity Boots for Inversion", 
    price: 85.00,
    images: ['images/homeHero/1.png', 'images/homeHero/2.png', 'images/homeHero/3.png']    
},
] ,

}))


export { useProductsStore }