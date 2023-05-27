import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import CurrentCurency from "./currency/CurrentCurrency";
import PickerItems from "../picker/PickerItems";
import { useEffect, useState } from "react";
import { useCashStore } from "../../store/cash-store";
import Categories from "../category/Categories";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/Fontisto";
import { ARButton } from "../UI/Button";
import { useAuthStore } from "../../store/auth-store";
import Header from "../header/Header";
import styled from "styled-components";

const AddTransaction = ({ navigation }) => {
  const _user = useAuthStore((state) => state.userAuthInformation.user.id);
  //cash store
  const isSpending = useCashStore((state) => state.isSpending);
  const setIsSpending = useCashStore((state) => state.setIsSpending);
  const initialPickedBalanceAccount = useCashStore(
    (state) => state.pickedBalanceAccount
  );
  const balanceAccounts = useCashStore(
    (state) => state.cashInformation.balanceAccounts
  );
  const createTransaction = useCashStore((state) => state.createTransaction);
  //transaction state
  const [pickedBalanceAccount, setPickedBalanceAccount] = useState(
    initialPickedBalanceAccount
  );
  const [balanceValue, setBalanceValue] = useState(0);
  const [transactionBalance, setTransactionBalance] = useState(0);
  const [transactionDate, setTransactionDate] = useState(new Date());
  const [transactionCategory, setTransactionCategory] = useState({});
  const [transactionDescription, setTransactionDescription] = useState("");
  const [convertTo, setConvertTo] = useState({});
  useEffect(() => {
    if (Object.keys(convertTo).length !== 0) {
      const cleanup = setTimeout(() => {
        setTransactionBalance(
          (balanceValue / convertTo.convert) *
            pickedBalanceAccount._currency.convert
        );
      }, 300);
      return () => {
        clearTimeout(cleanup);
      };
    }
  }, [balanceValue, convertTo]);

  //functions
  const [isDatePickerActive, setIsDatePickerActive] = useState(false);
  const [isBalanceAccountPickerAvailable, setIsBalanceAccountPickerAvailable] =
    useState(false);

  const showDatePicker = () => {
    setIsDatePickerActive(true);
  };

  const hideDatePicker = () => {
    setIsDatePickerActive(false);
  };

  const setBalanceAccount = (balanceAccount) => {
    setPickedBalanceAccount({ ...balanceAccount });
  };

  const onBalanceAccountShowPicker = () => {
    setIsBalanceAccountPickerAvailable(true);
  };

  const onBalanceAccountHidePicker = () => {
    setIsBalanceAccountPickerAvailable(false);
  };

  const changeBalanceValue = (newBalance) => {
    setBalanceValue(newBalance);
  };

  const changeConvertTo = (_currency) => {
    setConvertTo(_currency);
  };

  const changeTransactionCategory = (transaction) => {
    setTransactionCategory(transaction);
  };

  const changeDate = (event, date) => {
    const tookDate = date;
    hideDatePicker();
    setTransactionDate(tookDate);
  };
  return (
    <View
      style={{
        height: "100%",
        alignContent: "center",
      }}
    >
      <Header height={100} heightBackground={110}>
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: "100%",
          alignSelf: "center",
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 30,
            marginBottom: 30,
          }}
          onPress={() => {
            onBalanceAccountShowPicker();
          }}
        >
          {Object.keys(pickedBalanceAccount).length !== 0 ? (
            <>
              <Text style={{ fontSize: 20, fontWeight: 600, color: "#676767" }}>
                Счет:
              </Text>
              <Text style={{ fontSize: 20, fontWeight: 400, marginLeft: 10 }}>
                {pickedBalanceAccount.name}
              </Text>
            </>
          ) : (
            <Text style={{ fontSize: 20, fontWeight: 600, color: "#676767" }}>
              Выбрать счет.
            </Text>
          )}
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            alignItems: "center",
            marginBottom: 30,
          }}
        >
          <TextInput
            keyboardType="numeric"
            maxLength={20}
            defaultValue={balanceValue !== 0 ? balanceValue.toString() : ""}
            placeholder="0"
            style={{
              borderBottomWidth: 1,
              width: 100,
              fontSize: 30,
              textAlign: "center",
            }}
            onChangeText={(newBalance) => {
              changeBalanceValue(newBalance.replace(/[^0-9\.]/g, ""));
            }}
          />
          <CurrentCurency
            navigation={navigation}
            initialCurrency={pickedBalanceAccount._currency}
            pickedCurrency={convertTo}
            changeConvertTo={changeConvertTo}
          />
          {Object.keys(convertTo).length !== 0 && (
            <>
              <Text
                style={{
                  fontSize: 30,
                  textAlign: "center",
                  marginLeft: 10,
                  marginRight: 10,
                }}
              >
                =
              </Text>
              <Text
                style={{
                  borderBottomWidth: 1,
                  width: 100,
                  fontSize: 30,
                  textAlign: "center",
                }}
                numberOfLines={1}
              >
                {transactionBalance.toFixed(2)}
              </Text>
              <Text style={{ fontSize: 25, fontWeight: 600, color: "#676767" }}>
                {pickedBalanceAccount._currency.abbreviation}
              </Text>
            </>
          )}
        </View>
        <View style={{ marginBottom: 30 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 400,
              marginBottom: 5,
              alignSelf: "center",
            }}
          >
            Категории
          </Text>
          <Categories
            isSpending={isSpending}
            setTransaction={changeTransactionCategory}
            transactionCategory={transactionCategory}
          />
        </View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 400,
            marginBottom: 5,
            alignSelf: "center",
          }}
        >
          Дата
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 30,
            backgroundColor: "#dedede",
            borderRadius: 20,
            padding: 15,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={
                transactionDate.toDateString() === new Date().toDateString()
                  ? {
                      backgroundColor: "#9c4aff",
                      alignItems: "center",
                      padding: 5,
                      paddingLeft: 15,
                      paddingRight: 15,
                      marginRight: 10,
                      borderRadius: 10,
                    }
                  : {
                      alignItems: "center",
                      padding: 5,
                      paddingLeft: 15,
                      paddingRight: 15,
                      marginRight: 10,
                      borderRadius: 10,
                    }
              }
              onPress={() => {
                setTransactionDate(new Date());
              }}
            >
              <Text
                style={
                  transactionDate.toDateString() === new Date().toDateString()
                    ? { color: "white" }
                    : { color: "black" }
                }
              >
                {new Date().toLocaleDateString("ru", {
                  month: "numeric",
                  day: "numeric",
                })}
              </Text>
              <Text
                style={
                  transactionDate.toDateString() === new Date().toDateString()
                    ? { color: "white", fontWeight: 600 }
                    : { color: "black", fontWeight: 600 }
                }
              >
                Сегодня
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                transactionDate.toDateString() ===
                new Date(Date.now() - 86400000).toDateString()
                  ? {
                      backgroundColor: "#9c4aff",
                      alignItems: "center",
                      padding: 5,
                      paddingLeft: 15,
                      paddingRight: 15,
                      marginRight: 10,
                      borderRadius: 10,
                    }
                  : {
                      alignItems: "center",
                      padding: 5,
                      paddingLeft: 15,
                      paddingRight: 15,
                      marginRight: 10,
                      borderRadius: 10,
                    }
              }
              onPress={() => {
                setTransactionDate(new Date(Date.now() - 86400000));
              }}
            >
              <Text
                style={
                  transactionDate.toDateString() ===
                  new Date(Date.now() - 86400000).toDateString()
                    ? { color: "white" }
                    : { color: "black" }
                }
              >
                {new Date(Date.now() - 86400000).toLocaleDateString("ru", {
                  month: "numeric",
                  day: "numeric",
                })}
              </Text>
              <Text
                style={
                  transactionDate.toDateString() ===
                  new Date(Date.now() - 86400000).toDateString()
                    ? { color: "white", fontWeight: 600 }
                    : { color: "black", fontWeight: 600 }
                }
              >
                Вчера
              </Text>
            </TouchableOpacity>
            {transactionDate.toDateString() !== new Date().toDateString() &&
              transactionDate.toDateString() !==
                new Date(Date.now() - 86400000).toDateString() && (
                <View
                  style={
                    transactionDate.toDateString() !==
                      new Date().toDateString() &&
                    transactionDate.toDateString() !==
                      new Date(Date.now() - 86400000).toDateString()
                      ? {
                          backgroundColor: "#9c4aff",
                          alignItems: "center",
                          padding: 5,
                          paddingLeft: 15,
                          paddingRight: 15,
                          marginRight: 10,
                          borderRadius: 10,
                        }
                      : {
                          alignItems: "center",
                          padding: 5,
                          paddingLeft: 15,
                          paddingRight: 15,
                          marginRight: 10,
                          borderRadius: 10,
                        }
                  }
                >
                  <Text
                    style={
                      transactionDate.toDateString() !==
                        new Date().toDateString() &&
                      transactionDate.toDateString() !==
                        new Date(Date.now() - 86400000).toDateString()
                        ? { color: "white" }
                        : { color: "black" }
                    }
                  >
                    {transactionDate.toLocaleDateString("ru", {
                      month: "numeric",
                      day: "numeric",
                    })}
                  </Text>
                  <Text
                    style={
                      transactionDate.toDateString() !==
                        new Date().toDateString() &&
                      transactionDate.toDateString() !==
                        new Date(Date.now() - 86400000).toDateString()
                        ? { color: "white", fontWeight: 600 }
                        : { color: "black", fontWeight: 600 }
                    }
                  >
                    Выбранная
                  </Text>
                </View>
              )}
          </View>
          <TouchableOpacity onPress={() => showDatePicker()}>
            <View>
              <Icon name="date" size={30} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: 30 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 400,
              marginBottom: 0,
            }}
          >
            Комментарий
          </Text>
          <TextInput
            multiline={true}
            numberOfLines={1}
            style={{
              borderBottomWidth: 2,
              color: "gray",
              borderColor: "black",
              fontSize: 20,
            }}
            onChangeText={(text) => {
              setTransactionDescription(text);
            }}
          />
        </View>
        <ARButton
          style={{
            width: "90%",
            height: 60,
            fontSize: 15,
            fontWeight: 600,
            color: "white",
            bc: "#9c4aff",
          }}
          onPressHandler={() => {
            createTransaction(
              _user,
              pickedBalanceAccount._id,
              transactionCategory._id,
              transactionBalance === 0 ? balanceValue : transactionBalance,
              transactionDate,
              transactionDescription
            );
            navigation.navigate("Home");
          }}
        >
          Добавить
        </ARButton>
      </ScrollView>
      {isDatePickerActive && (
        <RNDateTimePicker
          value={transactionDate}
          onChange={changeDate}
          maximumDate={new Date(Date.now())}
        />
      )}
      {isBalanceAccountPickerAvailable && (
        <PickerItems
          onHidePicker={onBalanceAccountHidePicker}
          data={[...balanceAccounts]}
          pickedBalanceAccount={pickedBalanceAccount}
          setBalanceAccount={setBalanceAccount}
        />
      )}
    </View>
  );
};
const HeaderText = styled.Text`
  font-size: 25;
  font-weight: 600;
`;
export default AddTransaction;
