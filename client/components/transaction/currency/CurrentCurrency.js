import { TouchableOpacity, View, Text } from "react-native";

const CurrentCurrency = ({
  navigation,
  initialCurrency,
  changeConvertTo,
  pickedCurrency,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("PickCurrency", {
          currency:
            Object.keys(pickedCurrency).length === 0
              ? initialCurrency
              : pickedCurrency,
          changeConvertTo,
        });
      }}
    >
      <Text style={{ fontSize: 25, fontWeight: 600 }}>
        {Object.keys(pickedCurrency).length === 0
          ? initialCurrency?.abbreviation
          : pickedCurrency?.abbreviation}
      </Text>
    </TouchableOpacity>
  );
};

export default CurrentCurrency;
