"use client";

import {
  ShoppingCart,
  UtensilsCrossed,
  LogOut,
  User as UserIcon,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

export function Navbar() {
  const totalItems = useCartStore((state: any) => state.getTotalItems());
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/register";
  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 bg-white/80 backdrop-blur-md z-[50] border-b">
      <div className="max-w-6xl mx-auto px-4 h-16 flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center gap-2 text-orange-600 font-black text-2xl tracking-tighter"
        >
          <UtensilsCrossed className="h-7 w-7" />
          FOODIE
        </Link>

        <div className="flex items-center gap-6">
          {!isAuthPage ? (
            <>
              {user && (
                <div className="flex items-center gap-4">
                  <div className="hidden md:flex flex-col items-end">
                    <span className="text-sm font-bold text-gray-800">
                      Hola, {user.name}
                    </span>
                    {user.role === "admin" && (
                      <Link
                        href="/admin"
                        className="text-[10px] text-orange-600 uppercase font-bold hover:underline"
                      >
                        Panel Admin
                      </Link>
                    )}
                  </div>
                  <Button
                    onClick={handleLogout}
                    className="cursor-pointer p-2 bg-white text-red-600 transition-colors hover:bg-red-600 hover:text-white"
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>
              )}

              <div className="flex items-center bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-bold transition-transform hover:scale-105">
                <ShoppingCart className="mr-2 h-5 w-5" />
                <span>{totalItems} items</span>
              </div>
            </>
          ) : (
            !user && (
              <Link
                href="/login"
                className="text-sm font-semibold text-gray-600 hover:text-orange-600"
              >
                Iniciar Sesión
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
}
