import { create } from "zustand";
import apiInstance from "../http";

export const useAuthStore = create((set, get) => ({
  userAuthInformation: {
    accessToken: null,
    refreshToken: null,
    isLogin: false,
  },

  errors: {
    status: null,
    message: null,
  },

  login: async (email, password) => {
    try {
      const data = await apiInstance.post("/signin", { email, password }).data;
      get((state) => {
        state.setUserAuthInformation(data);
      });
    } catch (error) {
      set((state) => ({
        errors: {
          status: error.response.data.status,
          message: error.response.data.message,
        },
      }));
    }
  },

  registration: async (email, password) => {
    console.log("inside registration");
    try {
      const data = await apiInstance.post("/signup", { email, password });
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  },

  logoutFromApp: () =>
    set((state) => {
      logout();
      state.userAuthInformation = userAuthInformationDeffault;
    }),

  getAccessToken: () =>
    get((state) => {
      return state.userAuthInformation.accessToken;
    }),

  setUserAuthInformation: (information) =>
    set((state) => ({
      userAuthInformation: {
        accessToken: information?.accessToken,
        refreshToken: information?.refreshToken,
        isLogin:
          information?.isLogin ||
          information?.accessToken !== (null || undefined),
        ...state.userAuthInformation,
      },
    })),
}));
