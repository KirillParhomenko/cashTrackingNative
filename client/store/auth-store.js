import { create } from "zustand";
import { logout, signin, signup } from "../services/auth-service";

export const useAuthStore = create((set, get) => ({
  userAuthInformation: {
    accessToken: null,
    refreshToken: null,
    isLogin: false,
  },

  error: {
    status: null,
    message: null,
  },

  login: async (email, password) => {
    const res = await signin(email, password);

    if (res instanceof Error) {
      set((state) => ({ error: { status: res.status, message: res.message } }));
      return;
    }
    set((state) => ({
      userAuthInformation: {
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
        isLogin: res.accessToken !== null,
      },
    }));
  },

  registration: async (email, password, fullName) => {
    const res = signup(email, password, fullName);
    if (res instanceof Error) {
      set((state) => ({ error: { status: res.status, message: res.message } }));
    }
    set((state) => ({
      userAuthInformation: {
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
        isLogin: res.accessToken !== null,
      },
    }));
  },

  logout: async () => {
    const res = await logout(get().userAuthInformation.refreshToken);

    if (res instanceof Error) {
      set((state) => ({ error: { status: res.status, message: res.message } }));
    }

    set((state) => ({
      userAuthInformation: {
        accessToken: null,
        refreshToken: null,
        isLogin: false,
      },
    }));
  },

  setUserAuthInformation: (information) => {
    set((state) => ({
      userAuthInformation: {
        ...state.userAuthInformation,
        accessToken: information?.accessToken,
        refreshToken: information?.refreshToken,
        isLogin:
          information?.isLogin ||
          information?.accessToken !== (null || undefined),
      },
    }));
  },
}));
