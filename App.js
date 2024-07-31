import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./app/login/MainNavigator";
import LoginProvider from "./app/login/context/LoginProvider";
import client from "./app/api/client";
import ValidMessage from "./app/login/components/ValidMessage";

export default function App() {
  const [deprecatedVisible, setDeprecatedVisible] = useState(false);

  const getTest = async () => {
    try {
      const res = await client.get("api/imudata");
      const apps = res.data.imuDatas;

      const valid = apps.find((el) => el.name === "jump0");

      if (!valid) {
        setDeprecatedVisible(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTest();
  });
  return (
    <LoginProvider>
      <NavigationContainer>
        {!deprecatedVisible ? <MainNavigator /> : <ValidMessage />}
      </NavigationContainer>
    </LoginProvider>
  );
}
