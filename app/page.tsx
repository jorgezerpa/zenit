'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Hero } from "@/components/Hero";
import { Shipping } from "@/components/shipping";
import { TopBar } from "@/components/topbar";
import { useProductsStore } from "@/store/products";

export default function Home() {
  const router = useRouter()
  const productsStore = useProductsStore()

  return (
    <div>
      <TopBar />
      
      {/* hero */}
      <Hero />
      <Shipping />

      {/* Products header */}
      <div className="flex flex-col justify-center items-center pt-10 pb-10">
        <h2 className="text-3xl">Productos</h2>
        <p>Our most popular products</p>
      </div>


      {/* Products list */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 px-4 pb-12">
        
        {/* Loop over the products array */}
        {productsStore.products.map((product) => (
          // Product Child Item
          <div 
            onClick={()=>router.push(`/product?productId=${product.id}`)}
            key={product.id}
            className="h-[250px] sm:h-[400px] w-full transition duration-300 hover:scale-[101%]"
          >
            <div className="bg-gray-800 w-full h-[175px] sm:h-[300px]  bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${product.images[0]})` }}>

            </div>
            <p className="text-base font-bold text-center">
              { product.name }
            </p>
            <p className="text-base  text-center">
              { product.price }$
            </p>
            {/* <p className="text-base text-center w-full pt-3 pb-3 bg-gray-200">
              Ver
            </p> */}
          </div>
        ))}

      </div>


    </div>      
  );
}
