import { useEffect, useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Alert } from "react-native";
import CurrentCurency from "./../transaction/currency/CurrentCurrency";
import Icon from "react-native-vector-icons/AntDesign";
import { useCashStore } from "../../store/cash-store";
import { ARButton } from "../UI/Button";
import { useAuthStore } from "../../store/auth-store";
import PickerItems from "../picker/PickerItems";
import Header from "../header/Header";

const AddBalanceAccount = ({ route }) => {
  console.log(route?.params);
  const _user = useAuthStore((state) => state.userAuthInformation.user.id);
  const balanceAccounts = useCashStore(
    (state) => state.cashInformation.balanceAccounts
  );
  const [recipientBalanceAccount, setRecipientBalanceAccount] = useState({});
  const initialCurrency = useCashStore(
    (state) => state.cashInformation.currencies
  ).find((currency) => currency.abbreviation === "RUB");
  const createBalanceAccount = useCashStore(
    (state) => state.createBalanceAccount
  );
  const updateBalanceAccount = useCashStore(
    (state) => state.updateBalanceAccount
  );
  const deleteBalanceAccount = useCashStore(
    (state) => state.deleteBalanceAccount
  );
  const deleteBalanceAccountRecipient = useCashStore(
    (state) => state.deleteBalanceAccountRecipient
  );
  const [balanceValue, setBalanceValue] = useState(
    route?.params?.type === "change"
      ? route?.params?.data?.balance.toFixed(1)
      : 0
  );
  const [convertTo, setConvertTo] = useState(
    route?.params?.type === "change"
      ? route?.params?.data?._currency
      : initialCurrency
  );
  const [balanceAccountName, setBalanceAccountName] = useState(
    route?.params?.type === "change" ? route?.params?.data?.name : ""
  );
  const [isBalanceAccountPickerAvailable, setIsBalanceAccountPickerAvailable] =
    useState(false);
  const onBalanceAccountShowPicker = () => {
    setIsBalanceAccountPickerAvailable(true);
  };

  const onBalanceAccountHidePicker = () => {
    setIsBalanceAccountPickerAvailable(false);
  };
  const changeConvertTo = (_currency) => {
    setConvertTo(_currency);
  };
  const setBalanceAccount = (balanceAccount) => {
    setRecipientBalanceAccount({ ...balanceAccount });
  };

  useEffect(() => {
    if (Object.keys(recipientBalanceAccount).length !== 0) {
      deleteBalanceAccountRecipient(
        _user,
        route?.params?.data?._id,
        recipientBalanceAccount._id
      );
    }
  }, [recipientBalanceAccount]);

  const showConfirmDialog = (navigation) => {
    return Alert.alert("Удалить счет?", "", [
      {
        text: "ОТМЕНА",
        style: "cancel",
      },
      {
        text: "УДАЛИТЬ",
        onPress: () =>
          Alert.alert("Как удалить счет?", "", [
            {
              text: "ОТМЕНА",
              style: "cancel",
            },
            {
              text: "Удалить, оставив транзакции",
              onPress: () => {
                onBalanceAccountShowPicker();
                navigation.navigate("Home");
              },
            },
            {
              text: "Удалить с транзакциями",
              onPress: () => {
                deleteBalanceAccount(_user, route?.params?.data?._id);
                navigation.navigate("Home");
              },
            },
          ]),
      },
    ]);
  };

  const changeBalanceValue = (newBalance) => {
    setBalanceValue(newBalance);
  };
  return (
    <View style={{ height: "100%" }}>
      <Header height={100} heightBackground={70}>
        <Text
          style={{
            fontSize: 20,
            color: "white",
            fontWeight: 600,
            alignSelf: "center",
            top: 20,
          }}
        >
          {route?.params?.type === "change" ? "Изменить счет" : "Добавить счет"}
        </Text>
      </Header>
      <View style={{ justifyContent: "space-between", height: "85%" }}>
        <View>
          <View style={{ width: "70%", alignSelf: "center", marginBottom: 50 }}>
            <Text>Имя счета</Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                width: "100%",
                fontSize: 30,
                textAlign: "center",
              }}
              defaultValue={balanceAccountName}
              onChangeText={(text) => {
                setBalanceAccountName(text);
              }}
            ></TextInput>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              alignItems: "center",
            }}
          >
            <TextInput
              keyboardType="numeric"
              maxLength={20}
              defaultValue={balanceValue !== 0 ? balanceValue.toString() : ""}
              placeholder="0"
              style={{
                borderBottomWidth: 1,
                width: 150,
                fontSize: 30,
                textAlign: "center",
              }}
              onChangeText={(newBalance) => {
                changeBalanceValue(newBalance.replace(/[^0-9\.]/g, ""));
              }}
            />
            <View style={{ position: "absolute", right: -50 }}>
              <CurrentCurency
                navigation={route.params.navigation}
                initialCurrency={initialCurrency}
                pickedCurrency={convertTo}
                changeConvertTo={changeConvertTo}
              />
            </View>
          </View>
        </View>
        <View>
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
              route?.params?.type === "change"
                ? updateBalanceAccount(
                    _user,
                    route?.params?.data?._id,
                    convertTo,
                    balanceAccountName,
                    balanceValue
                  )
                : createBalanceAccount(
                    _user,
                    convertTo,
                    balanceAccountName,
                    balanceValue
                  );
              route?.params?.navigation.navigate("Home");
            }}
          >
            {route?.params?.type === "change" ? "Изменить" : "Добавить"}
          </ARButton>
          {route?.params?.type === "change" && (
            <View style={{ marginTop: 20 }}>
              <ARButton
                style={{
                  width: "90%",
                  height: 60,
                  fontSize: 15,
                  fontWeight: 600,
                  color: "white",
                  bc: "red",
                }}
                onPressHandler={() => {
                  showConfirmDialog(route?.params?.navigation);
                }}
              >
                {"Удалить счет"}
              </ARButton>
            </View>
          )}
        </View>
      </View>
      {isBalanceAccountPickerAvailable && (
        <PickerItems
          onHidePicker={onBalanceAccountHidePicker}
          data={balanceAccounts.filter(
            (balanceAccount) => balanceAccount._id !== route?.params?.data?._id
          )}
          pickedBalanceAccount={{}}
          setBalanceAccount={setBalanceAccount}
        />
      )}
    </View>
  );
};

export default AddBalanceAccount;
