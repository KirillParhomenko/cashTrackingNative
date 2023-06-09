import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Header from "./../header/Header";
import { useCashStore } from "../../store/cash-store";

const TransactionInfo = ({ route }) => {
  const deleteTransaction = useCashStore((state) => state.deleteTransaction);

  return (
    <View style={{ height: "100%" }}>
      <Header height={100} heightBackground={70}>
        <Text
          style={{
            fontSize: 20,
            color: "white",
            fontWeight: 400,
            alignSelf: "center",
            top: 20,
          }}
        >
          Детали операции
        </Text>
      </Header>
      <View style={{ height: "100%", width: "90%", alignSelf: "center" }}>
        <ViewItem>
          <TitleText>Сумма</TitleText>
          <InfoText>
            {route?.params?.data?.price.toFixed(1) + " "}
            {route?.params?.data?._balanceAccount?._currency?.abbreviation}
          </InfoText>
        </ViewItem>
        <ViewItem>
          <TitleText>Счет</TitleText>
          <InfoText>{route?.params?.data?._balanceAccount?.name}</InfoText>
        </ViewItem>
        <ViewItem>
          <TitleText>Категория</TitleText>
          <InfoText>{route?.params?.data?._category?.name}</InfoText>
        </ViewItem>
        {route?.params?.data?.description !== "" && (
          <ViewItem>
            <TitleText>Комментарий</TitleText>
            <InfoText>{route?.params?.data?.description.replace(`\n`, "")}</InfoText>
          </ViewItem>
        )}
        <ViewItem>
          <TitleText>Дата</TitleText>
          <InfoText>
            {new Date(route?.params?.data?.date).toLocaleDateString("ru", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </InfoText>
        </ViewItem>
        <TouchableOpacity
          style={{ marginTop: 20 }}
          onPress={() => {
            deleteTransaction(route?.params?.data?._id, route?.params?.data?._user);
            route?.params?.navigation.navigate("Home");
          }}
        >
          <Text style={{ color: "red", fontSize: 20, fontWeight: 600 }}>
            Удалить
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const TitleText = styled.Text`
  color: #555555;
  font-size: 15;
`;

const InfoText = styled.Text`
  color: black;
  font-size: 20;
`;

const ViewItem = styled.View`
  margin-bottom: 20;
`;

export default TransactionInfo;
