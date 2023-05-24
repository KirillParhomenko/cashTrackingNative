import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Category from "../category/Category";
import CategoryIcon from "../category/CategoryIcon";

const ListElement = ({ data, totalAmount, navigation }) => {
  console.log("start");
  console.log(data);
  console.log("end");
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("CategoryInfo", data);
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
          paddingLeft: 10,
          marginBottom: 10,
        }}
      >
        <View
          style={{
            flex: 2,
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CategoryIcon
            iconName={data?.category?.logo}
            typeIcon="catalog"
            color={data?.color}
          />
        </View>
        <View
          style={{
            flex: 6,
            marginLeft: 5,
          }}
        >
          <TextElement numberOfLines={1}>{data?.category?.name}</TextElement>
        </View>
        <View style={{ flex: 2, alignItems: "center" }}>
          <TextElement style={{ color: "#656566" }}>
            {((data?.totalAmount / totalAmount) * 100).toFixed(0)}%
          </TextElement>
        </View>
        <View
          style={{
            flex: 5,
            alignItems: "flex-end",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <TextElement numberOfLines={1}>
            {data?.totalAmount.toFixed(0)}
          </TextElement>
          <TextElement> RUB</TextElement>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const TextElement = styled.Text`
  font-size: 17;
  font-weight: 400;
`;

export default ListElement;
