import { View, ActivityIndicator } from "react-native";
import React from "react";
import { styles } from "./styles";

type LoaderProps = {
  color?: string;
};

const Loader: React.FC<LoaderProps> = ({ color = "#000000" }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={color} />
    </View>
  );
};

export default Loader;
