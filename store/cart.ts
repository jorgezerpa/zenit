import { create } from 'zustand'
import { CartProduct } from '@/types/Product'

interface CartState {
    products: Array<CartProduct> // array of ids
    addProduct: (productId: string) => void
    removeProduct: (productId: string) => void
    increaseQuantity: (productId: string) => void
    decreaseQuantity: (productId: string) => void
    clear: () => void
    //
    initialLoad: () => void // called in a useEffect to read from localStorage when open cart    
}

const STORAGE_KEY = 'zenit_cart_1965';

const useCartStore = create<CartState>()((set) => ({
    products: [],
    addProduct: (productId) => {
        set((state) => {
            if(state.products.filter(p => productId == p.id).length>0) return {} // already on cart
            const newProducts = [...state.products, { id:productId, quantity:1 }];
            writeLocalStorage(newProducts)
            return { products: newProducts }
        })
    },
    removeProduct: (productId) => {
        set((state) => {
            const newProducts = state.products.filter(p => p.id != productId);
            writeLocalStorage(newProducts)
            return { products: newProducts }
        })
    },
    increaseQuantity: (productId) => {
        set((state) => {
            const newProducts = state.products.map(p => {
                if(p.id == productId) return { ...p, quantity: p.quantity + 1 }
                return p
            });
            writeLocalStorage(newProducts)
            return { products: newProducts }
        })
    },
    decreaseQuantity: (productId) => {
        set((state) => {
            const newProducts = state.products.map(p => {
                if(p.id == productId && p.quantity > 1) return { ...p, quantity: p.quantity - 1 }
                return p
            });
            writeLocalStorage(newProducts)
            return { products: newProducts }
        })
    },
    clear: () => set((state) => {
        writeLocalStorage([])
        return  { products: [] }
    }),
    //
    initialLoad: () => {
        const products = readLocalStorage();
        set(() => ({ products }))
    },
    //

}))


// utils 
const readLocalStorage = (): Array<CartProduct> => {
    try {
        const storedValue = localStorage.getItem(STORAGE_KEY);
        return storedValue ? JSON.parse(storedValue) : [];
    } catch (e) {
        console.error("Could not load initial state from localStorage:", e);
        return [];
    }
};

// Function to save the current state to localStorage
const writeLocalStorage = (products: Array<CartProduct>) => {
    try {
        const serializedState = JSON.stringify(products);
        localStorage.setItem(STORAGE_KEY, serializedState);
    } catch (e) {
        console.error("Could not save state to localStorage:", e);
    }
};

export { useCartStore }