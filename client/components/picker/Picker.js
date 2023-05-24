import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useCashStore } from "../../store/cash-store";
import { useEffect, useState } from "react";
import PickerItems from "./PickerItems";
import { Portal } from "@gorhom/portal";

const Picker = () => {
  const [isPickerAvailable, setIsPickerAvailable] = useState(false);
  const balanceAccounts = useCashStore(
    (state) => state.cashInformation.balanceAccounts
  );
  const pickedBalanceAccount = useCashStore(
    (state) => state.pickedBalanceAccount
  );
  const totalBalanceAccount = useCashStore(
    (state) => state.totalBalanceAccount
  );
  const updateCategorySortedCashInformation = useCashStore(
    (state) => state.updateCategorySortedCashInformation
  );

  const setBalanceAccount = useCashStore((state) => state.setBalanceAccount);

  const onShowPicker = () => {
    setIsPickerAvailable(true);
  };

  const onHidePicker = () => {
    setIsPickerAvailable(false);
  };
  return (
    <View
      style={{
        width: "100%",
        position: "absolute",
        top: 15,
        alignItems: "center",
      }}
    >
      <TouchableOpacity onPress={() => onShowPicker()}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 25 }}>
            {Object.keys(pickedBalanceAccount).length === 0
              ? totalBalanceAccount.name
              : pickedBalanceAccount.name}
          </Text>
          <Icon
            name="caretdown"
            size={20}
            color="white"
            style={{ marginLeft: 10 }}
          />
        </View>
        <View>
          <Text style={{ color: "white", fontSize: 20, alignSelf: "center" }}>
            {Object.keys(pickedBalanceAccount).length === 0
              ? totalBalanceAccount?.balance?.toFixed(1) + " RUB"
              : pickedBalanceAccount?.balance?.toFixed(1) +
                " " +
                pickedBalanceAccount?._currency?.abbreviation}
          </Text>
        </View>
      </TouchableOpacity>
      {isPickerAvailable && (
        <Portal hostName="PickerBalanceAccounts">
          <PickerItems
            onHidePicker={onHidePicker}
            data={[totalBalanceAccount, ...balanceAccounts]}
            pickedBalanceAccount={pickedBalanceAccount}
            setBalanceAccount={setBalanceAccount}
            update={updateCategorySortedCashInformation}
          />
        </Portal>
      )}
    </View>
  );
};

export default Picker;
