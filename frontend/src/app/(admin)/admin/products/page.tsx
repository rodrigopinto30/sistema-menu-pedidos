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
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4 animate-pulse">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.2em]">
          Syncing Catalog...
        </p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-600 bg-blue-50 w-fit px-3 py-1 rounded-full border border-blue-100/50 mb-2">
            <Package className="h-3.5 w-3.5" />
            <span className="text-[10px] font-black uppercase tracking-[0.15em]">
              Inventory v2.0
            </span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 leading-none">
            Product <span className="text-blue-600">Inventory</span>
          </h1>
          <p className="text-slate-500 font-medium text-sm">
            Control your stock levels, visibility, and menu details.
          </p>
        </div>
        <Link href="/admin/products/new">
          <Button className="w-full md:w-auto bg-slate-900 hover:bg-blue-600 text-white font-black px-8 h-14 rounded-2xl shadow-xl shadow-slate-200 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer flex items-center gap-2">
            <Plus className="h-5 w-5" /> Add New Item
          </Button>
        </Link>
      </div>

      <div className="relative group">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
        <Input
          placeholder="Search by product name..."
          className="h-16 pl-14 pr-6 rounded-[24px] bg-white border-slate-100 shadow-sm focus-visible:ring-blue-100 font-medium text-slate-700 placeholder:text-slate-400 transition-all text-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-200/40 overflow-hidden">
        <div className="hidden md:block overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="hover:bg-transparent border-b border-slate-100">
                <TableHead className="py-6 px-8 font-black text-[11px] uppercase tracking-widest text-slate-400">
                  Preview & Name
                </TableHead>
                <TableHead className="py-6 font-black text-[11px] uppercase tracking-widest text-slate-400">
                  Category
                </TableHead>
                <TableHead className="py-6 font-black text-[11px] uppercase tracking-widest text-slate-400">
                  Price
                </TableHead>
                <TableHead className="py-6 font-black text-[11px] uppercase tracking-widest text-slate-400">
                  Status
                </TableHead>
                <TableHead className="py-6 px-8 text-right font-black text-[11px] uppercase tracking-widest text-slate-400">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product: any) => (
                <TableRow
                  key={product.id}
                  className="group border-b border-slate-50 hover:bg-blue-50/20 transition-colors"
                >
                  <TableCell className="py-5 px-8">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                        <img
                          src={
                            product.image_url ||
                            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=100"
                          }
                          alt={product.name}
                          className="h-full w-full object-cover group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-black text-slate-800 tracking-tight leading-none mb-1">
                          {product.name}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          ID: #{product.id.toString().padStart(4, "0")}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-5">
                    <Badge
                      variant="secondary"
                      className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-none px-3 py-1 rounded-lg font-black text-[9px] uppercase tracking-tighter"
                    >
                      {product.category?.name || "General"}
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
                        className="cursor-pointer data-[state=checked]:bg-blue-600 scale-90"
                      />
                      <span
                        className={cn(
                          "text-[10px] font-black uppercase tracking-widest transition-colors",
                          product.is_available
                            ? "text-blue-600"
                            : "text-slate-300",
                        )}
                      >
                        {product.is_available ? "Active" : "Paused"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-5 px-8 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/products/${product.id}/edit`}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10 text-slate-400 hover:text-blue-600 hover:bg-white border border-transparent hover:border-blue-100 rounded-xl transition-all cursor-pointer"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer"
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

        <div className="md:hidden grid grid-cols-1 divide-y divide-slate-100">
          {filteredProducts.map((product: any) => (
            <div key={product.id} className="p-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="h-20 w-20 rounded-[24px] overflow-hidden bg-slate-100 border border-slate-200">
                  <img
                    src={
                      product.image_url ||
                      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=200"
                    }
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between">
                    <h4 className="font-black text-slate-900 tracking-tight">
                      {product.name}
                    </h4>
                    <span className="font-black text-blue-600">
                      ${product.price}
                    </span>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-slate-100 text-slate-500 border-none px-2 py-0.5 rounded-md font-bold text-[9px] uppercase tracking-tighter"
                  >
                    {product.category?.name || "General"}
                  </Badge>
                  <div className="flex items-center gap-2 pt-2">
                    <Switch
                      checked={product.is_available}
                      onCheckedChange={() => toggleAvailability(product.id)}
                      className="cursor-pointer data-[state=checked]:bg-blue-600 scale-75"
                    />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      {product.is_available ? "Available" : "Hidden"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Link
                  href={`/admin/products/${product.id}/edit`}
                  className="flex-1"
                >
                  <Button className="w-full bg-slate-50 text-slate-600 font-bold rounded-xl border-none hover:bg-blue-50 hover:text-blue-600 shadow-none cursor-pointer">
                    <Edit2 className="h-3 w-3 mr-2" /> Edit Info
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 text-rose-500 bg-rose-50 rounded-xl cursor-pointer"
                  onClick={() => handleDelete(product.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
