import React, { useReducer, useCallback, useState, useEffect } from "react";

import Input from "../components/Input";
import { Feather, FontAwesome } from "@expo/vector-icons";
import SubmitButton from "../components/SubmitButton";

import { validateInput } from "../utils/actions/FormActions";
import { reducer } from "../utils/reducer/formReducer";
import { signUp } from "../utils/actions/authActions";
import { ActivityIndicator, Alert } from "react-native";
import colors from "../constants/colors";
import { useDispatch } from "react-redux";

const initialState = {
  inputValues: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  },
  inputValidaties: {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  },
  formIsValid: false,
};

const SignUpForm = (props) => {
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const inputChangeHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result, inputValue });
    },
    [dispatchFormState]
  );

  useEffect(() => {
    if (error) {
      Alert.alert("An error  occurred", error);
    }
  }, [error]);

  const authHandler = async () => {
    try {
      setIsLoading(true);
      await signUp(
        formState.inputValues.firstName,
        formState.inputValues.lastName,
        formState.inputValues.email,
        formState.inputValues.password
      );
      setError(null);
    } catch (error) {
      console.log("testing error: " + error);
      setIsLoading(false);
      setError(error.message);
    }
  };
  return (
    <>
      <Input
        id="firstName"
        label="First Name"
        autoCapitalize={false}
        icon="user-o"
        errorText={formState.inputValidaties["firstName"]}
        iconPack={FontAwesome}
        onInputChanged={inputChangeHandler}
      />
      <Input
        id="lastName"
        label="Last Name"
        autoCapitalize={false}
        errorText={formState.inputValidaties["lastName"]}
        icon="user-o"
        iconPack={FontAwesome}
        onInputChanged={inputChangeHandler}
      />
      <Input
        id="email"
        label="Email"
        icon="mail"
        autoCapitalize={false}
        iconPack={Feather}
        errorText={formState.inputValidaties["email"]}
        keyboardType="email-address"
        onInputChanged={inputChangeHandler}
      />
      <Input
        id="password"
        label="Password"
        autoCapitalize={false}
        secureTextEntry
        icon="lock"
        errorText={formState.inputValidaties["password"]}
        iconPack={Feather}
        onInputChanged={inputChangeHandler}
      />
      {isLoading ? (
        <ActivityIndicator
          size={"large"}
          color={colors.primaryColor}
          style={{ marginTop: 10 }}
        />
      ) : (
        <SubmitButton
          title="Sign Up"
          onPress={authHandler}
          disabled={!formState.formIsValid}
          style={{ marginTop: 20 }}
        />
      )}
    </>
  );
};

export default SignUpForm;
