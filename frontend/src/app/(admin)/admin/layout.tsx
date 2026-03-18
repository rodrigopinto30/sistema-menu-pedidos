"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/AdminSidebar";
import { cn } from "@/lib/utils";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside
        className={cn(
          "bg-white border-r border-gray-200 hidden md:flex flex-col sticky top-0 h-screen transition-all duration-300",
          isExpanded ? "w-64" : "w-20",
        )}
      >
        <AdminSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      </aside>

      <main className="flex-1 flex flex-col">
        <div className="flex-1 p-8">{children}</div>
      </main>
    </div>
  );
}
