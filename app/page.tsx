'use client'
import { useRouter } from "next/navigation";
import { Hero } from "@/components/Hero";
import { Shipping } from "@/components/shipping";
import { TopBar } from "@/components/topbar";
import { useProductsStore } from "@/store/products";
import { useCartStore } from "@/store/cart";

export default function Home() {
    const router = useRouter();
    const productsStore = useProductsStore();
    const cartStore = useCartStore();

    const isProductInCart = (productId: string) => {
        return cartStore.products.some(p => p.id === productId);
    };

    return (
      <div className="bg-gray-50 min-h-screen">
        <TopBar />
        <div className="h-[81px]" />
        
        <Hero />
        <Shipping />

        {/* Products header */}
        <div className="flex flex-col justify-center items-center pt-16 pb-12 px-4">
          <span className="text-blue-600 font-bold uppercase tracking-[0.3em] text-xs mb-2">Equipamiento Pro</span>
          <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-black text-center">
            Nuestros <span className="text-gray-400">Productos</span>
          </h2>
          <div className="h-1.5 w-20 bg-blue-600 mt-4"></div>
        </div>

        {/* Products list */}
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-3 lg:grid-cols-4 px-4 pb-24">
          
          {productsStore.products.map((product) => {
            const inCart = isProductInCart(product.id);
            
            return (
              <div 
                key={product.id}
                className="group relative bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-transparent hover:border-gray-100 flex flex-col"
              >
                {/* Image Area */}
                <div 
                    onClick={()=>router.push(`/product?productId=${product.id}`)}
                    className="relative cursor-pointer overflow-hidden aspect-square"
                >
                    {/* Badge Opcional */}
                    <div className="absolute top-3 left-3 z-10 bg-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest rounded">
                        Elite Gear
                    </div>

                    <div 
                        className="w-full h-full bg-center bg-cover bg-no-repeat transition-transform duration-700 group-hover:scale-110" 
                        style={{ backgroundImage: `url(${product.images[0]})` }}
                    />
                    
                    {/* Overlay al hacer hover */}
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Info Area */}
                <div className="p-4 md:p-6 flex flex-col flex-grow">
                    <div 
                        onClick={()=>router.push(`/product?productId=${product.id}`)}
                        className="cursor-pointer flex-grow"
                    >
                        <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mb-1">Calistenia VZLA</p>
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                            { product.name }
                        </h3>
                        <p className="text-2xl font-black text-black mt-2">
                            ${ product.price }
                        </p>
                    </div>

                    {/* Action Button */}
                    <button 
                        className={`mt-4 w-full md:w-full flex items-center justify-center py-3 rounded-xl font-bold uppercase text-xs tracking-widest transition-all duration-300 
                            ${inCart 
                                ? 'bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-600' 
                                : 'bg-black text-white hover:bg-blue-600 shadow-lg shadow-gray-200 hover:shadow-blue-200'}`}
                        onClick={() => { 
                            inCart ? cartStore.removeProduct(product.id) : cartStore.addProduct(product.id)
                        }}
                    >
                        {inCart ? (
                            <div className="flex items-center justify-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                {/* Texto oculto en mobile, visible en md (tablets/PC) */}
                                <span className="hidden md:inline">Quitar del carrito</span>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                                {/* Texto oculto en mobile, visible en md (tablets/PC) */}
                                <span className="hidden md:inline">Agregar al carrito</span>
                            </div>
                        )}
                    </button>
                </div>
              </div>
            );
          })}

        </div>
      </div> 
    );
}