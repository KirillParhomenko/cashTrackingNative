import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import * as Keychain from "react-native-keychain";
import { useAuthStore } from "../store/auth-store";

const API_URL = "http://192.168.100.43:5000/api";

export const apiAuthInstance = axios.create({ baseURL: API_URL });

export const apiInstance = axios.create({ baseURL: API_URL });

apiInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${useAuthStore((state) =>
      state.getAccessToken()
    )}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const refreshAuthLogic = async (failedRequest) => {
  const data = {
    refreshToken: useAuthStore(
      (state) => state.userAuthInformation.refreshToken
    ),
  };

  const options = {
    method: "POST",
    data,
    url: "http://localhost:5000/api/refresh",
  };

  return axios(options)
    .then(async (accessTokenResponse) => {
      failedRequest.response.config.headers.Authorization = `Bearer ${accessTokenResponse.data.accessToken}`;

      useAuthStore((state) =>
        state.setUserAuthInformation({
          accessToken: accessTokenResponse.data.accessToken,
        })
      );

      await Keychain.setGenericPassword(
        "token",
        JSON.stringify({
          accessToken: accessTokenResponse.data.accessToken,
          refreshToken: useAuthStore(
            (state) => state.userAuthInformation.refreshToken
          ),
        })
      );

      return Promise.resolve();
    })
    .catch((error) => {
      useAuthStore((state) =>
        state.setUserAuthInformation({
          accessToken: null,
          refreshToken: null,
          isLogin: false,
        })
      );
    });
};

createAuthRefreshInterceptor(apiInstance, refreshAuthLogic, {});

