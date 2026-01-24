"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/redux/types";
import { ArrowRight } from "lucide-react";

type Props = {
  initialProducts: Product[];
};

export default function HomeContainer({ initialProducts }: Props) {
  const productsWithDiscount = initialProducts.map((p) => ({
    ...p,
    finalPrice: p.price * (1 - p.discount / 100),
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <section className="relative h-[90vh] min-h-[700px] w-full overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1645454410409-4239be595387?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Hero background produk berkualitas"
              fill
              className="object-cover brightness-[0.65]"
              priority
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

          <div className="relative z-10 container mx-auto h-full px-4 flex flex-col justify-center items-center text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 drop-shadow-2xl leading-tight max-w-4xl">
              Kelola Produk Lebih Mudah
              <br />
              <span className="text-primary">
                Manajemen Produk yang Efisien
              </span>
            </h1>

            <p className="text-lg md:text-xl mb-10 max-w-2xl drop-shadow-lg">
              Kelola produk secara efisien dalam satu platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white text-lg font-semibold rounded-xl hover:bg-primaryDark transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Lihat Semua Produk
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white text-lg font-semibold rounded-xl border border-white/30 hover:bg-white/20 transition"
              >
                Tentang Kami
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
                Produk Unggulan
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Pilihan terbaik dari katalog kami yang selalu update dengan
                produk terbaru dan terlaris
              </p>
            </div>

            {initialProducts.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                Belum ada produk yang tersedia saat ini...
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {productsWithDiscount.map((product) => {
                  const hasDiscount = product.discount > 0;

                  return (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      className="group block"
                    >
                      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition border border-gray-100 h-full flex flex-col">
                        <div className="relative aspect-square">
                          {product.imageUrl ? (
                            <Image
                              src={product.imageUrl}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-105 transition duration-300"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                              Tidak ada gambar
                            </div>
                          )}

                          {hasDiscount && (
                            <div className="absolute top-3 left-3 bg-error text-white px-2.5 py-1 rounded-lg text-sm font-bold shadow-sm">
                              {product.discount}% OFF
                            </div>
                          )}
                        </div>

                        <div className="p-5 flex flex-col flex-grow">
                          <h3 className="font-semibold text-lg mb-1 line-clamp-2 group-hover:text-primary transition">
                            {product.name}
                          </h3>

                          <p className="text-sm text-gray-500 mb-3">
                            {product.category?.name || "Lainnya"}
                          </p>

                          <div className="flex items-end gap-2 mt-auto">
                            <span className="text-xl font-bold text-primary">
                              Rp {product.finalPrice.toLocaleString("id-ID")}
                            </span>
                            {hasDiscount && (
                              <span className="text-sm text-gray-500 line-through">
                                Rp {product.price.toLocaleString("id-ID")}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            <div className="text-center mt-12">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary/10 text-primary font-semibold rounded-xl hover:bg-primary/20 transition border border-primary/30"
              >
                Lihat Semua Produk
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
