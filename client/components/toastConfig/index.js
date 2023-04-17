import { Text, View } from "react-native";

import { BaseToast, ErrorToast } from "react-native-toast-message";

export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "pink" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "400",
      }}
    />
  ),

  error: ({ text1, text2 }) => (
    <View
      style={{
        width: "90%",
        backgroundColor: "#ff3333",
        borderRadius: 10,
        padding: 10,
      }}
    >
      <Text
        style={{
          paddingLeft: 10,
          fontSize: 22,
          fontWeight: 700,
          color: "white",
        }}
      >
        {text1}
      </Text>
      <View
        style={{
          height: 1,
          width: "95%",
          backgroundColor: "white",
          alignSelf: "center",
        }}
      ></View>
      <Text style={{ paddingLeft: 15, marginTop: 5, color: "white" }}>
        {text2}
      </Text>
    </View>
  ),
};
