"use client";

import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Product Management App
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Product Management App adalah platform yang membantu tim dan
              individu dalam mengelola produk secara efisien, mulai dari
              perencanaan, pengembangan, hingga monitoring performa produk. Kami
              berfokus pada kemudahan penggunaan, produktivitas, dan kolaborasi
              yang lebih baik.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="hover:text-primary transition">
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-primary transition"
                >
                  Produk
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition">
                  Tentang Kami
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Kontak</h4>

            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <span>Bogor, Jawa Barat, Indonesia</span>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <a
                  href="https://wa.me/6287845352397"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition"
                >
                  +6287845352397
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <a
                  href="mailto:faukirijatul42@gmail.com"
                  className="hover:text-primary transition"
                >
                  faukirijatul42@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Product Management App. All rights
          reserved. Created by{" "}
          <a
            href="https://fauki.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Fauki Rijatul H
          </a>
        </div>
      </div>
    </footer>
  );
}
