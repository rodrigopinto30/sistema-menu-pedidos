"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Package,
  Clock,
  BarChart3,
  PieChart as PieChartIcon,
} from "lucide-react";
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
  PieChart,
  Pie,
} from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    latest: [],
    countData: [],
    priceData: [],
  });

  useEffect(() => {
    api.get("/products").then((res: any) => {
      const data = res.data;

      const categoryMetrics: Record<
        string,
        { count: number; totalRef: number }
      > = {};

      data.forEach((p: any) => {
        const catName = p.category?.name || "Uncategorized";
        if (!categoryMetrics[catName]) {
          categoryMetrics[catName] = { count: 0, totalRef: 0 };
        }
        categoryMetrics[catName].count += 1;
        categoryMetrics[catName].totalRef += Number(p.price);
      });

      const countData = Object.keys(categoryMetrics).map((name) => ({
        name,
        value: categoryMetrics[name].count,
      }));

      const priceData = Object.keys(categoryMetrics).map((name) => ({
        name,
        avgPrice: Math.round(
          categoryMetrics[name].totalRef / categoryMetrics[name].count,
        ),
      }));

      setStats({
        total: data.length,
        latest: data.slice(0, 5),
        countData: countData as any,
        priceData: priceData as any,
      });
    });
  }, []);

  const COLORS = ["#f97316", "#fb923c", "#fdba74", "#fed7aa", "#ffedd5"];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 font-mono italic">
          ADMIN_STATS
        </h1>
        <p className="text-gray-500">Visualización de métricas e inventario.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-orange-50 border-orange-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-orange-800">
              Total Inventory
            </CardTitle>
            <Package className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-orange-900">
              {stats.total}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <PieChartIcon className="h-5 w-5 text-orange-500" /> Products per
              Category
            </CardTitle>
          </CardHeader>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.countData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {stats.countData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-orange-500" /> Avg Price ($)
            </CardTitle>
          </CardHeader>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.priceData}>
                <XAxis
                  dataKey="name"
                  fontSize={10}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip cursor={{ fill: "#fff7ed" }} />
                <Bar dataKey="avgPrice" fill="#f97316" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Clock className="h-5 w-5 text-gray-500" /> Recent Activity
          </h2>
          <Link href="/admin/products">
            <Button
              variant="outline"
              size="sm"
              className="border-orange-200 text-orange-700 hover:bg-orange-50"
            >
              Manage Products
            </Button>
          </Link>
        </div>
        <div className="divide-y">
          {stats.latest.map((product: any) => (
            <div
              key={product.id}
              className="py-4 flex justify-between items-center group hover:bg-gray-50 transition-colors px-2 rounded-lg"
            >
              <div>
                <p className="font-semibold text-gray-800">{product.name}</p>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-tighter">
                  {product.category?.name || "No Cat"}
                </p>
              </div>
              <span className="font-mono font-bold text-lg text-gray-900">
                ${product.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
