import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import styled from "styled-components/native";

import { Authentication } from "./components/Authentication";
import { useAuthStore } from "./store/auth-store";
import { MainTest } from "./components/MainTest";
import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";

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

  return (
    <View>
      {!isLogin && <Authentication />}
      {isLogin && <MainTest />}
    </View>
  );
}
