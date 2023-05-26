import { useEffect, useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Alert } from "react-native";
import CurrentCurency from "./../transaction/currency/CurrentCurrency";
import Icon from "react-native-vector-icons/AntDesign";
import { useCashStore } from "../../store/cash-store";
import { ARButton } from "../UI/Button";
import { useAuthStore } from "../../store/auth-store";
import PickerItems from "../picker/PickerItems";

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
    route?.params?.type === "change" ? route?.params?.data?.balance : 0
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

  const showConfirmDialog = () => {
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
              },
            },
            {
              text: "Удалить с транзакциями",
              onPress: () => {
                deleteBalanceAccount(_user, route?.params?.data?._id);
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
    <View style={{ height: "100%", paddingTop: 10 }}>
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 40,
          right: 20,
        }}
        onPress={() => {
          showConfirmDialog();
        }}
      >
        <Icon name="delete" size={40} color="red" />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
          alignItems: "center",
          marginTop: 100,
        }}
      >
        <TextInput
          keyboardType="numeric"
          maxLength={20}
          defaultValue={balanceValue !== 0 ? balanceValue.toString() : ""}
          placeholder="0"
          style={{
            borderBottomWidth: 1,
            width: 120,
            fontSize: 30,
            textAlign: "center",
          }}
          onChangeText={(newBalance) => {
            changeBalanceValue(newBalance.replace(/[^0-9\.]/g, ""));
          }}
        />
        <CurrentCurency
          navigation={route.params.navigation}
          initialCurrency={initialCurrency}
          pickedCurrency={convertTo}
          changeConvertTo={changeConvertTo}
        />
      </View>
      <View style={{ width: "90%", alignSelf: "center" }}>
        <Text>Имя счета</Text>
        <TextInput
          style={{
            borderBottomWidth: 1,
            width: "90%",
            fontSize: 30,
          }}
          defaultValue={balanceAccountName}
          onChangeText={(text) => {
            setBalanceAccountName(text);
          }}
        ></TextInput>
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
        }}
      >
        {route?.params?.type === "change" ? "Изменить" : "Добавить"}
      </ARButton>
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
