import { TouchableOpacity, Text } from "react-native";

const CurrencyItem = ({ currency, style, changeConvertTo, navigation }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
        ...style,
      }}
      onPress={() => {
        changeConvertTo(currency);
        navigation.goBack();
      }}
    >
      <Text
        style={{ fontSize: 20, flex: 4, color: "#676767" }}
        numberOfLines={1}
      >
        {currency.name}
      </Text>
      <Text
        style={{ fontSize: 20, flex: 1, textAlign: "right", color: "#676767" }}
      >
        {currency.abbreviation}
      </Text>
    </TouchableOpacity>
  );
};

export default CurrencyItem;
