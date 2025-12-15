'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Hero } from "@/components/Hero";
import { Shipping } from "@/components/shipping";
import { TopBar } from "@/components/topbar";
import { useProductsStore } from "@/store/products";
import { useCartStore } from "@/store/cart"; // Import the cart store

export default function Home() {
    const router = useRouter()
    const productsStore = useProductsStore()
    const cartStore = useCartStore() // Initialize cart store

    // Function to check if a product is in the cart
    const isProductInCart = (productId: string) => {
        return cartStore.products.some(p => p.id === productId);
    };

    return (
      <div>
        <TopBar />
        <div className="h-[81px]" />
        
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
          {productsStore.products.map((product) => {
            const inCart = isProductInCart(product.id);
            
            return (
              // Product Card
              <div 
                key={product.id}
                className="group relative bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden transition duration-300 hover:shadow-lg hover:border-gray-300"
              >
                {/* Image and Clickable Area */}
                <div 
                    onClick={()=>router.push(`/product?productId=${product.id}`)}
                    className="cursor-pointer"
                >
                    <div 
                        className="w-full h-[175px] sm:h-[250px] bg-center bg-cover bg-no-repeat transition-opacity duration-300 group-hover:opacity-90" 
                        style={{ backgroundImage: `url(${product.images[0]})` }}
                    >
                    </div>
                </div>

                {/* Info and Button Area */}
                <div className="p-3">
                    <div 
                        onClick={()=>router.push(`/product?productId=${product.id}`)}
                        className="cursor-pointer"
                    >
                        <p className="text-base font-semibold">
                            { product.name }
                        </p>
                        <p className="text-lg font-bold text-gray-800 mt-1">
                            ${ product.price }
                        </p>
                    </div>

                    {/* Add/Remove Button Container */}
                    <div className="flex justify-end">
                      <div 
                          className={`mt-3 pl-1 pr-1 flex items-center justify-center rounded-md text-sm text-white py-1 cursor-pointer transition-colors duration-200 
                              ${inCart ? 'bg-black hover:bg-gray-700' : 'bg-green-600 hover:bg-green-700'}`}
                          onClick={() => { 
                              inCart ? cartStore.removeProduct(product.id) : cartStore.addProduct(product.id)
                          }}
                      >
                          {inCart ? (
                              <>
                                  {/* Remove Icon (Trash Can) */}
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                              </>
                          ) : (
                              <>
                                  {/* Add Icon (Shopping Bag/Plus) */}
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                              </>
                          )}
                      </div>
                    </div>
                    
                </div>
              </div>
            );
          })}

        </div>
      </div> 
    );
}