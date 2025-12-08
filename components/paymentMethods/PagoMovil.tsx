'use client'
import { useState, useEffect } from "react";
import { useCheckoutStore } from "@/store/checkout"; 



export function PagoMovil() {

    return ( 
        <>
            <div><span className="font-bold">Titular de la cuenta:</span>Jorge Luis Zerpa Davila</div>
            <div><span className="font-bold">CI:</span>29634474</div>
            <div><span className="font-bold">Telefono:</span>04128762882</div>
            <div><span className="font-bold">Banco:</span>BBVA Provincial</div>
        </>
    );
}