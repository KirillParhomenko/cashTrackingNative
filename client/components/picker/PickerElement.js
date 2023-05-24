import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Fontisto";
const PickerElement = ({ data, isPicked, changePickedItemIndex, index }) => {
  return (
    <TouchableOpacity
      style={{
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
      }}
      onPress={() => changePickedItemIndex(index)}
    >
      <View style={{ marginRight: 10 }}>
        <Icon
          name={isPicked ? "radio-btn-active" : "radio-btn-passive"}
          size={25}
          color="black"
          style={{ marginLeft: 10 }}
        />
      </View>
      <View>
        <Text style={{ fontSize: 30 }} numberOfLines={1}>
          {data?.name}
        </Text>
        <Text numberOfLines={1}>
          {data?.balance.toFixed(1) + " "}
          {data?._currency?.abbreviation
            ? data?._currency?.abbreviation
            : "RUB"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PickerElement;
