'use client'
import { useState, useEffect } from "react";
import { useCheckoutStore } from "@/store/checkout"; 



export function Binance() {

    return ( 
        <>
            <div><span className="font-bold">Titular de la cuenta:</span>Jorge Luis Zerpa Davila</div>
            <div><span className="font-bold">Correo:</span>jorgezerpacoder@gmail.com</div>
            <div><span className="font-bold">Binance ID:</span>481529226</div>
        </>
    );
}