"use client";

import { useState } from "react"; // Importamos useState
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AccountSidebar } from "@/components/AccountSidebar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);

  const isAuthPage = pathname === "/login" || pathname === "/register";

  if (isAuthPage) return <>{children}</>;

  return (
    <div className="flex min-h-screen">
      <aside className="w-20 hidden md:flex flex-col sticky top-0 h-screen z-[70]">
        <AccountSidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      </aside>

      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
