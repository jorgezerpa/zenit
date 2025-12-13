'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Hero } from "@/components/Hero";
import { Shipping } from "@/components/shipping";
import { TopBar } from "@/components/topbar";
import { useProductsStore } from "@/store/products";
import { BackButton } from "@/components/backButton";

export default function ThankYou() {
  const router = useRouter()
  const productsStore = useProductsStore()

  return (
    <div>
      <TopBar />
      <BackButton to="/" text="Ver mas productos" />
      <div>gracias por tu compra brou :)</div>    


    </div>      
  );
}
