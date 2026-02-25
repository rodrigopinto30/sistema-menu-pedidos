"use client";

import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
}

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state: any) => state.addItem);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">
          {product.description || "Fresh and delicious."}
        </p>
        <p className="text-lg font-bold mt-2">${product.price}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => addItem(product.id)}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
