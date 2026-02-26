"use client";

import { useCartStore } from "@/store/useCartStore";
import { Category } from "@/services/productServices";
import { Button } from "./ui/button";

interface CartSummaryProps {
  categories: Category[];
}

export function CartSummary({ categories }: CartSummaryProps) {
  const { items, removeItem } = useCartStore();

  const getProductDetails = (id: number) => {
    if (!categories || !Array.isArray(categories)) return null;
    for (const cat of categories) {
      const product = cat.products.find((p) => p.id === id);
      if (product) return product;
    }
    return null;
  };

  const total = items.reduce((acc: any, item: any) => {
    const details = getProductDetails(item.product_id);
    return acc + (details?.price || 0) * item.quantity;
  }, 0);

  if (items.length === 0)
    return <p className="text-gray-400 italic">Your cart is empty.</p>;

  return (
    <div className="space-y-4 border-b pb-4 mb-6">
      <h3
        className="font-semibold text-lg text-gray-700"
        onClick={() => console.log(categories)}
      >
        Order Summary
      </h3>
      <ul className="space-y-2">
        {items.map((item: any) => {
          const details = getProductDetails(item.product_id);
          return (
            <li
              key={item.product_id}
              className="flex justify-between items-center text-sm"
            >
              <div className="flex flex-col">
                <span className="font-medium">
                  {details?.name || "Product"}
                </span>
                <span className="text-gray-500">
                  Qty: {item.quantity} x ${details?.price}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold">
                  ${(details?.price || 0) * item.quantity}
                </span>
                <Button
                  onClick={() => removeItem(item.product_id)}
                  className="text-red-500 text-xs cursor-pointer hover:text-white hover:bg-red-500 hover:border-white"
                  variant="outline"
                >
                  Remove
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="flex justify-between items-center pt-2 border-t font-bold text-lg">
        <span>Total:</span>
        <span className="text-orange-600">${total}</span>
      </div>
    </div>
  );
}
