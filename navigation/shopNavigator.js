import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { DrawerActions } from "@react-navigation/native";

import CustomHeaderButton from "../components/ui/CustomHeaderButton";
import Colors from "../constants/Colors";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrderScreen from "../screens/shop/OrderScreen";
import UserProductScreen from "../screens/user/UserProductScreen";
import EditProductScreen from "../screens/user/EditProductScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const drawOptions = (navData) => {
  return {
    title: "Orders",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.dispatch(DrawerActions.toggleDrawer());
          }}
        />
      </HeaderButtons>
    ),
  };
};

const adminDrawOptions = (navData) => {
  return {
    title: "Orders",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.dispatch(DrawerActions.toggleDrawer());
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
          onPress={() => {
            navData.navigation.navigate("EditProduct");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const editHeaderOptions = (navData) => {
  const submitFn = navData.route.params ? navData.route.params.submit : null;
  const routeParams = navData.route.params ? navData.route.params : {};
  return {
    title: routeParams.productId ? "Edit Product" : "Add Product",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Add"
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkamark"
          }
          onPress={submitFn}
        />
      </HeaderButtons>
    ),
  };
};

export const ProductsNavigator = (props) => {
  return (
    <Stack.Navigator screenOptions={defaultNavOptions}>
      <Stack.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ title: "Product Detail" }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: "Cart" }}
      />
    </Stack.Navigator>
  );
};

export const OrdersNavigator = (props) => {
  return (
    <Stack.Navigator screenOptions={defaultNavOptions}>
      <Stack.Screen
        name="Orders"
        component={OrderScreen}
        options={drawOptions}
      />
    </Stack.Navigator>
  );
};

export const AdminNavigator = (props) => {
  return (
    <Stack.Navigator screenOptions={defaultNavOptions}>
      <Stack.Screen
        name="UserProducts"
        component={UserProductScreen}
        options={adminDrawOptions}
      />
      <Stack.Screen name="EditProduct" component={EditProductScreen} />
    </Stack.Navigator>
  );
};

export const DrawerNavigator = (props) => {
  return (
    <Drawer.Navigator drawerContentOptions={{ activeTintColor: Colors.accent }}>
      <Drawer.Screen
        name="Products"
        component={ProductsNavigator}
        options={{
          title: "Products",
          drawerIcon: () => (
            <Ionicons
              name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              size={24}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{
          title: "Orders",
          drawerIcon: () => (
            <Ionicons
              name={Platform.OS === "android" ? "md-list" : "ios-list"}
              size={24}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="AdminNavigator"
        component={AdminNavigator}
        options={{
          title: "Admin",
          drawerIcon: () => (
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={24}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
