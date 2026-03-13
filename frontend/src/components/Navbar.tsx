"use client";

import { ShoppingCart, UtensilsCrossed } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";

export function Navbar() {
  const totalItems = useCartStore((state: any) => state.getTotalItems());

  return (
    <nav className="sticky top-0 bg-white/80 backdrop-blur-md z-[50] border-b">
      <div className="max-w-6xl mx-auto px-4 h-16 flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center gap-2 text-orange-600 font-black text-2xl tracking-tighter"
        >
          <UtensilsCrossed className="h-7 w-7" />
          FOODIE
        </Link>

        <div className="flex items-center bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-bold transition-transform hover:scale-105">
          <ShoppingCart className="mr-2 h-5 w-5" />
          <span>{totalItems} items</span>
        </div>
      </div>
    </nav>
  );
}
