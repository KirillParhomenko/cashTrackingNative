import { create } from "zustand";
import { logout, signin, signup } from "../services/auth-service";
import { AxiosError } from "axios";

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
    if (res instanceof AxiosError) {
      set((state) => ({
        error: {
          status: res?.response?.status,
          message: res?.response?.data?.message,
        },
      }));
    } else {
      set((state) => ({
        userAuthInformation: {
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
          isLogin: res.accessToken !== null,
        },
      }));
    }
  },

  registration: async (email, password, fullName) => {
    const res = await signup(email, password, fullName);

    if (res instanceof AxiosError) {
      set((state) => ({
        error: {
          status: res?.response?.status,
          message: res?.response?.data?.message,
        },
      }));
    } else {
      set((state) => ({
        userAuthInformation: {
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
          isLogin: res.accessToken !== null,
        },
      }));
    }
  },

  logout: async () => {
    const res = await logout(get().userAuthInformation.refreshToken);

    if (res instanceof AxiosError) {
      set((state) => ({
        error: {
          status: res.repsonse.status,
          message: res.response.data.message,
        },
      }));
      return;
    }

    get((state) => {
      state.clearError();
    });
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

  clearError: () => {
    set((state) => ({ error: { status: null, message: null } }));
  },
}));
