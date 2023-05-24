import { View, Text, FlatList } from "react-native";
import CategoryInfoElement from "./CategoryInfoElement";

const CategoryInfoList = ({ data, navigation }) => {
  return (
    <View>
      <View
        style={{
          width: "90%",
          alignSelf: "center",
          marginBottom: 5,
        }}
      >
        <Text style={{ fontSize: 16, color: "#343434" }}>
          {new Date(data[0]?.date).toLocaleDateString("ru", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Text>
      </View>
      <View>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <CategoryInfoElement data={item} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    </View>
  );
};

export default CategoryInfoList;
