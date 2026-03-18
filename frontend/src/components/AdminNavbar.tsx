"use client";

import {
  LogOut,
  User as UserIcon,
  ChevronDown,
  Store,
  Bell,
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function AdminNavbar() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 bg-white/80 backdrop-blur-md z-[40] border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-8 h-20 flex justify-between items-center">
        <div className="flex-1">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            Management System v2.0
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="cursor-pointer hidden md:flex items-center gap-2 text-slate-500 hover:text-blue-600 rounded-full font-bold text-xs uppercase tracking-tighter"
            >
              <Store className="h-4 w-4" />
              View Store
            </Button>
          </Link>

          <div className="h-6 w-[1px] bg-slate-100 mx-1" />

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="cursor-pointer bg-transparent border-none flex items-center gap-3 p-1.5 rounded-full hover:bg-slate-50 transition-all duration-300 outline-none group">
                  <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    <UserIcon className="h-5 w-5" />
                  </div>
                  <div className="hidden md:flex flex-col text-left">
                    <span className="text-sm font-black text-slate-800 leading-none flex items-center gap-1.5">
                      {user.name}
                      <ChevronDown className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-600" />
                    </span>
                    <span className="text-[10px] text-blue-500 font-black uppercase tracking-tighter mt-1">
                      {user.role}
                    </span>
                  </div>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-64 mt-2 p-2 rounded-[24px] border-slate-100 shadow-2xl shadow-blue-900/10"
              >
                <DropdownMenuLabel className="font-normal px-4 py-4">
                  <div className="flex flex-col space-y-1">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                      Administrator
                    </p>
                    <p className="text-sm font-black text-slate-900 leading-none">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="bg-slate-50" />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer rounded-xl text-rose-500 focus:text-rose-700 focus:bg-rose-50 p-3 mt-1"
                >
                  <LogOut className="mr-3 h-4 w-4 opacity-70" />
                  <span className="font-black text-xs uppercase tracking-widest">
                    Sign Out
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
}
