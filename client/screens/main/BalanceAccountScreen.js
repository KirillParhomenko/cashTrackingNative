import { View, Text } from "react-native";
import BalanceAccountsList from "../../components/balanceAccount/BalanceAccountsList";
import { useCashStore } from "../../store/cash-store";
import { ARButton } from "../../components/UI/Button";
import Header from "./../../components/header/Header";

const BalanceAccountScreen = ({ navigation }) => {
  const totalBalanceAccount = useCashStore(
    (state) => state.totalBalanceAccount
  );
  return (
    <View style={{ height: "100%" }}>
      <Header height={120} heightBackground={100}>
        <View style={{ alignSelf: "center", top: 10 }}>
          <Text style={{ alignSelf: "center", fontSize: 25, color: "white" }}>
            {totalBalanceAccount.name}:
          </Text>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 30,
              fontWeight: 600,
              color: "white",
            }}
          >
            {totalBalanceAccount.balance.toFixed(1)} RUB
          </Text>
        </View>
      </Header>
      <View>
        <BalanceAccountsList navigation={navigation} />
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
            navigation.navigate("AddBalanceAccount", { navigation });
          }}
        >
          Добавить
        </ARButton>
      </View>
    </View>
  );
};

export default BalanceAccountScreen;
