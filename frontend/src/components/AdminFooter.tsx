"use client";

import {
  ShieldCheck,
  Terminal,
  Cpu,
  LifeBuoy,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

export const AdminFooter = () => {
  return (
    <footer className="bg-white border-t border-slate-100 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <ShieldCheck className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-black text-slate-900 tracking-tighter">
                Admin<span className="text-blue-600">Console</span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  System Online
                </span>
              </div>
              <div className="h-1 w-1 rounded-full bg-slate-200" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">
                v2.4.0-pro
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-12">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 flex items-center gap-2">
                <Terminal className="h-3 w-3" /> Support
              </h4>
              <ul className="space-y-3">
                {["Documentation", "API Status", "Help Desk"].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-slate-500 hover:text-blue-600 font-bold text-xs transition-colors flex items-center gap-1 group"
                    >
                      {item}{" "}
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 flex items-center gap-2">
                <Cpu className="h-3 w-3" /> Management
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/"
                    className="text-slate-500 hover:text-blue-600 font-bold text-xs transition-colors"
                  >
                    Back to Store
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-slate-500 hover:text-blue-600 font-bold text-xs transition-colors text-rose-400"
                  >
                    Security Logs
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
            © 2026 PREMIUM FOODIE MANAGEMENT SUITE. CONFIDENTIAL.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <LifeBuoy className="h-3 w-3 text-blue-500" />
              Emergency Support: +1-800-ADMIN
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
