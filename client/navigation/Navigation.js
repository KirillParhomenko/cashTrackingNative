import MainScreen from "../screens/main/MainScreen";
import { Signup } from "../screens/authentification/Signup";
import { Signin } from "../screens/authentification/Signin";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthentificationMain } from "../screens/authentification/Main";
import Toast from "react-native-toast-message";
import { toastConfig } from "../configs/toastConfig";
import { useAuthStore } from "../store/auth-store";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingComponent from "../components/loading/LoadingComponent";
import CategoryInfo from "../components/category/mainList/CategoryInfo";
import TransactionInfo from "../components/transaction/TransactionInfo";
import AddTransaction from "../components/transaction/AddTransaction";
import PickCurrency from "../components/transaction/currency/PickCurrency";
import Categories from "../components/category/Categories";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Entypo";
import MoneyIcon from "react-native-vector-icons/FontAwesome5";
import ProfileIcon from "react-native-vector-icons/AntDesign";
import BalanceAccountScreen from "../screens/main/BalanceAccountScreen";
import BalanceAccountElementInfo from "../components/balanceAccount/AddBalanceAccount";
import AddBalanceAccount from "../components/balanceAccount/AddBalanceAccount";
import Profile from "../screens/main/Profile";

const Tab = createBottomTabNavigator();
const TabNavigatorMain = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={MainScreen}
        options={{
          title: "Главная",
          tabBarIcon: ({ size, color }) => {
            return <Icon name="home" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="BalanceAcccounts"
        component={BalanceAccountScreen}
        options={{
          title: "Счета",
          tabBarIcon: ({ size, color }) => {
            return (
              <MoneyIcon name="money-bill-wave-alt" size={size} color={color} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Профиль",
          tabBarIcon: ({ size, color }) => {
            return <ProfileIcon name="profile" size={size} color={color} />;
          },
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

const Navigation = ({ isLogin, isLoading }) => {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {isLoading && (
            <Stack.Screen name="Loading" component={LoadingComponent} />
          )}
          {!isLogin && !isLoading && (
            <>
              <Stack.Screen
                name="AuthentificationHome"
                component={AuthentificationMain}
              />
              <Stack.Screen name="SignIn" component={Signin} />
              <Stack.Screen name="SignUp" component={Signup} />
            </>
          )}
          {isLogin && !isLoading && (
            <>
              <Stack.Screen name="Main" component={TabNavigatorMain} />
              <Stack.Screen name="CategoryInfo" component={CategoryInfo} />
              <Stack.Screen
                name="TransactionInfo"
                component={TransactionInfo}
              />
              <Stack.Screen name="AddTransaction" component={AddTransaction} />
              <Stack.Screen name="PickCurrency" component={PickCurrency} />
              <Stack.Screen name="Category" component={Categories} />
              <Stack.Screen
                name="AddBalanceAccount"
                component={AddBalanceAccount}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </>
  );
};

export default Navigation;
