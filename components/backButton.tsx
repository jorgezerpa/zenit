'use client'
import { useRouter } from "next/navigation";

export function BackButton({to,text}:{ to:string, text: string }) {
    const router = useRouter()

    return (         
      <div className="pt-4 pb-4">
        {/* Container for the Icon and Text */}
        <div 
          className="inline-flex items-center cursor-pointer pl-5 pr-5 text-gray-700 hover:text-black transition-colors" 
          onClick={()=>router.push(to)}
        >
          {/* SVG Left Arrow Icon */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          
          {/* Text remains visible next to the icon */}
          { text }
        </div>
      </div>
    );
}