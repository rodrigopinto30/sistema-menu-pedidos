"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "@/lib/api";
import { Category, getMenu } from "@/services/productServices";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save, Loader2, Edit3, Info } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category_id: "",
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesData, productRes] = await Promise.all([
          getMenu(),
          api.get(`/products/${id}`),
        ]);

        setCategories(categoriesData);
        setFormData({
          name: productRes.data.name,
          price: productRes.data.price.toString(),
          description: productRes.data.description || "",
          category_id: productRes.data.category_id.toString(),
        });
      } catch (error) {
        alert("Could not load product data");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put(`/products/${id}`, {
        ...formData,
        price: parseFloat(formData.price),
      });
      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      alert("Error updating product");
    } finally {
      setSaving(false);
    }
  };

  const labelStyle =
    "text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1";
  const inputStyle =
    "bg-slate-50 border-slate-100 rounded-2xl focus-visible:ring-blue-500/20 focus-visible:border-blue-500 transition-all py-6";

  if (loading)
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">
          Fetching data...
        </p>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/products">
            <Button
              variant="ghost"
              size="icon"
              className="cursor-pointer bg-white border border-slate-100 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all h-11 w-11 shadow-sm"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tighter text-slate-900">
              Edit <span className="text-blue-600">Product</span>
            </h1>
            <p className="text-slate-500 text-sm font-medium italic">
              Updating entry ID: #{id}
            </p>
          </div>
        </div>
        <div className="hidden md:flex bg-blue-50 p-3 rounded-2xl border border-blue-100/50">
          <Edit3 className="h-6 w-6 text-blue-600" />
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-[32px] border border-slate-100 shadow-2xl shadow-slate-200/50 space-y-8 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-600" />

        <div className="space-y-3">
          <Label className={labelStyle}>Product Name</Label>
          <Input
            required
            placeholder="e.g. Classic Cheese Burger"
            className={inputStyle}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <Label className={labelStyle}>Price ($)</Label>
            <Input
              type="number"
              step="0.01"
              required
              placeholder="0.00"
              className={inputStyle}
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
          </div>

          <div className="space-y-3">
            <Label className={labelStyle}>Category</Label>
            <Select
              value={formData.category_id}
              onValueChange={(value: any) =>
                setFormData({ ...formData, category_id: value })
              }
            >
              <SelectTrigger className={cn(inputStyle, "py-3")}>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                {categories.map((cat) => (
                  <SelectItem
                    key={cat.id}
                    value={cat.id.toString()}
                    className="rounded-lg focus:bg-blue-50 focus:text-blue-600 cursor-pointer py-3 font-medium"
                  >
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-3">
          <Label className={labelStyle}>Description</Label>
          <Textarea
            placeholder="Describe the ingredients, size, or special details..."
            className={cn(inputStyle, "min-h-[140px] py-4 resize-none")}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <div className="flex items-center gap-2 text-slate-400 mt-2 px-1">
            <Info className="h-3 w-3" />
            <p className="text-[10px] font-bold uppercase tracking-widest">
              Update information will reflect immediately on the menu
            </p>
          </div>
        </div>

        <div className="pt-4 flex gap-4">
          <Button
            type="submit"
            className="cursor-pointer flex-1 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm uppercase tracking-[0.2em] h-16 rounded-2xl shadow-lg shadow-blue-200 transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-70 disabled:scale-100"
            disabled={saving}
          >
            {saving ? (
              <Loader2 className="animate-spin mr-3 h-5 w-5" />
            ) : (
              <Save className="mr-3 h-5 w-5" />
            )}
            {saving ? "Synchronizing..." : "Apply Changes"}
          </Button>

          <Link href="/admin/products" className="flex-1">
            <Button
              type="button"
              variant="outline"
              className="w-full border-slate-200 text-slate-400 font-black text-sm uppercase tracking-[0.2em] h-16 rounded-2xl hover:bg-slate-50 hover:text-slate-600 transition-all cursor-pointer"
            >
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
