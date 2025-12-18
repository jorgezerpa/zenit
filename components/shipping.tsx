'use client'
import { useState, useEffect } from "react";
import Image from "next/image";

export function Shipping() {
  const shippingLogos = ['/images/shipping/mrw.png', '/images/shipping/zoom.png'];

    return (         
        <div className="flex flex-col justify-center items-center pt-10 pb-10 bg-[#F1F1F1]">
            <h2 className="text-3xl">Envios a nivel nacional</h2>
            <p>Obten tu equipo donde sea que estes</p>
            <div className="h-10" />
            <div className="flex flex-wrap justify-center items-center gap-5">
            {
            shippingLogos.map(l => (
                <Image
                key={"uniqueKeyIgvisor"+l}
                className="dark:invert"
                src={l}
                alt="shipping logo"
                width={639/5}
                height={122/5}
                priority
                />
            ))
            }
            </div>
        </div>
    );
}
