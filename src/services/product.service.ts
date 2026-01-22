import axios from "axios";
import { Product } from "@/redux/types";

const API_BASE = "/api/products";

export type Pagination = {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  page: number;
  total: number;
  totalPages: number;
};

export interface GetProductsParams {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  id?: string;
}

interface ProductsResponse {
  data: Product[];
  pagination: Pagination;
}

export const getProducts = async (
  params: GetProductsParams = {},
): Promise<{ data: Product[]; pagination: Pagination }> => {
  try {
    const res = await axios.get<ProductsResponse>(API_BASE, { params });

    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Gagal memuat daftar produk");
  }
};

export const getProductById = async (id: string): Promise<Product> => {
  try {
    const res = await axios.get<Product>(`${API_BASE}?id=${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error("Gagal memuat detail produk");
  }
};

export const createProduct = async (formData: FormData): Promise<Product> => {
  try {
    const res = await axios.post<Product>(API_BASE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(res);
    return res.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("Gagal menambah produk");
  }
};

export const updateProductService = async (
  formData: FormData,
): Promise<Product> => {
  try {
    const res = await axios.put<Product>(API_BASE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw new Error("Gagal mengupdate produk");
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE}?id=${id}`);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error("Gagal menghapus produk");
  }
};
