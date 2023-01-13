export const reducer = (state, action) => {
  const { validationResult, inputId } = action;

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
    inputValidaties: updatedValidities,
    formIsValid: updateFormIsValid,
  };
};
