import PieChart from "react-native-expo-pie-chart";
import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddButton from "../UI/AddButton";

const PieChartComponent = ({ navigation, data }) => {
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    if (data?.data) {
      const finallPieData = data?.data.map((element) => {
        return {
          ...element,
          key: element.category._id,
          count: element.totalAmount,
        };
      });
      setPieData(finallPieData);
    }
  }, [data]);

  return (
    <View
      style={{
        position: "relative",
        height: 350,
        width: "90%",
        alignSelf: "center",
        justifyContent: "flex-end",
        backgroundColor: "white",
        borderRadius: 30,
        marginBottom: 15,
      }}
    >
      <View
        style={{
          position: "absolute",
          paddingBottom: 30,
          alignSelf: "center",
        }}
      >
        <PieChart data={pieData} length={300} />
        <View
          style={{
            position: "absolute",
            height: "100%",
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontWeight: 500, fontSize: 30 }}>
            {data?.totalAmount?.toFixed(0)} RUB.
          </Text>
        </View>
      </View>
      <AddButton
        navigation={navigation}
        size={60}
        style={{ bottom: 15, right: 15 }}
        navigateTo={"AddTransaction"}
      />
    </View>
  );
};

export default PieChartComponent;
