import { View, FlatList, ScrollView } from "react-native";

import ListElement from "./ListElement";

const MainList = ({ data, navigation }) => {
  return (
    <View style={{ height: 300 }}>
      <ScrollView>
        {data?.data.map((element, index) => {
          console.log(element);
          return (
            <ListElement
              data={element}
              totalAmount={data?.totalAmount}
              navigation={navigation}
              key={index}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MainList;
