"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import {
  Package,
  Clock,
  BarChart3,
  PieChart as PieChartIcon,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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

  const COLORS = ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe"];

  const cardBase =
    "bg-white rounded-[32px] border border-slate-100 shadow-sm shadow-blue-900/5 overflow-hidden transition-all duration-500 animate-in fade-in zoom-in-95";

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-700">
      <header className="space-y-2">
        <div className="flex items-center gap-2 text-blue-600 bg-blue-50 w-fit px-3 py-1 rounded-full border border-blue-100/50">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span className="text-[10px] font-black uppercase tracking-[0.15em]">
            Analytics
          </span>
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
          Admin <span className="text-blue-600">Dashboard</span>
        </h1>
        <p className="text-slate-500 font-medium">
          Visualizing inventory metrics and real-time activity.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div
          className={cn(
            cardBase,
            "p-6 bg-blue-600 border-none group hover:scale-[1.02]",
          )}
        >
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-blue-100 uppercase tracking-widest">
                Total Inventory
              </p>
              <h3 className="text-4xl font-black text-white tracking-tighter">
                {stats.total}
              </h3>
            </div>
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
              <Package className="h-5 w-5 text-white" />
            </div>
          </div>
          <p className="text-blue-200 text-xs font-bold mt-4 flex items-center gap-1">
            <ArrowUpRight className="h-3 w-3" /> Live data from API
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className={cn(cardBase, "p-8")}>
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-blue-50 p-2 rounded-xl">
              <PieChartIcon className="h-5 w-5 text-blue-600" />
            </div>
            <h2 className="text-lg font-black text-slate-800 tracking-tight">
              Products per Category
            </h2>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.countData}
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {stats.countData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "16px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={cn(cardBase, "p-8")}>
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-blue-50 p-2 rounded-xl">
              <BarChart3 className="h-5 w-5 text-blue-600" />
            </div>
            <h2 className="text-lg font-black text-slate-800 tracking-tight">
              Average Price ($)
            </h2>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.priceData}>
                <XAxis
                  dataKey="name"
                  fontSize={10}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontWeight: "bold" }}
                />
                <Tooltip cursor={{ fill: "#f8fafc" }} />
                <Bar
                  dataKey="avgPrice"
                  fill="#2563eb"
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className={cn(cardBase, "p-8")}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-slate-100 p-2 rounded-xl">
              <Clock className="h-5 w-5 text-slate-600" />
            </div>
            <h2 className="text-xl font-black text-slate-800 tracking-tighter">
              Recent Activity
            </h2>
          </div>
          <Link href="/admin/products">
            <Button
              variant="ghost"
              className="cursor-pointer text-blue-600 hover:bg-blue-50 font-black text-xs uppercase tracking-widest rounded-xl px-4"
            >
              Manage Products <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="space-y-3">
          {stats.latest.map((product: any) => (
            <div
              key={product.id}
              className="flex justify-between items-center p-4 rounded-[20px] bg-slate-50/50 hover:bg-white hover:border-blue-100 border border-transparent transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-blue-600 font-black shadow-sm">
                  {product.name.charAt(0)}
                </div>
                <div>
                  <p className="font-black text-slate-800 tracking-tight">
                    {product.name}
                  </p>
                  <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest">
                    {product.category?.name || "No Category"}
                  </p>
                </div>
              </div>
              <span className="font-black text-lg text-slate-900 tracking-tighter">
                ${product.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
