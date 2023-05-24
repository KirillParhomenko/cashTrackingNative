import { ActivityIndicator, View } from "react-native";

const LoadingComponent = () => {
  return (
    <View style={{ height: "100%", justifyContent: "center" }}>
      <ActivityIndicator size={150} color="#9c4aff" />
    </View>
  );
};

export default LoadingComponent;
