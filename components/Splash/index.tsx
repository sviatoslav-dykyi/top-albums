import { View } from "react-native";
import React from "react";
import { Images } from "../../utils/constants";
import FastImage from "react-native-fast-image";
import { styles } from "./styles";

const Splash = () => {
  return (
    <View style={styles.container}>
      <FastImage source={Images.Play} style={styles.image} />
    </View>
  );
};

export default Splash;
