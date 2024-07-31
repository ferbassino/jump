import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AppForm from "./components/form/AppForm";
import { useLogin } from "./context/LoginProvider";
import Home from "../application/Home";
import DrawerNavigator from "./DrawerNavigator";
import AppLoader from "./components/loader/AppLoader";
import ForgotPassword from "./components/form/ForgotPassword";
import Verification from "./components/form/Verification";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={AppForm} name="AppForm" />
      <Stack.Screen component={Home} name="Home" />
      <Stack.Screen component={ForgotPassword} name="ForgotPassword" />
      <Stack.Screen component={Verification} name="Verification" />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  const { isLoggedIn, loginPending } = useLogin();

  return isLoggedIn ? (
    <>
      <DrawerNavigator />
      {loginPending ? <AppLoader /> : null}
    </>
  ) : (
    <StackNavigator />
  );
};
export default MainNavigator;
