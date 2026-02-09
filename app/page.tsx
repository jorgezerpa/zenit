'use client'
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

const PAGE = () => {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-linear-to-br from-[#020617] via-[#0a0f1d] to-[#1e1b4b] text-slate-100 font-sans pb-20">
      <div className='cursor-pointer' onClick={()=>router.push("/wc26")}>
        Apuesta aqui mi bro
      </div>
    </div>
  );
};



export default PAGE;