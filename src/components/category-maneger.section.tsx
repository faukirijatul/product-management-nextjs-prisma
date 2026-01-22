"use client";

import React, { useEffect, FormEvent } from "react";
import { Plus, Edit2, Trash2, X, Save, Loader2 } from "lucide-react";
import { Category } from "@/redux/types";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addCategory, removeCategory, setCategories, setCategoryError, setCategoryLoading, updateCategoryAction } from "@/redux/actions/categoryActions";
import { createCategory, deleteCategory, getCategories, updateCategory } from "@/services/category.service";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const CategoryManagerSection = ({ isOpen, setIsOpen }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const { categories, loading, error } = useSelector(
    (state: RootState) => state.categories,
  );
  
  const [newCategoryName, setNewCategoryName] = React.useState("");
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editName, setEditName] = React.useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!isOpen) return;
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
    fetchData();
  }, [isOpen, dispatch]);

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    dispatch(setCategoryLoading(true));
    try {
      const newCat = await createCategory(newCategoryName);
      dispatch(addCategory(newCat));
      setNewCategoryName("");
    } catch (err) {
      console.error("Error creating category:", err);
      dispatch(setCategoryError("Gagal menambah kategori"));
    } finally {
      dispatch(setCategoryLoading(false));
    }
  };

  const handleUpdate = async (id: string) => {
    if (!editName.trim()) return;

    dispatch(setCategoryLoading(true));
    try {
      const updated = await updateCategory(id, editName);
      dispatch(updateCategoryAction(updated));
      setEditingId(null);
      setEditName("");
    } catch (err) {
      console.error("Error updating category:", err);
      dispatch(setCategoryError("Gagal mengupdate kategori"));
    } finally {
      dispatch(setCategoryLoading(false));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus?")) return;

    dispatch(setCategoryLoading(true));
    try {
      await deleteCategory(id);
      dispatch(removeCategory(id));
    } catch (err) {
      console.error("Error deleting category:", err);
      dispatch(setCategoryError("Gagal menghapus kategori"));
    } finally {
      dispatch(setCategoryLoading(false));
    }
  };

  const startEdit = (cat: Category) => {
    setEditingId(String(cat.id));
    setEditName(cat.name);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-primary/5 to-transparent">
              <h2 className="text-xl font-bold text-text">Kelola Kategori</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-gray-200 transition"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto">
              {error && (
                <div className="mb-4 p-3 bg-error/10 border border-error/30 text-error rounded-xl text-sm">
                  {error}
                </div>
              )}

              <div className="flex gap-3 mb-6">
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Nama kategori baru..."
                  className="flex-1 rounded-xl border border-gray-300 px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  disabled={loading}
                />
                <button
                  onClick={handleAdd}
                  disabled={loading || !newCategoryName.trim()}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-xl hover:bg-primaryDark transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  {loading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Plus size={18} />
                  )}
                  Tambah
                </button>
              </div>

              {loading && categories.length === 0 ? (
                <div className="flex justify-center py-10">
                  <Loader2 size={32} className="animate-spin text-primary" />
                </div>
              ) : categories.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  Belum ada kategori
                </div>
              ) : (
                <div className="space-y-3">
                  {categories?.map((cat) => (
                    <div
                      key={cat.id}
                      className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-primary/30 transition group"
                    >
                      {editingId === String(cat.id) ? (
                        <>
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                            autoFocus
                          />
                          <button
                            onClick={() => handleUpdate(String(cat.id))}
                            disabled={loading || !editName.trim()}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                          >
                            <Save size={20} />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition"
                          >
                            <X size={20} />
                          </button>
                        </>
                      ) : (
                        <>
                          <span className="flex-1 font-medium text-text">
                            {cat.name}
                          </span>
                          <button
                            onClick={() => startEdit(cat)}
                            className="p-2 text-primary/70 hover:text-primary hover:bg-primary/10 rounded-lg transition opacity-0 group-hover:opacity-100"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(cat.id)}
                            disabled={loading}
                            className="p-2 text-error/70 hover:text-error hover:bg-error/10 rounded-lg transition opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-100 transition font-medium"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryManagerSection;
