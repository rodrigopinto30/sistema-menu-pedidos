"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Tag, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    const res = await api.get("/categories");
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory) return;
    setLoading(true);
    try {
      await api.post("/categories", { name: newCategory, is_active: true });
      setNewCategory("");
      fetchCategories();
      toast.success("Category created!");
    } catch (error) {
      toast.error("Error creating category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Categories</h1>
        <p className="text-muted-foreground">
          Manage your product menu sections.
        </p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleCreate} className="flex gap-4">
          <Input
            placeholder="New category name (e.g. Drinks, Desserts)"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <Button
            type="submit"
            className="cursor-pointer bg-orange-600 hover:bg-orange-700"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Plus className="h-4 w-4 mr-2" />
            )}
            Add
          </Button>
        </form>
      </Card>

      <div className="border rounded-xl bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead>Category Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((cat) => (
              <TableRow key={cat.id}>
                <TableCell className="font-medium flex items-center gap-2">
                  <Tag className="h-4 w-4 text-orange-500" /> {cat.name}
                </TableCell>
                <TableCell>
                  <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                    Active
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="cursor-pointer text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
