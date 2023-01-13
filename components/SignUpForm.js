import React, { useReducer, useCallback } from "react";

import Input from "../components/Input";
import { Feather, FontAwesome } from "@expo/vector-icons";
import SubmitButton from "../components/SubmitButton";

import { validateInput } from "../utils/actions/FormActions";
import { reducer } from "../utils/reducer/formReducer";

const initialState = {
  inputValidaties: {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  },
  formIsValid: false,
};

const SignUpForm = (props) => {
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const inputChangeHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result });
    },
    [dispatchFormState]
  );
  return (
    <>
      <Input
        id="firstName"
        label="First Name"
        autoCapitalize={false}
        icon="user-o"
        iconPack={FontAwesome}
        onInputChanged={inputChangeHandler}
      />
      <Input
        id="lastName"
        label="Last Name"
        autoCapitalize={false}
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
        keyboardType="email-address"
        onInputChanged={inputChangeHandler}
      />
      <Input
        id="password"
        label="Password"
        autoCapitalize={false}
        secureTextEntry
        icon="lock"
        iconPack={Feather}
        onInputChanged={inputChangeHandler}
      />
      <SubmitButton
        title="Sign Up"
        onPress={() => {}}
        disabled={!formState.formIsValid}
        style={{ marginTop: 20 }}
      />
    </>
  );
};

export default SignUpForm;
