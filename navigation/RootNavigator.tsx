import React, { useCallback, useEffect, useState } from "react";
import HomeScreen from "../screens/HomeScreen";
import AlbumScreen from "../screens/AlbumScreen";
import AlbumDetailsScreen from "../screens/AlbumDetailsScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import { useAuth } from "../context/AuthContext";
import { RootStackParamList, Screens } from "../types/navigation";
import Splash from "../components/Splash";
import Logout from "../components/Logout";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { auth, handleLogout } = useAuth();
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setAppIsReady(true);
    }

    prepare();
  }, []);

  const headerRight = useCallback(
    () => <Logout handleLogout={handleLogout} />,
    [handleLogout],
  );

  if (!appIsReady) {
    return <Splash />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={auth ? Screens.Home : Screens.Login}>
        {!auth ? (
          <Stack.Screen
            name={Screens.Login}
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name={Screens.Home}
              component={HomeScreen}
              options={{
                title: "",
                headerRight,
              }}
            />
            <Stack.Screen
              name={Screens.Album}
              component={AlbumScreen}
              options={{
                title: "",
                headerRight,
              }}
            />
            <Stack.Screen
              name={Screens.AlbumDetails}
              component={AlbumDetailsScreen}
              options={{
                title: "",
                headerRight,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
