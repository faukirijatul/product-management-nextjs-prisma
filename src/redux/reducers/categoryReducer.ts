import {
  SET_CATEGORIES,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  REMOVE_CATEGORY,
  SET_LOADING,
  SET_ERROR,
  CategoryAction,
} from "../actions/categoryActions";

import { CategoryState } from "../types";

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

export default function categoryReducer(
  state: CategoryState = initialState,
  action: CategoryAction
): CategoryState {
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, categories: action.payload, loading: false };
    case ADD_CATEGORY:
      return { ...state, categories: [...state.categories, action.payload] };
    case UPDATE_CATEGORY:
      return {
        ...state,
        categories: state.categories.map((cat) =>
          cat.id === action.payload.id ? action.payload : cat
        ),
      };
    case REMOVE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter((cat) => cat.id !== action.payload),
      };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}
