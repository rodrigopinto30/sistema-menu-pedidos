"use client";

import { useCartStore } from "@/store/useCartStore";
import { ProductCard } from "@/components/ProductCard";
import { CheckoutForm } from "@/components/CheckoutForm";

const MOCK_PRODUCTS = [
  {
    id: 3,
    name: "Pizza Margherita",
    price: 12,
    description: "Tomato, mozzarella, basil",
  },
];

export default function Home() {
  const totalItems = useCartStore((state: any) => state.getTotalItems());

  return (
    <main className="p-8 max-w-6xl mx-auto">
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold">Menu Pedidos</h1>
        <div className="bg-primary text-white px-4 py-2 rounded-full">
          🛒 Cart: {totalItems} items
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <section className="space-y-6">
          <h2 className="text-xl font-semibold">Our Menu</h2>
          <div className="grid gap-4">
            {MOCK_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-semibold">Complete your Order</h2>
          <CheckoutForm onSuccess={() => alert("Order Sent!")} />
        </section>
      </div>
    </main>
  );
}
