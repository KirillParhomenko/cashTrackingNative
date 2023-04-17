import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import styled from "styled-components/native";

import { useAuthStore } from "./store/auth-store";
import { MainTest } from "./components/MainTest";
import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { Signin } from "./components/authentification/Signin";
import { Signup } from "./components/authentification/Signup";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthentificationMain } from "./components/authentification/Main";
import Toast from "react-native-toast-message";
import { toastConfig } from "./components/toastConfig";

export default function App() {
  const isLogin = useAuthStore((state) => state.userAuthInformation.isLogin);
  const setAuthData = useAuthStore((state) => state.setUserAuthInformation);
  const data = useAuthStore((state) => state.userAuthInformation);

  useEffect(() => {
    const takeTokens = async () => {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        setAuthData(JSON.parse(token));
      }
    };
    takeTokens();
  }, []);

  const Stack = createNativeStackNavigator();

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {!isLogin && (
            <>
              <Stack.Screen
                name="AuthentificationHome"
                component={AuthentificationMain}
              />
              <Stack.Screen name="SignIn" component={Signin} />
              <Stack.Screen name="SignUp" component={Signup} />
            </>
          )}
          {isLogin && (
            <>
              <Stack.Screen name="Main" component={MainTest} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </>
  );
}
