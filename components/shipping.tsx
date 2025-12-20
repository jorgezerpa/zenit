'use client'
import Image from "next/image";

export function Shipping() {
  const shippingLogos = [
    { src: '/images/shipping/mrw.png', alt: 'MRW Venezuela' },
    { src: '/images/shipping/zoom.png', alt: 'Zoom Envíos' }
  ];

  return (         
    <section className="bg-white py-16 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Texto Informativo */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-black text-black uppercase tracking-tight">
              Envíos a nivel <span className="text-blue-600">nacional</span>
            </h2>
            <p className="text-gray-500 text-lg mt-2 font-medium">
              Obtén tu equipo de entrenamiento donde sea que estés.
            </p>
          </div>

          {/* Contenedor de Logos */}
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {shippingLogos.map((logo, index) => (
              <div 
                key={index} 
                className="grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-105"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={140}
                  height={40}
                  className="object-contain"
                  priority
                />
              </div>
            ))}
          </div>

        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-gray-100 pt-8">            
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 text-sm font-bold uppercase tracking-wider text-gray-400 text-center md:text-left">
                <span className="text-blue-600 text-2xl md:text-xl">✓</span>
                <span>Embalaje Reforzado</span>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 text-sm font-bold uppercase tracking-wider text-gray-400 text-center md:text-left border-y md:border-y-0 md:border-x border-gray-50 py-4 md:py-0">
                <span className="text-blue-600 text-2xl md:text-xl">✓</span>
                <span>Cobertura Nacional Garantizada</span>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 text-sm font-bold uppercase tracking-wider text-gray-400 text-center md:text-left">
                <span className="text-blue-600 text-2xl md:text-xl">✓</span>
                <span>Tracking en Tiempo Real</span>
            </div>
        </div>


      </div>
    </section>
  );
}