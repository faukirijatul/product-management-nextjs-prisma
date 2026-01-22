import { Product } from "../types";

export const SET_PRODUCTS = "SET_PRODUCTS";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const SET_PRODUCT_LOADING = "SET_PRODUCT_LOADING";
export const SET_PRODUCT_ERROR = "SET_PRODUCT_ERROR";

export interface SetProductsAction {
  type: typeof SET_PRODUCTS;
  payload: Product[];
}

export interface AddProductAction {
  type: typeof ADD_PRODUCT;
  payload: Product;
}

export interface UpdateProductAction {
  type: typeof UPDATE_PRODUCT;
  payload: Product;
}

export interface RemoveProductAction {
  type: typeof REMOVE_PRODUCT;
  payload: string;
}

export interface SetProductLoadingAction {
  type: typeof SET_PRODUCT_LOADING;
  payload: boolean;
}

export interface SetProductErrorAction {
  type: typeof SET_PRODUCT_ERROR;
  payload: string | null;
}

export type ProductActions =
  | SetProductsAction
  | AddProductAction
  | UpdateProductAction
  | RemoveProductAction
  | SetProductLoadingAction
  | SetProductErrorAction;

export const setProducts = (products: Product[]): SetProductsAction => ({
  type: SET_PRODUCTS,
  payload: products,
});

export const addProduct = (product: Product): AddProductAction => ({
  type: ADD_PRODUCT,
  payload: product,
});

export const updateProduct = (product: Product): UpdateProductAction => ({
  type: UPDATE_PRODUCT,
  payload: product,
});

export const removeProduct = (id: string): RemoveProductAction => ({
  type: REMOVE_PRODUCT,
  payload: id,
});

export const setProductLoading = (
  loading: boolean,
): SetProductLoadingAction => ({
  type: SET_PRODUCT_LOADING,
  payload: loading,
});

export const setProductError = (
  error: string | null,
): SetProductErrorAction => ({
  type: SET_PRODUCT_ERROR,
  payload: error,
});
