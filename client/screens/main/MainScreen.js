import { View, Text, TouchableOpacity } from "react-native";
import { ARButton } from "../../components/UI/Button";
import {
  getSpendingTransactions,
  getNotSpendingTransactions,
} from "../../services/cash-service";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../store/auth-store";
import { useState, useEffect } from "react";
import PieChartComponent from "../../components/pieChart/PieChart";
import { useCashStore } from "../../store/cash-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../components/header/Header";

import MainList from "../../components/mainList/MainList";
import styled from "styled-components";
import Picker from "../../components/picker/Picker";
import { PortalHost } from "@gorhom/portal";

const MainScreen = ({ navigation }) => {
  const onLogout = useAuthStore((state) => state.logout);
  const data = useCashStore((state) => state.categorySortedCashInformation);
  const isSpending = useCashStore((state) => state.isSpending);
  const setIsSpending = useCashStore((state) => state.setIsSpending);
  const deleteLocalInformation = useCashStore(
    (state) => state.deleteLocalInformation
  );

  return (
    <View style={{ height: "100%", backgroundColor: "#dce0df" }}>
      <Header height={130} heightBackground={200}>
        <Picker />
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            width: "70%",
            position: "absolute",
            justifyContent: "space-between",
            alignItems: "flex-start",
            bottom: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setIsSpending(true);
            }}
          >
            <HeaderText
              style={{
                color: isSpending ? "white" : "#a1a1a1",
                borderBottomWidth: isSpending ? 3 : 0,
                borderColor: "white",
                paddingBottom: 5,
              }}
            >
              РАСХОДЫ
            </HeaderText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsSpending(false);
            }}
          >
            <HeaderText
              style={{
                color: !isSpending ? "white" : "#a1a1a1",
                borderBottomWidth: !isSpending ? 3 : 0,
                borderColor: "white",
                paddingBottom: 5,
              }}
            >
              ДОХОДЫ
            </HeaderText>
          </TouchableOpacity>
        </View>
      </Header>
      <PieChartComponent
        navigation={navigation}
        data={isSpending ? data?.spending : data?.income}
      />
      <MainList
        data={isSpending ? data?.spending : data?.income}
        navigation={navigation}
      />
      <PortalHost name="PickerBalanceAccounts" />
    </View>
  );
};

const HeaderText = styled.Text`
  font-size: 25;
  font-weight: 600;
`;

export default MainScreen;
