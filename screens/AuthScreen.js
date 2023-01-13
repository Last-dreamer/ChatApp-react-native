import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PageContainer from "../components/PageContainer";
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";
import colors from "../constants/colors";
import logo from "../assets/logo.png";

const AuthScreen = (props) => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageContainer style={styles.container}>
        <ScrollView>
          <KeyboardAvoidingView
            KeyboardVerticalOffset={100}
            behaviour="padding"
          >
            <View style={styles.imageContainer}>
              <Image source={logo} style={styles.image} resizeMode="contain" />
            </View>

            {isSignUp ? <SignUpForm /> : <SignInForm />}
            <TouchableOpacity
              onPress={() => {
                setIsSignUp((prevState) => !prevState);
              }}
              style={styles.linkContainer}
            >
              <Text style={styles.linkText}>{`Switch to ${
                isSignUp ? "Sign In" : "Sign Up"
              }`}</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </PageContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  linkContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },
  linkText: {
    color: colors.blue,
    fontFamily: "regular",
    letterSpacing: 0.3,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "50%",
  },
});

export default AuthScreen;
