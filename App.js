import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import productReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import AppNavigator from "./navigation/AppNavigator";
import ordersReducer from "./store/reducers/orders";
import authReducer from "./store/reducers/auth";
import { StatusBar } from "expo-status-bar";

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
      <StatusBar style="dark" />
    </Provider>
  );
}
