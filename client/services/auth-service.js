import { apiAuthInstance } from "../http";
import * as SecureStore from "expo-secure-store";

export const signup = async (email, password, fullName) => {
  try {
    const response = await apiAuthInstance.post("/signup", { email, password, fullName });

    const responseData = response.data;
    const tokens = {
      accessToken: responseData.accessToken,
      refreshToken: responseData.refreshToken,
    };

    await SecureStore.setItemAsync("token", JSON.stringify(tokens));

    return tokens;
  } catch (error) {
    return error.response;
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

    return tokens;
  } catch (error) {
    return error.response;
  }
};

export const logout = async (refreshToken) => {
  try {
    const response = await apiAuthInstance.post("/logout", { refreshToken });

    const responseData = response.data;

    await SecureStore.deleteItemAsync("token");

    return responseData;
  } catch (error) {
    return error.response;
  }
};
