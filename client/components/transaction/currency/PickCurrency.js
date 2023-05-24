import { ScrollView, View } from "react-native";
import { useCashStore } from "../../../store/cash-store";
import CurrencyItem from "./CurrencyItem";

const PickCurrency = ({ navigation, route }) => {
  const currencies = useCashStore((state) => state.cashInformation.currencies);
  return (
    <View style={{ height: "100%" }}>
      <ScrollView>
        {currencies.map((currency, index) => {
          return (
            <CurrencyItem
              key={index}
              currency={currency}
              style={
                currency._id === route.params.currency._id
                  ? { backgroundColor: "#a2a2a2" }
                  : {}
              }
              changeConvertTo={route.params.changeConvertTo}
              navigation={navigation}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default PickCurrency;
