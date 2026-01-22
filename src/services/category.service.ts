import { Category } from "@/redux/types";
import axios from "axios";

const API_BASE = "/api/categories";

export const getCategories = async (): Promise<Category[]> => {
  try {
    const res = await axios.get<Category[]>(API_BASE);
    return res.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Gagal memuat kategori");
  }
};

export const createCategory = async (name: string): Promise<Category> => {
  if (!name.trim()) throw new Error("Nama kategori tidak boleh kosong");

  try {
    const res = await axios.post<Category>(API_BASE, { name: name.trim() });
    return res.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw new Error("Gagal menambah kategori");
  }
};

export const updateCategory = async (
  id: string,
  name: string,
): Promise<Category> => {
  if (!name.trim()) throw new Error("Nama kategori tidak boleh kosong");

  try {
    const res = await axios.put<Category>(`${API_BASE}?id=${id}`, {
      name: name.trim(),
    });
    return res.data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw new Error("Gagal mengupdate kategori");
  }
};

export const deleteCategory = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE}?id=${id}`);
  } catch (error) {
    console.error("Error deleting category:", error);
    throw new Error("Gagal menghapus kategori");
  }
};
