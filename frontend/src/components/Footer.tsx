"use client";

import {
  ShoppingBag,
  Instagram,
  Twitter,
  Facebook,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-10 mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-600 p-2 rounded-xl">
                <ShoppingBag className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-black text-slate-900 tracking-tighter">
                Foodie<span className="text-emerald-600">App</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              Bringing the best local flavors straight to your door with the
              speed and quality you deserve.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-2 rounded-xl bg-slate-50 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-xl bg-slate-50 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-xl bg-slate-50 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {["Menu", "My Orders", "Profile", "Cart"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-slate-600 hover:text-emerald-600 font-bold text-sm transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                <MapPin className="h-4 w-4 text-emerald-600 mt-0.5" />
                <span>
                  123 Culinary St, Food City,
                  <br />
                  FC 54321
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                <Phone className="h-4 w-4 text-emerald-600" />
                <span>+1 (555) 000-FOOD</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                <Mail className="h-4 w-4 text-emerald-600" />
                <span>hello@foodieapp.com</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-50 p-6 rounded-[24px] border border-slate-100">
            <h4 className="text-sm font-black text-slate-800 mb-2">
              Join the Foodies
            </h4>
            <p className="text-xs text-slate-500 font-medium mb-4">
              Get 10% off your first order by subscribing to our updates.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email"
                className="bg-white border-none rounded-xl text-xs px-3 w-full focus:ring-2 focus:ring-emerald-500/20 outline-none"
              />
              <button className="bg-slate-900 text-white p-2 rounded-xl hover:bg-emerald-600 transition-colors">
                <Mail className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            © 2026 Foodie App. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link
              href="#"
              className="text-[11px] font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-[11px] font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
