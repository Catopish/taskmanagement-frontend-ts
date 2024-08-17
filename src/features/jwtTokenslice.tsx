import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jwt: localStorage.getItem("jwtToken") || "",
};

const jwtSlice = createSlice({
  name: "jwt",
  initialState,
  reducers: {
    setJwtToken: (state, action) => {
      state.jwt = action.payload;
      localStorage.setItem("jwtToken", action.payload);
    },
    clearJwtToken: (state) => {
      state.jwt = "";
      localStorage.removeItem("jwtToken");
    },
  },
});

export const { setJwtToken, clearJwtToken } = jwtSlice.actions;
export default jwtSlice.reducer;
