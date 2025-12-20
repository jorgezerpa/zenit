'use client'
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { TopBar } from "@/components/topbar";
import { useCartStore } from "@/store/cart";
import { useProductsStore } from "@/store/products";
import { BackButton } from "@/components/backButton";

function ProductPageContent() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId') as string;

  const cartStore = useCartStore();
  const productstore = useProductsStore();

  const [selectedImage, setSelectedImage] = useState<number>(0);
  
  const product = productstore.products.find(p => p.id === productId) || null;
  const inCart = cartStore.products.some(p => p.id === productId);

  if (!productId || !product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen italic text-gray-500">
        <p>El producto no está disponible.</p>
        <BackButton to="/" text="Volver al catálogo" />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      <TopBar />
      <div className="h-[81px]" />
      
      <div className="max-w-7xl mx-auto px-4 py-4">
        <BackButton to="/" text="Volver al catálogo" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* SECCIÓN DE IMÁGENES */}
          <div className="w-full lg:w-3/5 flex flex-col-reverse md:flex-row gap-4">
            
            {/* Selector de Miniaturas */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto shrink-0 md:w-20 pb-2 md:pb-0 max-h-[500px] 
                [&::-webkit-scrollbar]:w-[3px] 
                [&::-webkit-scrollbar]:h-[3px]
                [&::-webkit-scrollbar-track]:bg-transparent
                [&::-webkit-scrollbar-thumb]:bg-gray-300
                [&::-webkit-scrollbar-thumb]:rounded-full">
              
              {product.images.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setSelectedImage(i)}
                  className={`shrink-0 relative min-w-[70px] h-[70px] md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all 
                    ${i === selectedImage ? "border-blue-600 shadow-md scale-95" : "border-gray-100 hover:border-gray-300"}`}
                >
                  <div 
                    className="w-full h-full bg-center bg-cover" 
                    style={{ backgroundImage: `url(${img})` }}
                  />
                </button>
              ))}
            </div>

            {/* Imagen Principal */}
            <div className="flex-1 bg-gray-50 rounded-2xl overflow-hidden h-[400px] md:h-[600px] border border-gray-100 relative group">
              <div 
                className="w-full h-full min-h-[500px] bg-center bg-contain bg-no-repeat transition-transform duration-500 group-hover:scale-105" 
                style={{ backgroundImage: `url(${product.images[selectedImage]})` }}
              />
              {/* <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-600 border border-gray-100">
                Calidad Industrial
              </div> */}
            </div>
          </div>

          {/* SECCIÓN DE DESCRIPCIÓN */}
          <div className="w-full lg:w-2/5 flex flex-col">
            <div className="border-b border-gray-100 pb-6">
              {/* <span className="text-blue-600 font-bold text-xs uppercase tracking-widest">Street Workout Venezuela</span> */}
              <h1 className="text-4xl md:text-5xl font-black text-black uppercase mt-2 leading-none">
                { product.name }
              </h1>
            </div>

            <div className="mt-6">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-black text-black">${product.price}</span>
                <span className="text-gray-400 text-sm font-medium italic">Ref. BCV del día</span>
              </div>
              
              <div className="mt-8 space-y-4">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {/* Aquí puedes meter una descripción real si el tipo Product la tiene */}
                    Diseñado para atletas de alto rendimiento. Acero reforzado con acabado en pintura electrostática para un agarre superior y resistencia al intemperie.
                  </p>
                </div>

                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-blue-600">💪</span> Soporta hasta 250kg de peso/lastre.
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-blue-600">📍</span> Envíos asegurados por MRW / Zoom.
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-blue-600">🇻🇪</span> Hecho en Venezuela para la élite.
                  </li>
                </ul>
              </div>
            </div>

            {/* BOTÓN DE ACCIÓN */}
            <div className="mt-auto pt-10">
              <button 
                className={`text-sm sm:text-base w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-xl flex items-center justify-center gap-3
                  ${inCart 
                    ? 'bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-600 shadow-none' 
                    : 'bg-black text-white hover:bg-blue-600 hover:shadow-blue-200'}`}
                onClick={() => inCart ? cartStore.removeProduct(productId) : cartStore.addProduct(productId)}
              >
                {inCart ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Eliminar del carrito
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Agregar al pedido
                  </>
                )}
              </button>
              
              {/* <p className="text-center text-gray-400 text-[10px] mt-4 uppercase tracking-widest font-bold">
                Pago seguro vía Pago Móvil o Transferencia
              </p> */}
            </div>
          </div>

        </div>
      </div> 
    </div>      
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="h-screen flex items-center justify-center uppercase tracking-widest font-black">
        Cargando producto...
      </div>
    }>
      <ProductPageContent />
    </Suspense>
  );
}