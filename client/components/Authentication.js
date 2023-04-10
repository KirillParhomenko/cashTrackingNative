import {
  View,
  Image,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import styled from "styled-components/native";

import { ARButton } from "./UI/Button";
import { useAuthStore } from "../store/auth-store";
import { useState } from "react";

export const Authentication = () => {
  const { email, setEmail } = useState("");
  const { password, setPassword } = useState("");
  const login = useAuthStore((state) => state.login);
  const registration = useAuthStore((state) => state.registration);

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  return (
    <KeyboardAvoidingView behavior="content">
      <Wrapper>
        <FormWrapper>
          <View>
            <Text
              style={{
                alignSelf: "center",
                color: "black",
                fontSize: 30,
                fontWeight: "700",
              }}
            >
              Welcome back!
            </Text>
            <View
              style={{
                alignSelf: "center",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <PreInputText
                style={{
                  marginLeft: 0,
                  fontSize: 15,
                }}
              >
                Don't have an account?
              </PreInputText>
              <PreInputText
                style={{
                  marginLeft: 0,
                  fontSize: 15,
                  color: "#2E4181",
                }}
              >
                {" "}
                Register
              </PreInputText>
            </View>
          </View>
          <View>
            <PreInputText>Email Address</PreInputText>
            <Input value={email} onChange={emailHandler} />
          </View>
          <View>
            <PreInputText>Password</PreInputText>
            <Input
              secureTextEntry={true}
              value={password}
              onChange={passwordHandler}
            />
          </View>
          <View>
            <ARButton
              style={{
                width: "90%",
                height: 60,
                fontSize: 15,
                fontWeight: 600,
                color: "white",
                bc: "#9c4aff",
              }}
            >
              SIGN IN
            </ARButton>
            <PreInputText
              style={{
                alignSelf: "center",
                marginLeft: 0,
                fontSize: 15,
                paddingTop: 5,
                paddingBottom: 5,
              }}
            >
              Or
            </PreInputText>
            <ARButton
              style={{
                width: "90%",
                height: 60,
                fontSize: 15,
                fontWeight: 600,
                color: "white",
                bc: "#9c4aff",
              }}
            >
              GMAIL
            </ARButton>
          </View>
        </FormWrapper>
      </Wrapper>
    </KeyboardAvoidingView>
  );
};

const Wrapper = styled.View`
  height: 100%;
  flex-direction: column;
  justify-content: flex-end;
`;

const FormWrapper = styled.View`
  flex-direction: column;
  gap: 30;
  padding-top: 30;
  padding-bottom: 30;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  border-top-start-radius: 40;
  border-top-end-radius: 40;
`;

const Input = styled.TextInput`
  width: 90%;
  border-radius: 10;
  padding-left: 20;
  padding-right: 20;
  align-self: center;
  font-size: 20;
  height: 60;
  background-color: white;
`;

const PreInputText = styled.Text`
  margin-left: 10%;
  color: #787878;
  font-size: 12;
  padding-bottom: 5;
`;
