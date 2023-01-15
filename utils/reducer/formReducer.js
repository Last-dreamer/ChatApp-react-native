export const reducer = (state, action) => {
  const { validationResult, inputId, inputValue } = action;

  const updatedValues = {
    ...state.inputValues,
    [inputId]: inputValue,
  };

  const updatedValidities = {
    ...state.inputValidaties,
    [inputId]: validationResult,
  };

  let updateFormIsValid = true;

  for (const key in updatedValidities) {
    //   ! mean it valid ...
    if (updatedValidities[key] !== undefined) {
      updateFormIsValid = false;
      break;
    }
  }

  console.log("updateFormIsValid" + updateFormIsValid);

  return {
    inputValues: updatedValues,
    inputValidaties: updatedValidities,
    formIsValid: updateFormIsValid,
  };
};
