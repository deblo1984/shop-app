import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DrawerNavigator } from "./shopNavigator";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";

const Stack = createStackNavigator();

const AppNavigator = (props) => {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
