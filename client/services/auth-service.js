import { apiAuthInstance } from "../http";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const signinWithoutAuth = async () => {
  try {
    const data = { withoutAuth: true };
    await SecureStore.setItemAsync("token", JSON.stringify(data));
    return data;
  } catch (error) {
    return error;
  }
};

export const signup = async (email, password, fullName) => {
  try {
    const response = await apiAuthInstance.post("/signup", {
      email,
      password,
      fullName,
    });

    const responseData = response.data;
    const tokens = {
      accessToken: responseData.accessToken,
      refreshToken: responseData.refreshToken,
    };

    await SecureStore.setItemAsync("token", JSON.stringify(tokens));
    await AsyncStorage.setItem("@authInfo", JSON.stringify(responseData.user));

    return responseData;
  } catch (error) {
    return error;
  }
};

export const signin = async (email, password) => {
  try {
    const response = await apiAuthInstance.post("/signin", { email, password });

    const responseData = response.data;

    const tokens = {
      accessToken: responseData.accessToken,
      refreshToken: responseData.refreshToken,
    };

    await SecureStore.setItemAsync("token", JSON.stringify(tokens));
    await AsyncStorage.setItem("@authInfo", JSON.stringify(responseData.user));

    return responseData;
  } catch (error) {
    return error;
  }
};

export const logout = async (refreshToken) => {
  try {
    const response = await apiAuthInstance.post("/logout", { refreshToken });

    const responseData = response.data;

    await SecureStore.deleteItemAsync("token");
    await AsyncStorage.removeItem("@authInfo");

    return responseData;
  } catch (error) {
    return error;
  }
};
