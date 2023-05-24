import { ScrollView, View } from "react-native";
import { useCashStore } from "../../store/cash-store";
import BalanceAccountElement from "./BalanceAccountElement";

const BalanceAccountsList = ({ navigation }) => {
  const balanceAccounts = useCashStore(
    (state) => state.cashInformation.balanceAccounts
  );
  return (
    <View style={{ height: "80%" }}>
      <ScrollView>
        {balanceAccounts.map((balanceAccount, index) => {
          return (
            <BalanceAccountElement
              data={balanceAccount}
              key={index}
              navigation={navigation}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default BalanceAccountsList;
