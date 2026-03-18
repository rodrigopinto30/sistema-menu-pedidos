"use client";

import { useEffect, useState } from "react";
import { Category, getMenu } from "@/services/productServices";
import { ProductCard } from "@/components/ProductCard";
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
      <main className="p-4 md:p-8">
        <MenuSkeleton />
      </main>
    );

  return (
    <div className="space-y-10 w-full">
      <section>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Our Menu
        </h1>
        <p className="text-gray-500">
          Select your favorites and complete your order.
        </p>
      </section>

      <div className="space-y-16">
        {categories.map((category) => (
          <div key={category.id} className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-orange-500 pl-4">
              {category.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {category.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
