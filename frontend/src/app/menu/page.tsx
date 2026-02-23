import { getMenu } from "@/lib/api";
import { ProductCard } from "@/components/menu/ProductCard";

export default async function MenuPage() {
  const categories = await getMenu();

  return (
    <div className="container mx-auto py-10 px-4">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
          Nuestro Menú
        </h1>
        <p className="text-xl text-muted-foreground">
          Calidad artesanal en cada bocado.
        </p>
      </header>

      {categories.map((category: any) => (
        <section
          key={category.id}
          className="mb-16"
          aria-labelledby={`cat-${category.id}`}
        >
          <h2
            id={`cat-${category.id}`}
            className="text-2xl font-semibold mb-6 pb-2 border-b uppercase tracking-wider text-orange-600"
          >
            {category.name}
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {category.products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
