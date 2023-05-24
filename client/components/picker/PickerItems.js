import { BlurView } from "expo-blur";
import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  FlatList,
} from "react-native";
import { ARButton } from "../UI/Button";
import PickerElement from "./PickerElement";
import { useEffect, useState } from "react";
import { useCashStore } from "../../store/cash-store";

const PickerItems = ({
  onHidePicker,
  data,
  pickedBalanceAccount,
  setBalanceAccount,
  update,
}) => {
  const [pickedItemIndex, setPickedItemIndex] = useState();

  useEffect(() => {
    if (Object.keys(pickedBalanceAccount).length === 0) {
      setPickedItemIndex(0);
      return;
    }
    const index = data.findIndex(
      (item) => item?._id === pickedBalanceAccount?._id
    );
    setPickedItemIndex(index);
  }, []);

  const changePickedItemIndex = (index) => {
    setPickedItemIndex(index);
  };

  return (
    <BlurView
      intensity={100}
      tint="dark"
      style={{ height: "100%", width: "100%", position: "absolute" }}
    >
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            height: "70%",
            width: "90%",
            backgroundColor: "white",
            borderRadius: 30,
            justifyContent: "space-between",
            paddingTop: 15,
            paddingBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 27,
              fontWeight: 400,
              marginLeft: 20,
            }}
          >
            Выберите счет
          </Text>
          <ScrollView
            style={{
              flex: 1,
              margin: 30,
            }}
          >
            {data.map((item, index) => {
              return (
                <PickerElement
                  data={item}
                  key={index}
                  isPicked={index === pickedItemIndex}
                  changePickedItemIndex={changePickedItemIndex}
                  index={index}
                />
              );
            })}
          </ScrollView>
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <ARButton
              style={{
                width: "45%",
                height: 50,
                fontSize: 15,
                fontWeight: 600,
                color: "white",
                bc: "#9c4aff",
              }}
              onPressHandler={onHidePicker}
            >
              ОТМЕНА
            </ARButton>
            <ARButton
              style={{
                width: "45%",
                height: 50,
                fontSize: 15,
                fontWeight: 600,
                color: "white",
                bc: "#9c4aff",
              }}
              onPressHandler={() => {
                if (pickedItemIndex === 0 && update) {
                  setBalanceAccount({});
                } else {
                  setBalanceAccount(data[pickedItemIndex]);
                }
                onHidePicker();
                if (update) {
                  update();
                }
              }}
            >
              ВЫБРАТЬ
            </ARButton>
          </View>
        </View>
      </View>
    </BlurView>
  );
};

export default PickerItems;
