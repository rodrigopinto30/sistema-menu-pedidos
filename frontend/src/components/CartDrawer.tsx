"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { CheckoutForm } from "@/components/CheckoutForm";
import { useEffect, useState } from "react";
import { Category, getMenu } from "@/services/productServices";

export function CartDrawer() {
  const totalItems = useCartStore((state: any) => state.getTotalItems());
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getMenu().then(setCategories).catch(console.error);
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="cursor-pointer flex items-center bg-orange-500 text-white px-4 py-2 rounded-full font-bold shadow-sm shadow-orange-200 transition-transform hover:scale-105 active:scale-95 ml-2 outline-none">
          <ShoppingCart className="mr-2 h-4 w-4" />
          <span className="text-sm">{totalItems}</span>
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-2xl font-bold flex items-center gap-2">
            <ShoppingCart className="h-6 w-6 text-orange-600" />
            Your Shopping Cart
          </SheetTitle>
        </SheetHeader>

        <CheckoutForm
          categories={categories}
          onSuccess={() => setOpen(false)}
        />
      </SheetContent>
    </Sheet>
  );
}
