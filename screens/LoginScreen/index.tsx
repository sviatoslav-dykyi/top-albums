import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import LinearGradient from "react-native-linear-gradient";
import { useAuth } from "../../context/AuthContext";
import { OUTSIDE } from "../../utils/constants";
import { styles } from "./styles";

const LoginScreen = () => {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("password");
  const { handleLogin } = useAuth();

  const handleLoginPress = () => {
    if (!email) {
      return;
    }
    handleLogin(email);
  };

  return (
    <LinearGradient colors={["#E74C3C", "#D51007"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={{ marginHorizontal: OUTSIDE }}>
          <StatusBar barStyle="light-content" />
          <View style={styles.header}>
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Please login to your account</Text>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Icon
                name="email-outline"
                size={24}
                color="#999"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputWrapper}>
              <Icon
                name="lock-outline"
                size={24}
                color="#999"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Don't have an account?
              <Text style={styles.link}> Sign Up</Text>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;
