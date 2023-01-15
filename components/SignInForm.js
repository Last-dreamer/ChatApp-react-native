import React, { useReducer, useCallback } from "react";

import Input from "../components/Input";
import { Feather } from "@expo/vector-icons";
import SubmitButton from "../components/SubmitButton";
import { validateInput } from "../utils/actions/FormActions";
import { reducer } from "../utils/reducer/formReducer";
import { signUp } from "../utils/actions/authActions";

const initialState = {
  inputValues: {
    email: "",
    password: "",
  },
  inputValidaties: {
    email: false,
    password: false,
  },
  formIsValid: false,
};

const SignInForm = (props) => {
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const inputChangeHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result, inputValue });
    },
    [dispatchFormState]
  );

  const authHandler = () => {
    // signUp;
  };
  return (
    <>
      <Input
        id="email"
        label="Email"
        icon="mail"
        iconPack={Feather}
        onInputChanged={inputChangeHandler}
        errorText={formState.inputValidaties["email"]}
        autoCapitalize={false}
      />
      <Input
        id="password"
        label="Password"
        icon="lock"
        iconPack={Feather}
        onInputChanged={inputChangeHandler}
        autoCapitalize={false}
        errorText={formState.inputValidaties["password"]}
        secureTextEntry
      />
      <SubmitButton
        title="Sign In"
        onPress={authHandler}
        disabled={!formState.formIsValid}
        style={{ marginTop: 20 }}
      />
    </>
  );
};

export default SignInForm;
