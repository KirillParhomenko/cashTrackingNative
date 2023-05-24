import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const BalanceAccountElement = ({ data, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("AddBalanceAccount", {
          data,
          navigation,
          type: "change",
        });
      }}
    >
      <View
        style={{
          width: "90%",
          height: 60,
          backgroundColor: "white",
          alignSelf: "center",
          borderRadius: 15,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingRight: 20,
          paddingLeft: 20,
          marginBottom: 10,
        }}
      >
        <View
          style={{
            flex: 6,
          }}
        >
          <TextElement numberOfLines={1}>{data?.name}</TextElement>
        </View>
        <View style={{ flex: 3, alignItems: "flex-end" }}>
          <TextElement>
            {data?.balance.toFixed(1)} {data?._currency?.abbreviation}
          </TextElement>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const TextElement = styled.Text`
  font-size: 17;
  font-weight: 400;
`;

export default BalanceAccountElement;
