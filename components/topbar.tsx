'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function TopBar() {
    const router = useRouter()

    return (         
      <div className="bg-black h-[100px] p-5 flex items-center">
        <div className="w-full flex justify-center items-center">
            <div className="w-full"></div>
            <div className="w-full"></div>
            <div className="w-full flex justify-end items-center cursor-pointer">
                <p className="text-white" onClick={()=>router.push("/cart")}>cart</p>
            </div>
        </div>
      </div>
    );
}
