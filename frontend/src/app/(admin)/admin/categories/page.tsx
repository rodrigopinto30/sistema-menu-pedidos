"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Tag, Loader2, Trash2, LayoutGrid, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data);
    } catch (error) {
      toast.error("Error loading categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    setLoading(true);
    try {
      await api.post("/categories", { name: newCategory, is_active: true });
      setNewCategory("");
      fetchCategories();
      toast.success("Category created successfully!");
    } catch (error) {
      toast.error("Error creating category");
    } finally {
      setLoading(false);
    }
  };

  const labelStyle =
    "text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 block ml-1";

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in duration-700">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-blue-600 bg-blue-50 w-fit px-3 py-1 rounded-full border border-blue-100/50">
          <LayoutGrid className="h-3.5 w-3.5" />
          <span className="text-[10px] font-black uppercase tracking-[0.15em]">
            Organization
          </span>
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
          Menu <span className="text-blue-600">Categories</span>
        </h1>
        <p className="text-slate-500 font-medium italic">
          Define the sections of your digital menu.
        </p>
      </div>
      <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-xl shadow-blue-900/5">
        <span className={labelStyle}>Quick Create</span>
        <form onSubmit={handleCreate} className="flex gap-3">
          <Input
            placeholder="New category name (e.g. Drinks, Desserts)"
            className="bg-slate-50 border-slate-100 rounded-full h-12 px-6 focus-visible:ring-blue-500/20 font-medium text-slate-600"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <Button
            type="submit"
            className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-black rounded-full h-12 px-8 shadow-lg shadow-blue-100 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              <>
                <Plus className="h-5 w-5 mr-2" />
                Add Category
              </>
            )}
          </Button>
        </form>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="hover:bg-transparent border-b border-slate-100">
              <TableHead className="py-5 px-8 font-black text-[11px] uppercase tracking-widest text-slate-400">
                Category Name
              </TableHead>
              <TableHead className="py-5 font-black text-[11px] uppercase tracking-widest text-slate-400">
                Visibility
              </TableHead>
              <TableHead className="py-5 px-8 text-right font-black text-[11px] uppercase tracking-widest text-slate-400">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((cat) => (
              <TableRow
                key={cat.id}
                className="group hover:bg-blue-50/30 transition-colors border-b border-slate-50"
              >
                <TableCell className="py-5 px-8">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-white transition-all shadow-sm">
                      <Tag className="h-4 w-4" />
                    </div>
                    <span className="font-black text-slate-800 tracking-tight">
                      {cat.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-5">
                  <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 px-3 py-1 rounded-full font-black text-[9px] uppercase tracking-widest shadow-none">
                    <Check className="h-3 w-3 mr-1" /> Active
                  </Badge>
                </TableCell>
                <TableCell className="py-5 px-8 text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="cursor-pointer text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-full h-10 w-10 transition-all"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {categories.length === 0 && (
          <div className="p-20 text-center">
            <p className="text-slate-400 font-bold italic">
              No categories defined yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
