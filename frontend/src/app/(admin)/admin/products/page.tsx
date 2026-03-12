"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Edit2, Trash2, Search, Plus, Loader2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ProductsAdmin() {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/products")
      .then((res: any) => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = products.filter((p: any) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const toggleAvailability = async (id: number) => {
    try {
      const response = await api.patch(`/products/${id}/toggle`);
      setProducts((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, is_available: response.data.is_available } : p,
        ),
      );
    } catch (error) {
      console.error("Error updating availability", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await api.delete(`/products/${id}`);
        setProducts(products.filter((p: any) => p.id !== id));
      } catch (error) {
        console.error("Error deleting product", error);
      }
    }
  };

  if (loading)
    return (
      <div className="p-8 flex justify-center">
        <Loader2 className="animate-spin text-orange-600" />
      </div>
    );

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Product Inventory
          </h1>
          <p className="text-muted-foreground">
            Manage your catalog, prices and availability.
          </p>
        </div>
        <Link href="/admin/products/new">
          <Button className="bg-orange-600 hover:bg-orange-700 shadow-sm cursor-pointer">
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </Link>
      </div>

      <div className="flex items-center space-x-2 bg-white p-2 rounded-lg border shadow-sm">
        <Search className="h-4 w-4 text-gray-400 ml-2" />
        <Input
          placeholder="Search products..."
          className="border-none shadow-none focus-visible:ring-0"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="border rounded-xl bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="font-bold text-gray-700">Name</TableHead>
              <TableHead className="font-bold text-gray-700">
                Category
              </TableHead>
              <TableHead className="font-bold text-gray-700">Price</TableHead>
              <TableHead className="font-bold text-gray-700">Status</TableHead>
              <TableHead className="text-right font-bold text-gray-700">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product: any) => (
              <TableRow
                key={product.id}
                className="hover:bg-gray-50/50 transition-colors"
              >
                <TableCell className="font-medium text-gray-900">
                  {product.name}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="font-normal">
                    {product.category?.name || "Uncategorized"}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono font-semibold">
                  ${product.price}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={product.is_available}
                      onCheckedChange={() => toggleAvailability(product.id)}
                      className="cursor-pointer data-[state=checked]:bg-green-500"
                    />
                    <span
                      className={cn(
                        "text-xs font-medium",
                        product.is_available
                          ? "text-green-600"
                          : "text-gray-400",
                      )}
                    >
                      {product.is_available ? "Available" : "Sold Out"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end items-center gap-2">
                    <Link href={`/admin/products/${product.id}/edit`}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 text-blue-600 hover:bg-blue-50 cursor-pointer"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 text-red-500 hover:bg-red-50 cursor-pointer"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
