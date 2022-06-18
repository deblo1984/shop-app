import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigator } from "./shopNavigator";

import { useSelector } from "react-redux";

const AppNavigator = (props) => {
  const isAuth = useSelector((state) => !!state.auth.token);

  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
