import { View, Text, TouchableOpacity } from "react-native";

const CategoryInfoElement = ({ data, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("TransactionInfo", { data, navigation });
      }}
    >
      <View
        style={{
          flexDirection: "row",
          width: "90%",
          alignSelf: "center",
          alignItems: "flex-start",
          marginBottom: 5,
          paddingRight: 10,
          paddingLeft: 10,
          borderRadius: 10,
          backgroundColor: "white",
        }}
      >
        <View style={{ flex: 4 }}>
          <Text style={{ fontSize: 20, fontWeight: 400 }} numberOfLines={1}>
            {data?._category?.name}
          </Text>
          <Text
            style={{ fontSize: 15, fontWeight: 400, color: "#343434" }}
            numberOfLines={1}
          >
            {data?.description}
          </Text>
        </View>
        <View style={{ flex: 3, alignItems: "flex-end" }}>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={{ fontSize: 17, fontWeight: 400 }}>
              {data?.price.toFixed(1) + " "}
              {data?._balanceAccount?._currency?.abbreviation}
            </Text>
            <Text
              style={{ fontSize: 15, fontWeight: 400, color: "#343434" }}
              numberOfLines={1}
            >
              {data?._balanceAccount?.name}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryInfoElement;
