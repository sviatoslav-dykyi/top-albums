import React from "react";
import { styles } from "./styles";
import Icon from "react-native-vector-icons/FontAwesome";

type LogoutProps = {
  handleLogout?: () => Promise<void>;
};

const Logout: React.FC<LogoutProps> = ({ handleLogout }) => {
  return (
    <Icon.Button
      name="sign-out"
      backgroundColor="transparent"
      onPress={handleLogout}
      size={24}
      color="#000"
      iconStyle={styles.icon}
    />
  );
};

export default Logout;
