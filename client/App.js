import Navigation from "./navigation/Navigation";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";
import { PortalProvider } from "@gorhom/portal";

import { useAuthStore } from "./store/auth-store";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getBalanceAccounts } from "./services/cash-service";
import { useCashStore } from "./store/cash-store";

function App() {
  const isLogin = useAuthStore((state) => state.userAuthInformation.isLogin);
  const setAuthData = useAuthStore((state) => state.setUserAuthInformation);
  const authData = useAuthStore((state) => state.userAuthInformation);
  const setWithoutAuth = useAuthStore((state) => state.setUserWithoutAuth);
  const [isLoading, setIsLoading] = useState(true);
  const isLoadingUpdateData = useCashStore((state) => state.isLoading);
  const updateStoreInformation = useCashStore(
    (state) => state.updateStoreInformation
  );

  const category = useCashStore((state) => state.cashInformation.categories);
  console.log(category);
  useEffect(() => {
    const takeTokens = async () => {
      const token = JSON.parse(await SecureStore.getItemAsync("token"));
      const userInfo = JSON.parse(await AsyncStorage.getItem("@authInfo"));
      if (token) {
        if ("accessToken" in token && "refreshToken" in token && userInfo) {
          const data = { ...token, user: userInfo };
          setAuthData(data);
          if (isLogin) {
            await updateStoreInformation();
          }
        }
        if ("withoutAuth" in token) {
          setWithoutAuth();
        }
      }
      setIsLoading(false);
    };

    takeTokens();
  }, [isLogin]);
  return (
    <PortalProvider>
      <Navigation
        isLoading={isLoading || isLoadingUpdateData}
        isLogin={isLogin}
      />
    </PortalProvider>
  );
}

export default App;
