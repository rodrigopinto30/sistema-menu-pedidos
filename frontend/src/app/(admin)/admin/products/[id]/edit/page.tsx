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
import {
  ArrowLeft,
  Save,
  Loader2,
  Edit3,
  Info,
  ImageIcon,
  X,
} from "lucide-react";
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
    image_url: "",
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
          image_url: productRes.data.image_url || "",
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
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4 animate-in fade-in duration-500">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest">
          Loading product details...
        </p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex items-center justify-between px-2">
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
            <h1 className="text-3xl font-black tracking-tighter text-slate-900 leading-none">
              Edit <span className="text-blue-600">Product</span>
            </h1>
            <p className="text-slate-500 text-sm font-medium italic">
              Record ID: #{id}
            </p>
          </div>
        </div>
        <div className="hidden md:flex bg-blue-50 p-3 rounded-2xl border border-blue-100/50">
          <Edit3 className="h-6 w-6 text-blue-600" />
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        <div className="lg:col-span-2 bg-white p-8 md:p-10 rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-200/50 space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-600" />

          <div className="space-y-3">
            <Label className={labelStyle}>Product Name</Label>
            <Input
              required
              className={inputStyle}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label className={labelStyle}>Price ($)</Label>
              <Input
                type="number"
                step="0.01"
                required
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
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                  {categories.map((cat) => (
                    <SelectItem
                      key={cat.id}
                      value={cat.id.toString()}
                      className="rounded-lg cursor-pointer py-3 font-medium"
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
              className={cn(inputStyle, "min-h-[120px] py-4 resize-none")}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="space-y-3">
            <Label className={labelStyle}>Image URL</Label>
            <div className="relative">
              <Input
                placeholder="Update image link..."
                className={cn(inputStyle, "pr-12")}
                value={formData.image_url}
                onChange={(e) =>
                  setFormData({ ...formData, image_url: e.target.value })
                }
              />
              <ImageIcon className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/40 space-y-4 sticky top-8">
            <Label className={labelStyle}>Live Preview</Label>

            <div className="relative aspect-square w-full rounded-[32px] overflow-hidden bg-slate-100 border-2 border-slate-50 flex items-center justify-center group">
              {formData.image_url ? (
                <>
                  <img
                    src={formData.image_url}
                    alt="Preview"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) =>
                      (e.currentTarget.src =
                        "https://placehold.co/600x600?text=Image+Not+Found")
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, image_url: "" })}
                    className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-full text-rose-500 shadow-sm hover:bg-rose-50 transition-all cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </>
              ) : (
                <div className="text-center opacity-30">
                  <ImageIcon className="h-10 w-10 mx-auto mb-2" />
                  <p className="text-[10px] font-black uppercase tracking-widest">
                    Placeholder
                  </p>
                </div>
              )}
            </div>

            <div className="pt-4 space-y-3">
              <Button
                type="submit"
                className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-sm uppercase tracking-[0.2em] h-16 rounded-2xl shadow-lg shadow-blue-200 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70"
                disabled={saving}
              >
                {saving ? (
                  <Loader2 className="animate-spin mr-3 h-5 w-5" />
                ) : (
                  <Save className="mr-3 h-5 w-5" />
                )}
                {saving ? "Updating..." : "Save Changes"}
              </Button>

              <Link href="/admin/products" className="block">
                <Button
                  variant="ghost"
                  className="w-full text-slate-400 font-bold text-[10px] uppercase tracking-widest h-10 hover:bg-slate-50 rounded-xl cursor-pointer"
                >
                  Discard Changes
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
