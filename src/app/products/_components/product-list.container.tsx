"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import {
  setCategories,
  setCategoryError,
  setCategoryLoading,
} from "@/redux/actions/categoryActions";
import { getCategories } from "@/services/category.service";
import {
  removeProduct,
  setProductError,
  setProductLoading,
  setProducts,
} from "@/redux/actions/productActions";
import {
  deleteProduct,
  getProducts,
  GetProductsParams,
  Pagination,
} from "@/services/product.service";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Edit,
  Eye,
  Search,
  Trash2,
} from "lucide-react";
import Image from "next/image";

const ProductListContainer = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { categories } = useSelector((state: RootState) => state.categories);
  const { products, loading: productLoading } = useSelector(
    (state: RootState) => state.products,
  );

  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const limit = 18;

  useEffect(() => {
    const fetchCategoriesData = async () => {
      dispatch(setCategoryLoading(true));
      try {
        const data = await getCategories();
        dispatch(setCategories(data));
      } catch (err) {
        console.error("Error fetching categories:", err);
        dispatch(setCategoryError("Gagal memuat kategori"));
      } finally {
        dispatch(setCategoryLoading(false));
      }
    };
    fetchCategoriesData();
  }, [dispatch]);

  const fetchProductsData = useCallback(async () => {
    dispatch(setProductLoading(true));
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(search && { search }),
        ...(categoryId && { categoryId }),
        sortBy,
        sortOrder,
      });

      const res = await getProducts(params as GetProductsParams);
      dispatch(setProducts(res.data));
      setPagination(res.pagination);
    } catch (err) {
      console.error(err);
      dispatch(setProductError("Gagal memuat produk"));
    } finally {
      dispatch(setProductLoading(false));
    }
  }, [dispatch, page, search, categoryId, sortBy, sortOrder]);

  useEffect(() => {
    fetchProductsData();
  }, [fetchProductsData]);

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus produk ini?")) return;

    try {
      await deleteProduct(id);
      dispatch(removeProduct(id));
      fetchProductsData();
      alert("Produk berhasil dihapus");
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus produk");
    }
  };

  useEffect(() => {
    setPage(1);
  }, [search, categoryId, sortBy, sortOrder]);


  return (
    <div className="min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-text">Daftar Produk</h1>
            <p className="mt-1 text-gray-600">
              Kelola semua produk toko Anda di sini
            </p>
          </div>
          <Link
            href="/products/create"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-xl hover:bg-primaryDark transition font-medium shadow-sm"
          >
            + Tambah Produk Baru
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari nama atau deskripsi..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>

            <div>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none bg-white"
              >
                <option value="">Semua Kategori</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none bg-white"
              >
                <option value="createdAt">Tanggal Dibuat</option>
                <option value="name">Nama Produk</option>
                <option value="price">Harga</option>
                <option value="stock">Stok</option>
                <option value="category.name">Kategori</option>
              </select>
            </div>

            <div>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none bg-white"
              >
                <option value="desc">Terbaru ke Terlama</option>
                <option value="asc">Terlama ke Terbaru</option>
              </select>
            </div>
          </div>
        </div>

        {productLoading ? (
          <div className="min-h-[500px] bg-gray-50/50 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-gray-600">Memuat produk...</p>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
            <p className="text-xl text-gray-500">Tidak ada produk ditemukan</p>
            <p className="mt-2 text-gray-400">
              Coba ubah kata kunci atau filter
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col h-full"
              >
                <div className="relative h-48 bg-gray-100">
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      No Image
                    </div>
                  )}

                  {product.discount > 0 && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                      {product.discount}% OFF
                    </div>
                  )}
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-semibold text-lg text-text line-clamp-2 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                    {product.description || "Tidak ada deskripsi"}
                  </p>

                  <div className="mt-auto">
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-xl font-bold text-primary">
                        Rp{" "}
                        {(
                          product.price *
                          (1 - product.discount / 100)
                        ).toLocaleString()}
                      </span>
                      {product.discount > 0 && (
                        <span className="text-sm text-gray-400 line-through">
                          Rp {product.price.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <div className="text-sm text-gray-600 mb-4">
                      Stok: <span className="font-medium">{product.stock}</span>{" "}
                      • {product.category?.name || "Uncategorized"}
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href={`/products/${product.id}`}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition font-medium"
                      >
                        <Eye size={18} />
                        Detail
                      </Link>

                      <Link
                        href={`/products/create?id=${product.id}`}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition font-medium"
                      >
                        <Edit size={18} />
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(product.id)}
                        className="flex items-center justify-center gap-2 py-2.5 px-4 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition"
                        title="Hapus produk"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {pagination && pagination.total > 0 && (
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              Menampilkan {(page - 1) * limit + 1} -{" "}
              {Math.min(page * limit, pagination.total)} dari {pagination.total}{" "}
              produk
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={!pagination.hasPrevPage}
                className="p-2 rounded-lg border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition"
              >
                <ChevronLeft size={20} />
              </button>

              <span className="px-4 py-2 font-medium">
                Halaman {page} dari {pagination.totalPages}
              </span>

              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={!pagination.hasNextPage}
                className="p-2 rounded-lg border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListContainer;
