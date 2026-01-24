"use client";

import React, { useState, useEffect } from "react";
import { Edit2, Trash2, ArrowLeft, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Product } from "@/redux/types";
import { deleteProduct } from "@/services/product.service";
import ConfirmDeleteModal from "@/components/confirm-delete.modal";

type Props = {
  initialProduct: Product;
  productId: string;
};

export default function ProductDetailsContainer({
  initialProduct,
  productId,
}: Props) {
  const router = useRouter();
  const [product, setProduct] = useState<Product>(initialProduct);
  const [loading, setLoading] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setProduct(initialProduct);
  }, [initialProduct]);

  const handleDelete = async () => {
    if (!productId) return;

    setIsDeleting(true);
    setLoading(true);

    try {
      await deleteProduct(productId);
      toast.success("Produk berhasil dihapus");
      router.push("/products");
      router.refresh();
    } catch (err) {
      console.error("Gagal menghapus produk:", err);
      toast.error("Gagal menghapus produk");
    } finally {
      setIsDeleting(false);
      setLoading(false);
      setDeleteModalOpen(false);
    }
  };

  const discountPrice = product.price * (1 - product.discount / 100);
  const hasDiscount = product.discount > 0;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-6">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition"
        >
          <ArrowLeft size={18} />
          Kembali ke Daftar Produk
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        <div className="grid md:grid-cols-2 gap-8 p-6 md:p-10">
          <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-50 border border-gray-200">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                Tidak ada gambar
              </div>
            )}

            {hasDiscount && (
              <div className="absolute top-4 left-4 bg-error text-white px-3 py-1.5 rounded-lg font-bold text-sm shadow-md">
                {product.discount}% OFF
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                {product.category?.name || "Uncategorized"}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-text mb-3">
              {product.name}
            </h1>

            <div className="flex items-end gap-3 mb-6">
              {hasDiscount ? (
                <>
                  <span className="text-4xl font-bold text-primary">
                    Rp {discountPrice.toLocaleString("id-ID")}
                  </span>
                  <span className="text-xl text-gray-500 line-through">
                    Rp {product.price.toLocaleString("id-ID")}
                  </span>
                </>
              ) : (
                <span className="text-4xl font-bold text-primary">
                  Rp {product.price.toLocaleString("id-ID")}
                </span>
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Stok</h3>
              <p
                className={`text-lg ${product.stock > 0 ? "text-green-600" : "text-error"}`}
              >
                {product.stock} unit tersedia
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-2">Deskripsi</h3>
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                {product.description || "Tidak ada deskripsi untuk produk ini."}
              </p>
            </div>

            <div className="flex gap-4 mt-auto">
              <Link
                href={`/products/create?id=${productId}`}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primaryDark transition font-medium shadow-sm"
              >
                <Edit2 size={18} />
                Edit Produk
              </Link>

              <button
                onClick={() => setDeleteModalOpen(true)}
                disabled={loading}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-error/10 text-error border border-error/30 rounded-xl hover:bg-error/20 transition font-medium disabled:opacity-50"
              >
                {loading && isDeleting ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Trash2 size={18} />
                )}
                Hapus Produk
              </button>
            </div>
          </div>
        </div>
      </div>

      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Hapus Produk"
        message="Apakah Anda yakin ingin menghapus produk ini?"
        itemName={product.name}
        loading={isDeleting}
      />
    </div>
  );
}
