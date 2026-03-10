"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Category, getMenu } from "@/services/productServices";
import api from "@/lib/api";
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
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category_id: "",
  });

  useEffect(() => {
    getMenu().then(setCategories).catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category_id) return alert("Please select a category");

    setLoading(true);
    try {
      await api.post("/products", {
        ...formData,
        price: parseFloat(formData.price),
        is_available: true,
      });

      router.push("/admin/products");
      router.refresh();
    } catch (error: any) {
      alert(
        "Error saving product: " +
          (error.response?.data?.message || "Check connection"),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/products">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">New Product</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl border shadow-sm space-y-6"
      >
        <div className="space-y-2">
          <Label>Product Name</Label>
          <Input
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Price ($)</Label>
            <Input
              type="number"
              step="0.01"
              required
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <Select
              onValueChange={(value: any) =>
                setFormData({ ...formData, category_id: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id.toString()}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            className="min-h-[100px]"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-700 h-12"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="animate-spin mr-2" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          {loading ? "Creating..." : "Save Product"}
        </Button>
      </form>
    </div>
  );
}
