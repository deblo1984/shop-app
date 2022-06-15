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

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
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
        options={{
          title: "Orders",
          headerLeft: (navData) => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Menu"
                iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                onPress={() => {
                  props.navigation.dispatch(DrawerActions.toggleDrawer());
                }}
              />
            </HeaderButtons>
          ),
        }}
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
        options={{
          title: "User Products",
          headerLeft: (navData) => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Menu"
                iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                onPress={() => {
                  props.navigation.dispatch(DrawerActions.toggleDrawer());
                }}
              />
            </HeaderButtons>
          ),
        }}
      />
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
