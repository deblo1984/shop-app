import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Button, Platform, SafeAreaView, View } from "react-native";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { DrawerActions } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import CustomHeaderButton from "../components/ui/CustomHeaderButton";
import Colors from "../constants/Colors";
import * as authAction from "../store/actions/auth";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrderScreen from "../screens/shop/OrderScreen";
import UserProductScreen from "../screens/user/UserProductScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import AuthScreen from "../screens/user/AuthScreen";
import StartupScreen from "../screens/StartupScreen";

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
    title: "Admin",
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
  const dispatch = useDispatch();
  return (
    <Drawer.Navigator
      drawerContentOptions={{ activeTintColor: Colors.accent }}
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <DrawerItemList {...props} />
              <Button
                title="Logout"
                color={Colors.primary}
                onPress={() => {
                  dispatch(authAction.logout());
                  props.navigation.navigate("Auth");
                }}
              />
            </SafeAreaView>
          </View>
        );
      }}
    >
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

export const AuthNavigator = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserAuth" component={AuthScreen} />
    </Stack.Navigator>
  );
};

export const MainNavigator = (props) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Startup" component={StartupScreen} />
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="Home" component={DrawerNavigator} />
    </Stack.Navigator>
  );
};
