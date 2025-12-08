'use client'
import { useState, useEffect } from "react";
import Image from "next/image";

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
            
            return () => clearTimeout(timeoutId); // Clean up the timeout if the component unmounts quickly
        }, slideDuration);

        // Cleanup for the main interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    useEffect(()=>{
        let timeoutId;
        if(shouldAnimate){
            setTimeout(()=> setCurrentHeroImage(prev => prev==heroImages.length-1?0:prev+1), animationDuration/2)
        }
    }, [shouldAnimate])

    return (      
        <div className="h-screen max-h-[500px] bg-black overflow-hidden">
            <div 
                style={{ backgroundImage:`url(${heroImages[currentHeroImage]})` }} 
                className="h-full w-full bg-center bg-cover bg-no-repeat shrink-0 flex justify-center items-center"
            >
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
    );
}
