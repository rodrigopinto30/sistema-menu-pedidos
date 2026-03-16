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
import { useRouter, usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const totalItems = useCartStore((state: any) => state.getTotalItems());
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isAccountPage = pathname.startsWith("/account");

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 bg-white/80 backdrop-blur-md z-[50] border-b">
      <div className="max-w-6xl mx-auto px-4 h-16 flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center gap-2 text-orange-600 font-black text-2xl tracking-tighter hover:opacity-90 transition-opacity"
        >
          <UtensilsCrossed className="h-7 w-7" />
          FOODIE
        </Link>

        <div className="flex items-center gap-6">
          {!isAuthPage ? (
            <>
              {user && (
                <div className="flex items-center gap-4 border-r pr-4">
                  <Link
                    href="/account/orders"
                    className={cn(
                      "flex items-center gap-3 group transition-colors",
                      isAccountPage
                        ? "text-orange-600"
                        : "text-gray-600 hover:text-orange-600",
                    )}
                  >
                    <div className="hidden md:flex flex-col items-end">
                      <span className="text-sm font-bold leading-none">
                        Hola, {user.name.split(" ")[0]}
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-tighter opacity-60">
                        Mi Cuenta
                      </span>
                    </div>
                    <div
                      className={cn(
                        "p-2 rounded-full transition-colors",
                        isAccountPage
                          ? "bg-orange-100"
                          : "bg-gray-100 group-hover:bg-orange-100",
                      )}
                    >
                      <UserIcon className="h-4 w-4" />
                    </div>
                  </Link>

                  {user.role === "admin" && (
                    <Link
                      href="/admin"
                      className="hidden lg:block text-[10px] bg-gray-900 text-white px-2 py-1 rounded font-bold hover:bg-orange-600 transition-colors"
                    >
                      ADMIN
                    </Link>
                  )}

                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-gray-400 hover:text-red-600 hover:bg-red-50"
                    title="Cerrar Sesión"
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>
              )}

              <div className="flex items-center bg-orange-500 text-white px-4 py-2 rounded-full font-bold shadow-sm shadow-orange-200 transition-transform hover:scale-105 active:scale-95 cursor-pointer">
                <ShoppingCart className="mr-2 h-4 w-4" />
                <span className="text-sm">{totalItems}</span>
              </div>
            </>
          ) : (
            !user && (
              <Link
                href="/login"
                className="text-sm font-bold text-gray-700 hover:text-orange-600 border-b-2 border-transparent hover:border-orange-600 pb-1 transition-all"
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
