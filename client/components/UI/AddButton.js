import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const AddButton = ({ navigation, navigateTo, size, style }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#be5941",
        position: "absolute",
        width: size,
        height: size,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        ...style,
      }}
      onPress={() => {
        navigation.navigate(navigateTo);
      }}
    >
      <Icon name="plus" size={size * 0.6} color="black" />
    </TouchableOpacity>
  );
};

export default AddButton;
