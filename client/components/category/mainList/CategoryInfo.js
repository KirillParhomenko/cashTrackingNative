import { View, FlatList, Text, ActivityIndicator } from "react-native";

import { useEffect, useState } from "react";

import CategoryInfoList from "./CategoryInfoList";
import Header from "../../header/Header";

const CategoryInfo = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    let finallData = [];
    route?.params?.transactions.forEach((transaction, index) => {
      const indexInArray = finallData.findIndex((element) => {
        return (
          new Date(element[0]?.date).toDateString() ===
          new Date(transaction?.date).toDateString()
        );
      });
      if (indexInArray !== -1) {
        finallData[indexInArray].push(transaction);
      } else {
        finallData.push([transaction]);
      }
    });
    finallData = finallData.map((transactions) => {
      return transactions.sort((firstTransaction, secondTransaction) => {
        return (
          new Date(secondTransaction.date) - new Date(firstTransaction.date)
        );
      });
    });
    finallData = finallData.sort((firstTransaction, secondTransaction) => {
      return (
        new Date(secondTransaction[0].date) - new Date(firstTransaction[0].date)
      );
    });
    setData(finallData);
    setIsLoading(false);
  }, [route.params]);

  return (
    <View style={{ height: "100%" }}>
      <Header height={100} heightBackground={80}>
        <View
          style={{
            alignSelf: "center",
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "white",
              fontWeight: 400,
              alignSelf: "center",
            }}
          >
            {route?.params?.category?.name}
          </Text>
          <Text
            style={{
              fontSize: 25,
              color: "white",
              fontWeight: 600,
              alignSelf: "center",
            }}
          >
            {route?.params?.totalAmount.toFixed(0)} RUB
          </Text>
        </View>
      </Header>
      {isLoading && <ActivityIndicator size={150} color="#9c4aff" />}
      {!isLoading && (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <CategoryInfoList data={item} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index}
        />
      )}
    </View>
  );
};

export default CategoryInfo;
