"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Clock, BarChart3 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, latest: [], chartData: [] });

  useEffect(() => {
    api.get("/products").then((res: any) => {
      const data = res.data;

      const categoryMap: Record<string, number> = {};
      data.forEach((p: any) => {
        const catName = p.category?.name || "Uncategorized";
        categoryMap[catName] = (categoryMap[catName] || 0) + 1;
      });

      const chartData = Object.keys(categoryMap).map((name) => ({
        name,
        count: categoryMap[name],
      }));

      setStats({
        total: data.length,
        latest: data.slice(0, 5),
        chartData: chartData as any,
      });
    });
  }, []);

  const COLORS = ["#f97316", "#fb923c", "#fdba74", "#fed7aa"];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Admin Dashboard
          </h1>
          <p className="text-gray-500">
            Bienvenido al panel de control de tu tienda.
          </p>
        </div>
      </div>

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
        <Card className="p-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-orange-500" /> Inventory by
              Category
            </CardTitle>
          </CardHeader>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.chartData}>
                <XAxis
                  dataKey="name"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: "#fff7ed" }}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #fed7aa",
                  }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {stats.chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

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
