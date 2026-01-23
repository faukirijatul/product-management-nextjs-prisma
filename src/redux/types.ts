export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  imageUrl?: string | null;
  stock: number;
  categoryId: string;
  category?: { id: string; name: string };
}

export interface Category {
  id: string;
  name: string;
}

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}