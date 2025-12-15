'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart";

export function TopBar() {
    const router = useRouter()
    const cartStore = useCartStore()

    // Get the number of items for the badge
    const itemCount = cartStore.products.length;

    useEffect(()=>{
      cartStore.initialLoad()
    }, [])

    return (  
      <div className="bg-black h-[100px] p-5 flex items-center">
        <div className="w-full flex justify-center items-center">
          <div className="w-full"></div>
          <div className="w-full"></div>
          
          {/* Cart Icon and Bubble Container */}
          <div 
            className="w-full flex justify-end items-center cursor-pointer"
            onClick={()=>router.push("/cart")}
          >
            <div className="relative p-2">
              
              {/* Shopping Bag Icon (SVG) */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-8 w-8 text-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>

              {/* Cart Bubble / Badge */}
              {itemCount > 0 && (
                <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
                  <div className="flex items-center justify-center h-5 w-5 rounded-full bg-red-600 text-white text-xs font-bold border-2 border-black">
                    {itemCount}
                  </div>
                </div>
              )}
              
            </div>
          </div>
        </div>
      </div>
    );
}