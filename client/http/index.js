import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import * as SecureStore from "expo-secure-store";

const API_URL = "http://192.168.100.105:5000/api";

export const apiAuthInstance = axios.create({ baseURL: API_URL });

export const apiInstance = axios.create({ baseURL: API_URL });

apiInstance.interceptors.request.use(
  async (config) => {
    const accessToken = JSON.parse(
      await SecureStore.getItemAsync("token")
    ).accessToken;
    config.headers["Authorization"] = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

const refreshAuthLogic = async (failedRequest) => {
  const data = {
    refreshToken: JSON.parse(await SecureStore.getItemAsync("token"))
      .refreshToken,
  };

  const options = {
    method: "POST",
    data,
    url: "http://192.168.100.105:5000/api/refresh",
  };

  return axios(options)
    .then(async (accessTokenResponse) => {
      failedRequest.response.config.headers.Authorization = `Bearer ${accessTokenResponse.data.accessToken}`;

      await SecureStore.setItemAsync(
        "token",
        JSON.stringify({
          accessToken: accessTokenResponse.data.accessToken,
          ...data,
        })
      );

      return Promise.resolve();
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

createAuthRefreshInterceptor(apiInstance, refreshAuthLogic, {});
