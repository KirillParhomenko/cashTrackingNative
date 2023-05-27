import { ScrollView, View, Text } from "react-native";
import { useCashStore } from "../../../store/cash-store";
import CurrencyItem from "./CurrencyItem";
import Header from "../../header/Header";

const PickCurrency = ({ navigation, route }) => {
  const currencies = useCashStore((state) => state.cashInformation.currencies);
  return (
    <View style={{ height: "100%" }}>
      <Header height={80} heightBackground={80}>
        <Text
          style={{
            fontSize: 20,
            color: "white",
            fontWeight: 600,
            alignSelf: "center",
            top: 30,
          }}
        >
          Выберите валюту
        </Text>
      </Header>
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
