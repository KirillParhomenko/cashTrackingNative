import { useEffect, useState } from "react";
import { Image, View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  main: {
    width: 50,
    height: 50,
  },
  catalog: {
    width: 20,
    height: 20,
  },
});

const CategoryIcon = ({ iconName, typeIcon, color, isActive }) => {
  const IconImage = () => {
    switch (iconName) {
      case "coffee":
        return (
          <Image
            style={typeIcon === "main" ? { ...styles.main } : styles.catalog}
            source={require("./../../assets/categoryIcons/coffee.png")}
          />
        );
      case "education":
        return (
          <Image
            style={typeIcon === "main" ? styles.main : styles.catalog}
            source={require("./../../assets/categoryIcons/education.png")}
          />
        );
      case "family":
        return (
          <Image
            style={typeIcon === "main" ? styles.main : styles.catalog}
            source={require("./../../assets/categoryIcons/family.png")}
          />
        );
      case "gift":
        return (
          <Image
            style={typeIcon === "main" ? styles.main : styles.catalog}
            source={require("./../../assets/categoryIcons/gift.png")}
          />
        );
      case "health":
        return (
          <Image
            style={typeIcon === "main" ? styles.main : styles.catalog}
            source={require("./../../assets/categoryIcons/health.png")}
          />
        );
      case "leisure":
        return (
          <Image
            style={typeIcon === "main" ? styles.main : styles.catalog}
            source={require("./../../assets/categoryIcons/leisure.png")}
          />
        );
      case "more":
        return (
          <Image
            style={typeIcon === "main" ? styles.main : styles.catalog}
            source={require("./../../assets/categoryIcons/more.png")}
          />
        );
      case "product":
        return (
          <Image
            style={typeIcon === "main" ? styles.main : styles.catalog}
            source={require("./../../assets/categoryIcons/product.png")}
          />
        );
      case "salary":
        return (
          <Image
            style={typeIcon === "main" ? styles.main : styles.catalog}
            source={require("./../../assets/categoryIcons/salary.png")}
          />
        );
      case "sport":
        return (
          <Image
            style={typeIcon === "main" ? styles.main : styles.catalog}
            source={require("./../../assets/categoryIcons/sport.png")}
          />
        );
      case "transport":
        return (
          <Image
            style={typeIcon === "main" ? styles.main : styles.catalog}
            source={require("./../../assets/categoryIcons/transport.png")}
          />
        );
    }
  };
  return (
    <View
      style={{
        width: typeIcon === "main" ? 80 : 40,
        height: typeIcon === "main" ? 80 : 40,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        backgroundColor: color,
        borderRadius: isActive ? 10 : 100,
      }}
    >
      {IconImage()}
    </View>
  );
};

export default CategoryIcon;
