import { View } from "react-native";

const Header = ({ children, height, heightBackground }) => {
  return (
    <View style={{ height }}>
      {children}
      <View
        style={{
          position: "absolute",
          zIndex: -1,
          height: heightBackground,
          width: "100%",
          backgroundColor: "#9c4aff",
          borderBottomRightRadius: 50,
          borderBottomLeftRadius: 50,
        }}
      ></View>
    </View>
  );
};

export default Header;
