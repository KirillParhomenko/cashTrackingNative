import { View, Text } from "react-native";
import { ARButton } from "../../components/UI/Button";
import { useCashStore } from "../../store/cash-store";
import { useAuthStore } from "../../store/auth-store";
import Header from "./../../components/header/Header";
import styled from "styled-components/native";

const Profile = () => {
  const onLogout = useAuthStore((state) => state.logout);
  const deleteLocalInformation = useCashStore(
    (state) => state.deleteLocalInformation
  );
  const data = useAuthStore((state) => state.userAuthInformation.user);
  return (
    <View style={{ height: "100%" }}>
      <Header height={100} heightBackground={80}>
        <Text
          style={{
            fontSize: 25,
            color: "white",
            fontWeight: 600,
            alignSelf: "center",
            top: 20,
          }}
        >
          Профиль
        </Text>
      </Header>
      <View style={{ justifyContent: "space-between", height: "87%" }}>
        <View style={{ width: "90%", alignSelf: "center" }}>
          <View style={{ marginBottom: 20 }}>
            <TitleText>Имя:</TitleText>
            <InfoText>{data.fullName}</InfoText>
          </View>
          <View>
            <TitleText>Почта:</TitleText>
            <InfoText>{data.email}</InfoText>
            {data.isActivated ? (
              <Text style={{ fontSize: 25, marginTop: 20, color: "green" }}>
                Почта активирована
              </Text>
            ) : (
              <Text style={{ fontSize: 20, marginTop: 20, color: "red" }}>
                Почта не активирована
              </Text>
            )}
          </View>
        </View>
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
          Выйти
        </ARButton>
      </View>
    </View>
  );
};

const TitleText = styled.Text`
  color: #555555;
  font-size: 15;
`;

const InfoText = styled.Text`
  color: black;
  font-size: 20;
`;

export default Profile;
