import { TouchableOpacity, Text } from "react-native";

export const ARButton = ({ children, style, icon, onPressHandler }) => {
  return (
    <TouchableOpacity
      style={{
        width: style.width,
        height: style.height,
        borderRadius: 10,
        backgroundColor: style.bc,
        borderColor: style.borderColor,
        borderWidth: style.borderColor ? 1 : null,
        justifyContent: "center",
        alignSelf: "center",
      }}
      onPress={onPressHandler}
    >
      {icon}
      <Text
        style={{
          alignSelf: "center",
          color: style.color,
          fontSize: style.fontSize,
          fontWeight: style.fontWeight,
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};
