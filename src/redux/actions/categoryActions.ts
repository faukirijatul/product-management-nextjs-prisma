import { Category } from "../types";

export const SET_CATEGORIES = "SET_CATEGORIES";
export const ADD_CATEGORY = "ADD_CATEGORY";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const REMOVE_CATEGORY = "REMOVE_CATEGORY";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";

export interface SetCategoriesAction {
  type: typeof SET_CATEGORIES;
  payload: Category[];
}

export interface AddCategoryAction {
  type: typeof ADD_CATEGORY;
  payload: Category;
}

export interface UpdateCategoryAction {
  type: typeof UPDATE_CATEGORY;
  payload: Category;
}

export interface RemoveCategoryAction {
  type: typeof REMOVE_CATEGORY;
  payload: string;
}

export interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean;
}

export interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: string | null;
}

export type CategoryAction =
  | SetCategoriesAction
  | AddCategoryAction
  | UpdateCategoryAction
  | RemoveCategoryAction
  | SetLoadingAction
  | SetErrorAction;

export const setCategories = (categories: Category[]): SetCategoriesAction => ({
  type: SET_CATEGORIES,
  payload: categories,
});

export const addCategory = (category: Category): AddCategoryAction => ({
  type: ADD_CATEGORY,
  payload: category,
});

export const updateCategoryAction = (
  category: Category,
): UpdateCategoryAction => ({
  type: UPDATE_CATEGORY,
  payload: category,
});

export const removeCategory = (id: string): RemoveCategoryAction => ({
  type: REMOVE_CATEGORY,
  payload: id,
});

export const setCategoryLoading = (loading: boolean): SetLoadingAction => ({
  type: SET_LOADING,
  payload: loading,
});

export const setCategoryError = (error: string | null): SetErrorAction => ({
  type: SET_ERROR,
  payload: error,
});
