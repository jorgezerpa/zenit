'use client'
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { TopBar } from "@/components/topbar";
import { useCartStore } from "@/store/cart";
import { Product } from "@/types/Product";
import { useProductsStore } from "@/store/products";
import { BackButton } from "@/components/backButton";
import { Suspense } from "react";

function ProductPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const productId = searchParams.get('productId') as string

  const cartStore = useCartStore() // use only to check if product is already on cart 
  const productstore = useProductsStore()

  const [selectedImage, setSelectedImage] = useState<number>(0)
  
  const product = productstore.products.find(p => p.id === productId) || null

  return (
    <div>

      <TopBar />
      <div className="h-[81px]" />
      <BackButton to="/" text="" />


      {
        (!productId || !product) && (
          <div>
            No existe este producto
          </div>
        )
      }
      {
        (!!productId && !!product) && (
          <div className="flex flex-col md:flex-row items-center md:items-start">

            {/* images */}
            <div className="md:p-5 w-full flex flex-col-reverse md:flex-row">
              
              {/* Image selector */}
              <div className="w-full md:w-[100px] md:h-[500px] bg-[#F1F1F1] flex md:flex-col items-center gap-1 overflow-x-scroll md:overflow-x-hidden md:overflow-y-scroll">
                {
                  product.images.map((img, i) => (
                    <div 
                      key={product.id + img} 
                      className="w-[81px] h-[81px] bg-center bg-cover bg-no-repeat shrink-0" 
                      style={{ backgroundImage: `url(${img})`, outline: i==selectedImage?"5px solid green":"" }}
                      onClick={()=>setSelectedImage(i)}  
                    >

                    </div>
                  ))
                }
              </div>

              <div className="w-full h-[500px]  bg-center bg-contain bg-no-repeat" style={{ backgroundImage: `url(${product.images[selectedImage]})` }}></div>

            </div>

            {/* descrition */}
            <div className="w-full p-5">
              <h2 className="text-3xl font-bold">{ product.name }</h2>
              <p className="text-xl flex items-end gap-1">
                <label>${product.price}</label>
                <label className="text-sm ">(referencia a tasa BCV del dia)</label>
              </p>
              
              <div className="h-10"></div>

              <div className="w-full pt-3 pb-3 bg-black text-white text-center rounded-sm" onClick={()=>cartStore.products.filter(p => p.id == productId).length > 0 ? cartStore.removeProduct(productId) : cartStore.addProduct(productId)}>
                { cartStore.products.filter(p => p.id == productId).length > 0 ? "Remove from cart" : "Add to cart" }
              </div>
            </div>

          </div>
        )
      }


    </div>      
  );
}


// 2. The main export just provides the Suspense boundary
export default function Home() {
  return (
    <Suspense fallback={<div>Cargando producto...</div>}>
      <ProductPageContent />
    </Suspense>
  );
}