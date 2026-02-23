import { getMenu } from "@/lib/api";

export default async function MenuPage() {
  const categories = await getMenu();

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Nuestro Menú</h1>

      {categories.map((category: any) => (
        <section key={category.id} className="mb-10">
          <h2 className="text-2xl font-semibold border-b-2 border-orange-500 pb-2 mb-4">
            {category.name}
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            {category.products.map((product: any) => (
              <div
                key={product.id}
                className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{product.name}</h3>
                    <p className="text-gray-600 text-sm">
                      {product.description}
                    </p>
                  </div>
                  <span className="font-mono text-orange-600">
                    ${product.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
