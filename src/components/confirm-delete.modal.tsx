"use client";

import React from "react";
import { X, Trash2, Loader2 } from "lucide-react";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  itemName?: string;
  loading?: boolean;
}

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Konfirmasi Hapus",
  message = "Apakah Anda yakin ingin menghapus item ini?",
  itemName = "",
  loading = false,
}: ConfirmDeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-error/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-error/10 rounded-full">
              <Trash2 size={20} className="text-error" />
            </div>
            <h2 className="text-xl font-bold text-text">{title}</h2>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="p-2 rounded-full hover:bg-gray-200 transition disabled:opacity-50"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-700 mb-2">
            {message}
            {itemName && (
              <span className="font-semibold text-text"> {itemName}</span>
            )}
            ?
          </p>
          <p className="text-sm text-gray-500">
            Tindakan ini tidak bisa dibatalkan.
          </p>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-6 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-100 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-error text-white rounded-xl hover:bg-errorDark transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Menghapus...
              </>
            ) : (
              <>
                <Trash2 size={18} />
                Hapus
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}