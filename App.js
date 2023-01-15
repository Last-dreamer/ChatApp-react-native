import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Column, LogBox } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { useState, useEffect, useCallback } from "react";
import * as Font from "expo-font";
import AppNavigator from "./navigation/AppNavigator";
import { Provider } from "react-redux";
import { store } from "./store/store";

LogBox.ignoreLogs([
  "Warning: Async Storage has been extracted from react-native core",
]);
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsAppLoaded, setAppLoaded] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await Font.loadAsync({
          black: require("./assets/fonts/Roboto-Black.ttf"),
          bold: require("./assets/fonts/Roboto-Bold.ttf"),
          regular: require("./assets/fonts/Roboto-Regular.ttf"),

          // black: require("./assets/fonts/Roboto-Black.ttf"),
          // black: require("./assets/fonts/Roboto-Black.ttf"),
        });
      } catch (error) {
        console.log.error();
      } finally {
        setAppLoaded(true);
      }
    };

    prepare();
    // setTimeout(() => {
    //   setAppLoaded(true);
    // }, 2000);
  }, []);

  const onLayout = useCallback(async () => {
    if (appIsAppLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsAppLoaded]);

  if (!appIsAppLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider styles={styles.container} onLayout={onLayout}>
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  mainText: {
    fontFamily: "black",
  },
});
