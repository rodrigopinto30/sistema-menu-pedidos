"use client";

import { useEffect, useState } from "react";
import { Category, getMenu } from "@/services/productServices";
import { ProductCard } from "@/components/ProductCard";
import { CheckoutForm } from "@/components/CheckoutForm";
import { MenuSkeleton } from "@/components/menu/MenuSkeleton";

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMenu()
      .then(setCategories)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <main className="p-4 md:p-8 max-w-6xl mx-auto">
        <MenuSkeleton />
      </main>
    );

  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Nuestro Menú
        </h1>
        <p className="text-gray-500">
          Selecciona tus favoritos y completa tu pedido.
        </p>
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <section className="xl:col-span-2 space-y-12">
          {categories.map((category) => (
            <div key={category.id} className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-orange-500 pl-4">
                {category.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {category.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ))}
        </section>

        <aside className="hidden xl:block">
          <div className="sticky top-24 bg-white p-6 rounded-2xl border shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Tu Pedido</h2>
            <CheckoutForm categories={categories} onSuccess={() => {}} />
          </div>
        </aside>
      </div>
    </div>
  );
}
