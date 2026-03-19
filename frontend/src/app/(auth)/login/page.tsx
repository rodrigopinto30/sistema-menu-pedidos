"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "@/lib/validations/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { LockKeyhole, Mail, ShoppingBag, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const setAuth = useAuthStore((state: any) => state.setAuth);
  const router = useRouter();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      const res = await api.post("/login", data);
      setAuth(res.data.user, res.data.token);
      toast.success("Welcome back!");
      router.push("/");
    } catch (error: any) {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4 animate-in fade-in zoom-in-95 duration-500">
      <Link href="/" className="flex items-center gap-2 mb-8 group">
        <div className="bg-emerald-600 p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-emerald-200">
          <ShoppingBag className="h-6 w-6 text-white" />
        </div>
        <span className="text-2xl font-black text-slate-900 tracking-tighter">
          Foodie<span className="text-emerald-600">App</span>
        </span>
      </Link>

      <div className="w-full max-w-md bg-white rounded-[32px] shadow-2xl shadow-slate-200/60 border border-slate-100 p-10 space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100/50 mb-2">
            <LockKeyhole className="h-3 w-3" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              Secure Access
            </span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
            Welcome <span className="text-emerald-600">Back</span>
          </h1>
          <p className="text-slate-400 font-medium text-sm">
            Please enter your details to sign in
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }: { field: any }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                      <Input
                        placeholder="name@example.com"
                        {...field}
                        className="pl-11 h-12 rounded-2xl bg-slate-50 border-slate-100 focus:bg-white transition-all font-medium"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-[10px] font-bold" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }: { field: any }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative group">
                      <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                        className="pl-11 h-12 rounded-2xl bg-slate-50 border-slate-100 focus:bg-white transition-all font-medium"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-[10px] font-bold" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-12 bg-slate-900 hover:bg-emerald-600 text-white font-black rounded-2xl transition-all active:scale-95 shadow-lg shadow-slate-200 cursor-pointer flex items-center justify-center gap-2 group"
            >
              Sign In
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>
        </Form>

        <div className="pt-6 text-center border-t border-slate-50">
          <p className="text-sm font-medium text-slate-500">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-emerald-600 font-black hover:underline underline-offset-4"
            >
              Create one for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
