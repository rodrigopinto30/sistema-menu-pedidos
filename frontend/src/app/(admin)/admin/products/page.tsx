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
import {
  Edit2,
  Trash2,
  Search,
  Plus,
  Loader2,
  Package,
  LayoutGrid,
} from "lucide-react";
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
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">
          Loading Inventory...
        </p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-600 bg-blue-50 w-fit px-3 py-1 rounded-full border border-blue-100/50 mb-2">
            <Package className="h-3.5 w-3.5" />
            <span className="text-[10px] font-black uppercase tracking-[0.15em]">
              Inventory System
            </span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-slate-900">
            Product <span className="text-blue-600">Catalog</span>
          </h1>
          <p className="text-slate-500 font-medium">
            Manage your store's inventory, pricing, and stock status.
          </p>
        </div>
        <Link href="/admin/products/new">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-black px-6 py-6 rounded-2xl shadow-lg shadow-blue-200 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer">
            <Plus className="mr-2 h-5 w-5" /> Add New Product
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-3 bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm focus-within:ring-2 focus-within:ring-blue-100 transition-all">
        <Search className="h-5 w-5 text-slate-400 ml-2" />
        <Input
          placeholder="Search by product name..."
          className="border-none shadow-none focus-visible:ring-0 font-medium text-slate-600 placeholder:text-slate-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="hover:bg-transparent border-b border-slate-100">
              <TableHead className="py-5 px-6 font-black text-[11px] uppercase tracking-widest text-slate-400">
                Product Details
              </TableHead>
              <TableHead className="py-5 font-black text-[11px] uppercase tracking-widest text-slate-400">
                Category
              </TableHead>
              <TableHead className="py-5 font-black text-[11px] uppercase tracking-widest text-slate-400">
                Price
              </TableHead>
              <TableHead className="py-5 font-black text-[11px] uppercase tracking-widest text-slate-400">
                Availability
              </TableHead>
              <TableHead className="py-5 px-6 text-right font-black text-[11px] uppercase tracking-widest text-slate-400">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product: any) => (
              <TableRow
                key={product.id}
                className="group border-b border-slate-50 hover:bg-blue-50/30 transition-colors"
              >
                <TableCell className="py-5 px-6">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-blue-600 transition-all border border-transparent group-hover:border-blue-100 font-black shadow-sm">
                      {product.name.charAt(0)}
                    </div>
                    <span className="font-black text-slate-800 tracking-tight">
                      {product.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-5">
                  <Badge
                    variant="secondary"
                    className="bg-slate-100 text-slate-500 hover:bg-slate-200 border-none px-3 py-1 rounded-lg font-bold text-[10px] uppercase tracking-tighter"
                  >
                    {product.category?.name || "Uncategorized"}
                  </Badge>
                </TableCell>
                <TableCell className="py-5">
                  <span className="font-black text-slate-900 tracking-tighter text-base">
                    ${product.price}
                  </span>
                </TableCell>
                <TableCell className="py-5">
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={product.is_available}
                      onCheckedChange={() => toggleAvailability(product.id)}
                      className="cursor-pointer data-[state=checked]:bg-blue-600"
                    />
                    <span
                      className={cn(
                        "text-[10px] font-black uppercase tracking-widest",
                        product.is_available
                          ? "text-blue-600"
                          : "text-slate-300",
                      )}
                    >
                      {product.is_available ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-5 px-6 text-right">
                  <div className="flex justify-end items-center gap-1">
                    <Link href={`/admin/products/${product.id}/edit`}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 text-slate-400 hover:text-blue-600 hover:bg-white hover:border-blue-100 border border-transparent rounded-xl transition-all cursor-pointer shadow-none hover:shadow-sm"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
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

        {filteredProducts.length === 0 && (
          <div className="p-20 text-center space-y-4">
            <div className="bg-slate-50 h-16 w-16 rounded-3xl flex items-center justify-center mx-auto">
              <LayoutGrid className="h-8 w-8 text-slate-200" />
            </div>
            <p className="text-slate-400 font-bold text-sm tracking-tight">
              No products found matches your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
