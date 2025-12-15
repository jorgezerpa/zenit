'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Hero } from "@/components/Hero";
import { Shipping } from "@/components/shipping";
import { TopBar } from "@/components/topbar";
import { useProductsStore } from "@/store/products";
import { BackButton } from "@/components/backButton";
import Link from "next/link"; // Import Link for proper Next.js navigation

export default function ThankYou() {
  const router = useRouter()
  // The productsStore is not strictly needed here, but kept for completeness based on your template.
  const productsStore = useProductsStore() 

  return (
    <div>
      <TopBar />
      <div className="h-[81px]" />

      {/* Main Content Container - Centered and Styled */}
      <div className="flex flex-col items-center justify-center p-5 min-h-[70vh] text-center">
        
        {/* Success Icon/Image Placeholder */}
        <div className="text-green-500 mb-6">
          {/* Using a simple checkmark or a placeholder for a confirmation visual */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        {/* Thank You Message */}
        <h1 className="text-4xl font-extrabold mb-4 text-black">
          ¡Gracias por tu compra!
        </h1>
        
        <p className="text-xl text-gray-700 mb-8">
          Tu pedido ha sido procesado con éxito.
        </p>

        <p className="text-md text-gray-500 max-w-lg mb-10">
          En breve recibirás un correo de confirmación con los detalles de tu orden. Si tienes alguna pregunta, no dudes en contactarnos.
        </p>

        {/* Call to Action Button - Styled similarly to the 'Add to cart' button */}
        <Link href="/">
          <div className="w-full pt-3 pb-3 pr-2 pl-2 bg-black text-white text-center rounded-sm max-w-xs transition duration-300 hover:bg-gray-800 cursor-pointer">
            Volver a la lista de productos
          </div>
        </Link>

      </div>   
    </div>   
  );
}