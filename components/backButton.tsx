'use client'
import { useRouter } from "next/navigation";

export function BackButton({to,text}:{ to:string, text: string }) {
    const router = useRouter()

    return (         
      <div className="pt-4 pb-4">
        <div className="inline-block cursor-pointer pl-5 pr-5" onClick={()=>router.push(to)}>
          { text }
        </div>
      </div>
    );
}
