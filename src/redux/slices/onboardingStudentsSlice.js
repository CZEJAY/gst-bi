// Create a slice

import { createSlice } from "@reduxjs/toolkit";
import { getFromLocalStorage, saveToLocalStorage } from "../../lib/utils";

const initialState = {
  currentStep: getFromLocalStorage("currentStep") || 1,
  formData: getFromLocalStorage("formData") | {},
};
const onboardingStudentsSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
      saveToLocalStorage(state.currentStep, "currentStep")
      // localStorage.setItem("currentStep", action.payload);
    },
    updateFormData: (state, action) => {
      state.formData = {
        ...state.formData,
        ...action.payload,
      };
      saveToLocalStorage(state.formData, "formData")
      // localStorage.setItem("formData", JSON.stringify(state.formData));
    },
  },
});
export const { setCurrentStep, updateFormData } =
  onboardingStudentsSlice.actions;
export default onboardingStudentsSlice.reducer;
