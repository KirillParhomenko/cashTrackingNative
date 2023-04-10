import { create } from "zustand";
import { signin, signup, logout } from "../services/auth-service";

const userAuthInformationDeffault = {
  id: "",
  email: "",
  isActivated: false,
  isAuth: false,
};

export const useAuthStore = create((set) => ({
  userAuthInformation: userAuthInformationDeffault,

  login: () =>
    set((state) => {
      const data = signin(
        state.userAuthInformation.email,
        state.userAuthInformation.password
      );
      state.userAuthInformation.id = data.user.id;
      state.userAuthInformation.isActivated = data.user.isActivated;
      localStorage.set("token", data.accessToken);
    }),

  registration: () => {
    set((state) => {
      const data = signup(
        state.userAuthInformation.email,
        state.userAuthInformation.password
      );
      state.userAuthInformation.id = data.user.id;
      state.userAuthInformation.isActivated = data.user.isActivated;
      localStorage.set("token", data.accessToken);
    });
  },
  logoutFromApp: () =>
    set((state) => {
      logout();
      state.userAuthInformation = userAuthInformationDeffault;
    }),
}));
