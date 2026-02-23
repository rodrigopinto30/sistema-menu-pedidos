import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="h-full">
      <Card className="flex flex-col h-full hover:border-orange-500 transition-colors duration-300">
        <CardHeader className="space-y-1">
          <div className="flex justify-between items-center gap-2">
            <CardTitle className="text-xl font-bold line-clamp-1">
              {product.name}
            </CardTitle>
            <Badge
              variant="outline"
              className="text-orange-600 border-orange-200"
            >
              ${Number(product.price).toFixed(2)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {product.description}
          </p>
        </CardContent>
        <CardFooter>
          <Button className="cursor-pointer w-full bg-orange-600 hover:bg-orange-700 font-semibold uppercase tracking-wide">
            Agregar
          </Button>
        </CardFooter>
      </Card>
    </article>
  );
}
