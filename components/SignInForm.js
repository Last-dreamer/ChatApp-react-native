import React, { useReducer, useCallback } from "react";

import Input from "../components/Input";
import { Feather } from "@expo/vector-icons";
import SubmitButton from "../components/SubmitButton";
import { validateInput } from "../utils/actions/FormActions";
import { reducer } from "../utils/reducer/formReducer";

const initialState = {
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
      dispatchFormState({ inputId, validationResult: result });
    },
    [dispatchFormState]
  );
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
        onPress={() => {}}
        disabled={!formState.formIsValid}
        style={{ marginTop: 20 }}
      />
    </>
  );
};

export default SignInForm;
