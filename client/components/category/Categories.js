import { View, Text, TouchableOpacity } from "react-native";
import { useCashStore } from "./../../store/cash-store";
import CategoryIcon from "./CategoryIcon";
import Category from "./Category";

const Categories = ({ isSpending, setTransaction, transactionCategory }) => {
  const categories = useCashStore(
    (state) => state.cashInformation.categories
  ).categories;
  const colors = useCashStore((state) => state.cashInformation.colors);
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        alignSelf: "center",
        gap: 20,
        justifyContent: "space-evenly",
        backgroundColor: "#dedede",
        borderRadius: 20,
        paddingTop: 20,
        paddingBottom: 20,
      }}
    >
      {categories
        ?.filter((category) => category.isSpending === isSpending)
        .map((category, index) => {
          if (category.logo) {
            return (
              <TouchableOpacity
                onPress={() => {
                  setTransaction(category);
                }}
                key={index}
              >
                <Category
                  iconName={category.logo}
                  typeIcon="main"
                  color={"#" + colors[index]}
                  name={category.name}
                  isActive={transactionCategory._id === category._id}
                  key={index}
                />
              </TouchableOpacity>
            );
          }
        })}
    </View>
  );
};
export default Categories;
