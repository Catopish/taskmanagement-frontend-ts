import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  successMessage: "",
  errorMessage: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setSuccessMessage: (state, action) => {
      state.successMessage = action.payload;
    },
  },
});

export const { setErrorMessage, setSuccessMessage } = authSlice.actions;
export default authSlice.reducer;
