import { Text, View } from "react-native";
import CategoryIcon from "./CategoryIcon";

const Category = ({ iconName, color, typeIcon, name, isActive }) => {
  return (
    <View
      style={{
        alignItems: "center",
        alignSelf: "center",
      }}
    >
      <CategoryIcon
        iconName={iconName}
        typeIcon={typeIcon}
        color={color}
        isActive={isActive}
      />
      <Text>{name}</Text>
    </View>
  );
};

export default Category;
