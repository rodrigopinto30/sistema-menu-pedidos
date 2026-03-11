"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Plus, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, latest: [] });

  useEffect(() => {
    api.get("/products").then((res: any) => {
      const data = res.data;
      setStats({
        total: data.length,
        latest: data.slice(0, 5),
      });
    });
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-orange-50 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">
              Total Products
            </CardTitle>
            <Package className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-900">
              {stats.total}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Clock className="h-5 w-5 text-gray-500" /> Recently Added
            </h2>
            <Link href="/admin/products">
              <Button variant="link" className="text-orange-600">
                View All
              </Button>
            </Link>
          </div>
          <div className="divide-y">
            {stats.latest.map((product: any) => (
              <div
                key={product.id}
                className="py-3 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium text-gray-800">{product.name}</p>
                  <p className="text-xs text-gray-500">
                    {product.category?.name}
                  </p>
                </div>
                <span className="font-bold text-gray-700">
                  ${product.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
