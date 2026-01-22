import {
  SET_PRODUCTS,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  REMOVE_PRODUCT,
  SET_PRODUCT_LOADING,
  SET_PRODUCT_ERROR,
  ProductActions,
} from "../actions/productActions";
import { ProductState } from "../types";

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

export default function productReducer(
  state: ProductState = initialState,
  action: ProductActions,
): ProductState {
  switch (action.type) {
    case SET_PRODUCTS:
      return { ...state, products: action.payload, loading: false };
    case ADD_PRODUCT:
      return { ...state, products: [...state.products, action.payload] };
    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === action.payload.id ? action.payload : p,
        ),
      };
    case REMOVE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload),
      };
    case SET_PRODUCT_LOADING:
      return { ...state, loading: action.payload };
    case SET_PRODUCT_ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}
