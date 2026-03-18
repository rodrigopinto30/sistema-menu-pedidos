"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/AdminSidebar";
import { AdminNavbar } from "@/components/AdminNavbar";
import { AdminFooter } from "@/components/AdminFooter";
import { cn } from "@/lib/utils";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <aside
        className={cn(
          "hidden md:flex flex-col sticky top-0 h-screen z-[70] transition-all duration-300",
          isExpanded ? "w-64" : "w-20",
        )}
      >
        <AdminSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <AdminNavbar />

        <main className="flex-1 p-4 md:p-10">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
        <AdminFooter />
      </div>
    </div>
  );
}
