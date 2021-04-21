import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { ShmotAppNavigator, AuthNavigator } from "./ShmotNavigator";
import StartupScreen from "../screens/StartupScreen";
import * as authSelector from "../store/selectors/auth";

const AppNavigator = () => {
  const isAuth = useSelector(authSelector.getAuthToken);
  const didTryAutoLogin = useSelector(authSelector.getDidTryAutoLogin);

  return (
    <NavigationContainer>
      {isAuth && <ShmotAppNavigator />}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
