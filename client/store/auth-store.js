import { create } from "zustand";
import { logout, signin, signup } from "../services/auth-service";
import { AxiosError } from "axios";
import { useCashStore } from "./cash-store";
import {
  registrationSetting,
  getBalanceAccounts,
} from "../services/cash-service";



export const useAuthStore = create((set, get) => ({
  userAuthInformation: {
    accessToken: null,
    refreshToken: null,
    user: {
      id: null,
      email: null,
      fullName: null,
      isActivated: null,
    },
    withoutAuth: false,
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
          user: {
            id: res?.user?.id,
            email: res?.user?.email,
            fullName: res?.user?.fullName,
            isActivated: res?.user?.isActivated,
          },
          isLogin: res.accessToken !== null,
        },
      }));
      return res?.user?.id;
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
      await registrationSetting(res.user.id);
      set((state) => ({
        userAuthInformation: {
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
          user: {
            id: res?.user?.id,
            email: res?.user?.email,
            fullName: res?.user?.fullName,
            isActivated: res?.user?.isActivated,
          },
          isLogin: res.accessToken !== null,
        },
      }));
      return res?.user?.id;
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
        user: {
          id: null,
          email: null,
          fullName: null,
          isActivated: null,
        },
        isLogin: false,
        withoutAuth: false,
      },
    }));
  },

  setUserAuthInformation: (information) => {
    set((state) => ({
      userAuthInformation: {
        ...state.userAuthInformation,
        accessToken: information?.accessToken,
        refreshToken: information?.refreshToken,
        user: {
          id: information?.user?.id,
          email: information?.user?.email,
          fullName: information?.user?.fullName,
          isActivated: information?.user?.isActivated,
        },
        isLogin:
          information?.isLogin ||
          information?.accessToken !== (null || undefined) ||
          information.withoutAuth,
      },
    }));
  },

  setUserWithoutAuth: () => {
    set((state) => ({
      userAuthInformation: {
        accessToken: null,
        refreshToken: null,
        withoutAuth: true,
        isLogin: true,
      },
    }));
  },

  clearError: () => {
    set((state) => ({ error: { status: null, message: null } }));
  },
}));
