import { StyleSheet, Text, View, LogBox } from "react-native";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import productReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import AppNavigator from "./navigation/AppNavigator";
import ordersReducer from "./store/reducers/orders";

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: ordersReducer,
});

const store = createStore(rootReducer);

export default function App() {
  LogBox.ignoreAllLogs();
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
