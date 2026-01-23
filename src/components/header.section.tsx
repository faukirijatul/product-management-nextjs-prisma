"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="text-xl font-extrabold text-primary tracking-wide"
            onClick={closeMenu}
          >
            Logo
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary font-medium transition"
            >
              Beranda
            </Link>
            <Link
              href="/products"
              className="text-gray-700 hover:text-primary font-medium transition"
            >
              Produk
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-primary font-medium transition"
            >
              Tentang Kami
            </Link>
          </nav>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            aria-label="Toggle menu"
          >
            {open ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md shadow-lg">
          <nav className="flex flex-col py-4 px-4 space-y-2">
            <Link
              href="/"
              onClick={closeMenu}
              className="px-4 py-3 rounded-xl text-gray-700 font-medium hover:bg-primary/10 hover:text-primary transition"
            >
              Beranda
            </Link>
            <Link
              href="/products"
              onClick={closeMenu}
              className="px-4 py-3 rounded-xl text-gray-700 font-medium hover:bg-primary/10 hover:text-primary transition"
            >
              Produk
            </Link>
            <Link
              href="/about"
              onClick={closeMenu}
              className="px-4 py-3 rounded-xl text-gray-700 font-medium hover:bg-primary/10 hover:text-primary transition"
            >
              Tentang Kami
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
