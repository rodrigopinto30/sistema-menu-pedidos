"use client";

import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AccountSidebar } from "@/components/AccountSidebar";
import { usePathname } from "next/navigation";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAuthPage = pathname === "/login" || pathname === "/register";

  if (isAuthPage) return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col sticky top-0 h-screen">
        <AccountSidebar />
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
