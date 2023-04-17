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
import { Ionicons } from "@expo/vector-icons";

import { ARButton } from "../UI/Button";
import { useAuthStore } from "../../store/auth-store";
import React, { useEffect } from "react";
import Toast from "react-native-toast-message";

export const Signup = ({ navigation }) => {
  const [fullName, setFullName] = React.useState("Kirill Parhomenko");
  const [email, setEmail] = React.useState("kirya.parxomenko@gmail.com");
  const [password, setPassword] = React.useState("somebodyknow1");
  const [isFullNameValid, setIsFullNameValid] = React.useState(null);
  const [isEmailValid, setIsEmailValid] = React.useState(null);
  const [isPasswordValid, setIsPasswordValid] = React.useState(null);
  const [showPassword, setShowPassword] = React.useState(false);

  const onRegistration = useAuthStore((state) => state.registration);
  const authError = useAuthStore((state) => state.error);
  const authErrorClear = useAuthStore((state) => state.clearError);

  useEffect(() => {
    if (authError.message !== null) {
      Toast.show({
        type: "error",
        text1: "Registration Error",
        text2: authError.message,
      });
      authErrorClear();
    }
  }, [authError]);

  useEffect(() => {
    const cleanUp = setTimeout(() => {
      if (fullName.length !== 0) {
        setIsFullNameValid(/^[a-zA-Z]+ [a-zA-Z]+$/.test(fullName));
      }
    }, 500);

    return () => {
      clearTimeout(cleanUp);
    };
  }, [fullName]);

  useEffect(() => {
    const cleanUp = setTimeout(() => {
      if (email.length !== 0) {
        setIsEmailValid(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email));
      }
    }, 500);

    return () => {
      clearTimeout(cleanUp);
    };
  }, [email]);

  useEffect(() => {
    const cleanUp = setTimeout(() => {
      if (password.length !== 0) {
        setIsPasswordValid(/^.{6,30}$/.test(password));
      }
    }, 500);

    return () => {
      clearTimeout(cleanUp);
    };
  }, [password]);

  const onSubmit = () => {
    if (isEmailValid && isPasswordValid && isFullNameValid) {
      onRegistration(email, password, fullName);
    }
  };

  const showPasswordToggle = () => {
    setShowPassword(!showPassword);
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
              Registration
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
                I'm already a member.
              </PreInputText>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SignIn");
                }}
              >
                <PreInputText
                  style={{
                    marginLeft: 0,
                    fontSize: 15,
                    color: "#2E4181",
                    fontWeight: "700",
                  }}
                >
                  Sign in
                </PreInputText>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <PreInputText>Full name</PreInputText>
            <Input
              style={
                !isFullNameValid &&
                isFullNameValid !== null && {
                  borderColor: "red",
                  borderWidth: 1,
                }
              }
              value={fullName}
              onChangeText={(fullName) => {
                setFullName(fullName);
              }}
            />
            {!isFullNameValid && isFullNameValid !== null && (
              <PreInputText
                style={{
                  position: "absolute",
                  right: 0,
                  bottom: -25,
                  color: "red",
                }}
              >
                Incorrect Full Name
              </PreInputText>
            )}
          </View>
          <View>
            <PreInputText>Email Address</PreInputText>
            <Input
              style={
                !isEmailValid &&
                isEmailValid !== null && { borderColor: "red", borderWidth: 1 }
              }
              value={email}
              onChangeText={(email) => {
                setEmail(email);
              }}
            />
            {!isEmailValid && isEmailValid !== null && (
              <PreInputText
                style={{
                  position: "absolute",
                  right: 0,
                  bottom: -25,
                  color: "red",
                }}
              >
                Email Address must be correct
              </PreInputText>
            )}
          </View>
          <View>
            <PreInputText>Password</PreInputText>
            <View
              style={{
                position: "relative",
                justifyContent: "center",
              }}
            >
              <Input
                style={
                  ({ paddingRight: 60 },
                  !isPasswordValid &&
                    isPasswordValid !== null && {
                      borderColor: "red",
                      borderWidth: 1,
                    })
                }
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={(password) => {
                  setPassword(password);
                }}
              />
              <TouchableOpacity
                style={{
                  position: "absolute",
                  right: "10%",
                }}
                onPress={() => showPasswordToggle()}
              >
                {!showPassword && (
                  <Ionicons name="eye" size={30} color="#9c4aff" />
                )}
                {showPassword && (
                  <Ionicons name="eye-off" size={30} color="#9c4aff" />
                )}
              </TouchableOpacity>
              {!isPasswordValid && isPasswordValid !== null && (
                <PreInputText
                  style={{
                    position: "absolute",
                    right: 0,
                    bottom: -25,
                    color: "red",
                  }}
                >
                  Password must be between 6 and 30 letters
                </PreInputText>
              )}
            </View>
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
              onPressHandler={() => {
                onSubmit();
              }}
            >
              SIGN UP
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
