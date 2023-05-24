import { View } from "react-native";
import { ARButton } from "../../components/UI/Button";
import { useCashStore } from "../../store/cash-store";
import { useAuthStore } from "../../store/auth-store";

const Profile = () => {
  const onLogout = useAuthStore((state) => state.logout);
  const deleteLocalInformation = useCashStore(
    (state) => state.deleteLocalInformation
  );
  return (
    <View style={{ height: "100%" }}>
      <ARButton
        style={{
          width: "90%",
          height: 60,
          fontSize: 15,
          fontWeight: 600,
          color: "white",
          bc: "#9c4aff",
        }}
        onPressHandler={() => {
          onLogout();
          deleteLocalInformation();
        }}
      >
        SIGN IN
      </ARButton>
    </View>
  );
};

export default Profile;
