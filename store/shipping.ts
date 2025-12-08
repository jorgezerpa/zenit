import { create } from 'zustand'
import { ShippingData } from "@/types/ShippingData";

interface shippingState {
    shippingData: ShippingData|null
    addShippingData: (data:ShippingData) => void
    clearShippingData: () => void
}


const useShippingStore = create<shippingState>()((set) => ({
    shippingData: null,
    addShippingData: (data) => {
        set((state) => {
            return { shippingData: data }
        })
    },
    clearShippingData: () => {
        set((state) => {
            return { shippingData: null }
        })
    },
}))

export { useShippingStore }