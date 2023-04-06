import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import styled from "styled-components/native";

import { Authentication } from "./components/Authentication";

export default function App() {
  return (
    <View>
      <Authentication />
    </View>
  );
}
