import { View, Text } from "react-native";
import { ARButton } from "./UI/Button";
import { useAuthStore } from "../store/auth-store";

export const MainTest = () => {
  const logout = useAuthStore((state) => state.logout);
  

  return (
    <View style={{ justifyContent: "center", height: "100%" }}>
      <Text style={{ alignSelf: "center" }}>U a logged in!</Text>
      <ARButton
        style={{
          width: "90%",
          height: 60,
          fontSize: 15,
          fontWeight: 600,
          color: "white",
          bc: "#9c4aff",
        }}
        onPressHandler={logout}
      >
        Logout
      </ARButton>
    </View>
  );
};
