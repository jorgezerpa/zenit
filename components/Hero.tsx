'use client'
import { useState, useEffect } from "react";

export function Hero() {
    const slideDuration = 5000 //ms
    const animationDuration = 500; 
    const heroImages = ["images/homeHero/1.png","images/homeHero/2.png","images/homeHero/3.png"]
    const [currentHeroImage, setCurrentHeroImage] = useState<number>(0)
    const [shouldAnimate, setShouldAnimate] = useState(false)

    useEffect(() => {
        const intervalId = setInterval(() => {
            setShouldAnimate(true);

            const timeoutId = setTimeout(() => {
                setShouldAnimate(false);
            }, animationDuration); 
            
            return () => clearTimeout(timeoutId);
        }, slideDuration);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(()=>{
        if(shouldAnimate){
            setTimeout(()=> setCurrentHeroImage(prev => prev === heroImages.length - 1 ? 0 : prev + 1), animationDuration / 2)
        }
    }, [shouldAnimate, heroImages.length])

    return (      
        <div className="h-screen max-h-[600px] bg-black overflow-hidden relative font-sans">
            {/* Background Image Layer */}
            <div 
                style={{ backgroundImage:`url(${heroImages[currentHeroImage]})` }} 
                className="h-full w-full bg-center bg-cover bg-no-repeat shrink-0 flex justify-center items-center transition-all duration-700"
            >
                {/* Animation Overlay Strips */}
                <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 pointer-events-none">
                    <div className={`h-full w-full origin-left bg-black ${shouldAnimate?"animate-hero2":"scale-x-0"}`} ></div>
                    <div className={`h-full w-full origin-top bg-black ${shouldAnimate?"animate-hero1":"scale-y-0"}`} ></div>
                    <div className={`h-full w-full origin-bottom bg-black ${shouldAnimate?"animate-hero1":"scale-y-0"}`} ></div>
                    <div className={`h-full w-full origin-bottom bg-black ${shouldAnimate?"animate-hero1":"scale-y-0"}`} ></div>
                    <div className={`h-full w-full origin-top bg-black ${shouldAnimate?"animate-hero1":"scale-y-0"}`} ></div>
                    <div className={`h-full w-full origin-right bg-black ${shouldAnimate?"animate-hero2":"scale-x-0"}`} ></div>
                    <div className={`h-full w-full origin-left bg-black ${shouldAnimate?"animate-hero2":"scale-x-0"}`} ></div>
                    <div className={`h-full w-full origin-top bg-black ${shouldAnimate?"animate-hero1":"scale-y-0"}`} ></div>
                    <div className={`h-full w-full origin-right bg-black ${shouldAnimate?"animate-hero2":"scale-x-0"}`} ></div>
                    <div className={`h-full w-full origin-right bg-black ${shouldAnimate?"animate-hero2":"scale-x-0"}`} ></div>
                    <div className={`h-full w-full origin-bottom bg-black ${shouldAnimate?"animate-hero1":"scale-y-0"}`} ></div>
                    <div className={`h-full w-full origin-left bg-black ${shouldAnimate?"animate-hero2":"scale-x-0"}`} ></div>
                </div>
            </div>

            {/* Text Content Overlay */}
            {/* Text Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-start z-10 bg-gradient-to-r from-black/70 via-black/20 to-transparent">
            <div className="px-8 md:px-24 max-w-5xl text-white">
                {/* Línea pequeña */}
                <p className="text-xs md:text-base tracking-[0.3em] mb-3 font-semibold text-blue-500 drop-shadow-sm">
                    {currentHeroImage==0&&"EQUIPAMIENTO DE ALTO RENDIMIENTO"}
                    {currentHeroImage==1&&"DISEÑO Y CALIDAD 100% NACIONAL"}
                    {currentHeroImage==2&&"DISEÑADAS PARA TUS NUEVOS PRs"}
                </p>
                
                {/* Línea grande */}
                <h1 className="text-4xl md:text-7xl font-black uppercase italic leading-none drop-shadow-2xl">
                    {currentHeroImage==0&& 
                        <>
                        Menos excusas, <br />
                        <span className="text-white">más repeticiones.</span>
                        </>
                    }
                    {currentHeroImage==1&& 
                        <>
                        Forjado para <br />
                        <span className="text-white">la Élite.</span>
                        </>
                    }
                    {currentHeroImage==2&& 
                        <>
                        Barras que <br />
                        <span className="text-white">aguantan tu nivel.</span>
                        </>
                    }
                </h1>
                
                {/* Un pequeño botón opcional para mejorar el look */}
                <div className="mt-8">
                    <button className="px-8 py-3 bg-white text-black font-bold uppercase text-sm hover:bg-blue-500 hover:text-white transition-colors">
                        Ver Productos
                    </button>
                </div>
            </div>
        </div>
        </div>    
    );
}