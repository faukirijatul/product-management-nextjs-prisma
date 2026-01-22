import { createStore, combineReducers } from 'redux';
import productReducer from './reducers/productReducer';
import categoryReducer from './reducers/categoryReducer';

const rootReducer = combineReducers({
  products: productReducer,
  categories: categoryReducer,
});

const store = createStore(rootReducer);

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;