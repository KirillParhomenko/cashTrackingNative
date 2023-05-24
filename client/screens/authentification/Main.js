import { View, Text, TouchableOpacity } from "react-native";

import styled from "styled-components/native";

import { ARButton } from "../../components/UI/Button";
import { signinWithoutAuth } from "../../services/auth-service";
import { useAuthStore } from "../../store/auth-store";
import { useQuery } from "@tanstack/react-query";

export const AuthentificationMain = ({ navigation }) => {
  const setWithoutAuth = useAuthStore((state) => state.setUserWithoutAuth);
  return (
    <Wrapper>
      <View style={{ width: "80%", alignSelf: "center" }}>
        <Text
          style={{
            textAlign: "center",
            color: "black",
            fontSize: 40,
            fontWeight: "700",
          }}
        >
          Best way to track your money!
        </Text>
      </View>
      <View style={{ gap: 20, marginTop: 60, marginBottom: 60 }}>
        <ARButton
          style={{
            width: "80%",
            height: 70,
            fontSize: 15,
            fontWeight: 600,
            color: "white",
            bc: "#9c4aff",
          }}
          onPressHandler={() => {
            navigation.navigate("SignUp");
          }}
        >
          SIGN UP
        </ARButton>
        <ARButton
          style={{
            width: "80%",
            height: 70,
            fontSize: 15,
            fontWeight: 600,
            color: "black",
            bc: "white",
            borderColor: "black",
          }}
          onPressHandler={() => {
            navigation.navigate("SignIn");
          }}
        >
          SIGN IN
        </ARButton>
        <TouchableOpacity
          style={{ alignSelf: "center" }}
          onPress={() => {
            signinWithoutAuth();
            setWithoutAuth();
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: 600, color: "#2E4181" }}>
            Continue use app without authorization
          </Text>
        </TouchableOpacity>
      </View>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  height: 100%;
  flex-direction: column;
  justify-content: flex-end;
`;
