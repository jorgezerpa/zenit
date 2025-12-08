'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import { useShippingStore } from "@/store/shipping"; 
import { ShippingData } from "@/types/ShippingData";

const inputClasses = "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow mb-3";

export function ShippingZoom() {
    const shippingStore = useShippingStore()    
    const [shippingData, setShippingData] = useState<ShippingData>({
        state: "",
        municipality: "",
        agencyNumber: "",
        method: "zoom", 
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setShippingData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {
        shippingStore.addShippingData(shippingData);
    }, [shippingData]);


    return ( 
        <div>
            <input 
                type="text" 
                name="state" 
                id="state" 
                placeholder="Estado" 
                className={inputClasses}
                value={shippingData.state}
                onChange={handleChange}
            />
            <input 
                type="text" 
                name="municipality" 
                id="municipality" 
                placeholder="Municipio" 
                className={inputClasses} 
                value={shippingData.municipality}
                onChange={handleChange}
            />
            <input 
                type="text" 
                name="agencyNumber" 
                id="agency-number" 
                placeholder="Direccion/Número de agencia" 
                className={inputClasses}
                value={shippingData.agencyNumber}
                onChange={handleChange}
            />
        </div> 
    );
}