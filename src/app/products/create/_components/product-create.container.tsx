"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import CategoryManagerSection from "@/components/category-maneger.section";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  setCategories,
  setCategoryError,
  setCategoryLoading,
} from "@/redux/actions/categoryActions";
import { getCategories } from "@/services/category.service";
import {
  addProduct,
  updateProduct,
  setProductError,
  setProductLoading,
} from "@/redux/actions/productActions";
import {
  createProduct,
  getProductById,
  updateProductService,
} from "@/services/product.service";
import { Product } from "@/redux/types";

export default function TambahProdukBaru({ id }: { id: string | null }) {
  const dispatch = useDispatch<AppDispatch>();

  const { categories } = useSelector((state: RootState) => state.categories);
  const { loading: productLoading } = useSelector(
    (state: RootState) => state.products,
  );

  const isEditMode = !!id;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [stock, setStock] = useState("");
  const [categoryId, setCategoryId] = useState<string | number>("");
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

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

  useEffect(() => {
    if (!isEditMode) return;

    const fetchProduct = async () => {
      dispatch(setProductLoading(true));
      try {
        const product = await getProductById(id!);

        setName(product.name);
        setDescription(product.description);
        setPrice(product.price.toString());
        setDiscount(product.discount.toString());
        setStock(product.stock.toString());
        setCategoryId(product.categoryId);
        if (product.imageUrl) {
          setPreview(product.imageUrl);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        dispatch(setProductError("Gagal memuat data produk"));
      } finally {
        dispatch(setProductLoading(false));
      }
    };

    fetchProduct();
  }, [id, isEditMode, dispatch]);

  const handleFile = useCallback((uploadedFile: File) => {
    if (!uploadedFile.type.startsWith("image/")) {
      alert("File harus berupa gambar");
      return;
    }
    if (uploadedFile.size > 5 * 1024 * 1024) {
      alert("Ukuran maksimal 5MB");
      return;
    }

    setFile(uploadedFile);
    const objectUrl = URL.createObjectURL(uploadedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, []);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
  };

  const removeImage = () => {
    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !price || !stock || !categoryId) {
      alert("Harap isi semua field yang wajib");
      return;
    }

    dispatch(setProductLoading(true));

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("discount", discount);
      formData.append("stock", stock);
      formData.append("categoryId", String(categoryId));

      if (file) {
        formData.append("image", file);
      }

      let updatedOrNewProduct: Product;

      if (isEditMode) {
        formData.append("id", id!);
        updatedOrNewProduct = await updateProductService(formData);
        dispatch(updateProduct(updatedOrNewProduct));
      } else {
        updatedOrNewProduct = await createProduct(formData);
        dispatch(addProduct(updatedOrNewProduct));
      }

      alert(
        isEditMode
          ? "Produk berhasil diperbarui!"
          : "Produk berhasil ditambahkan!",
      );

      if (!isEditMode) {
        setName("");
        setDescription("");
        setPrice("");
        setDiscount("0");
        setStock("");
        setCategoryId("");
        removeImage();
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Terjadi kesalahan");
    } finally {
      dispatch(setProductLoading(false));
    }
  };

  const title = isEditMode ? "Edit Produk" : "Tambah Produk Baru";
  const buttonText = isEditMode ? "Simpan Perubahan" : "Simpan Produk";

  return (
    <div className="min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text">{title}</h1>
          <p className="mt-2 text-gray-600">
            {isEditMode
              ? "Ubah informasi produk dengan benar"
              : "Isi detail produk dengan lengkap"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label
              htmlFor="nama"
              className="block text-sm font-medium text-text mb-1.5"
            >
              Nama Produk
            </label>
            <input
              type="text"
              id="nama"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              placeholder="Contoh: Kaos Oversize Premium"
              required
            />
          </div>

          <div>
            <label
              htmlFor="deskripsi"
              className="block text-sm font-medium text-text mb-1.5"
            >
              Deskripsi
            </label>
            <textarea
              id="deskripsi"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-y"
              placeholder="Jelaskan keunggulan, bahan, ukuran, dll..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label
                htmlFor="harga"
                className="block text-sm font-medium text-text mb-1.5"
              >
                Harga (Rp)
              </label>
              <input
                type="number"
                id="harga"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="150000"
              />
            </div>

            <div>
              <label
                htmlFor="diskon"
                className="block text-sm font-medium text-text mb-1.5"
              >
                Diskon (%)
              </label>
              <input
                type="number"
                id="diskon"
                min="0"
                max="100"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="0 - 100"
              />
            </div>

            <div>
              <label
                htmlFor="stok"
                className="block text-sm font-medium text-text mb-1.5"
              >
                Stok
              </label>
              <input
                type="number"
                id="stok"
                min="0"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="50"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="kategori"
              className="block text-sm font-medium text-text mb-1.5"
            >
              Kategori
            </label>
            <div className="relative">
              <select
                id="kategori"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full appearance-none rounded-xl border border-gray-300 px-4 py-3 pr-10 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white"
              >
                <option value="">Pilih Kategori</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsCategoryOpen(true)}
              className="mt-2 text-sm text-primary hover:text-primaryDark font-medium transition"
            >
              + Kelola Kategori
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1.5">
              Gambar Produk
            </label>

            <div
              className={`
                relative border-2 border-dashed rounded-2xl overflow-hidden transition-all duration-200 min-h-[260px]
                ${
                  dragActive
                    ? "border-primary bg-primary/5"
                    : preview
                      ? "border-primary/50 bg-white"
                      : "border-gray-300 hover:border-primary/50 bg-gray-50/70"
                }
              `}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {!preview ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                  <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Upload className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-lg font-medium text-text mb-1">
                    Tarik & lepas gambar di sini
                  </p>
                  <p className="text-sm text-gray-500 mb-4">atau</p>
                  <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primaryDark transition font-medium shadow-sm"
                  >
                    Pilih Gambar
                  </button>
                  <p className="mt-4 text-xs text-gray-500">
                    PNG, JPG, WEBP • Maks 5MB • Rekomendasi 1200×1200 atau lebih
                  </p>
                </div>
              ) : (
                <div className="relative w-full h-full min-h-[260px]">
                  <Image
                    src={preview}
                    alt="Preview produk"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 700px"
                    priority
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-4 right-4 bg-white/90 hover:bg-white text-error p-2 rounded-full shadow-md transition z-10"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}

              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={productLoading}
              className={`w-full md:w-auto px-10 py-4 bg-primary text-white font-semibold rounded-xl transition shadow-lg
                ${productLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-primaryDark"}`}
            >
              {productLoading ? "Menyimpan..." : buttonText}
            </button>
          </div>
        </form>
      </div>

      <CategoryManagerSection
        isOpen={isCategoryOpen}
        setIsOpen={setIsCategoryOpen}
      />
    </div>
  );
}
