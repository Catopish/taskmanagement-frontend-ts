import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jwt: "",
};

const jwtSlice = createSlice({
  name: "jwt",
  initialState,
  reducers: {
    setJwtToken: (state, action) => {
      state.jwt = action.payload;
    },
  },
});

export const { setJwtToken } = jwtSlice.actions;
export default jwtSlice.reducer;
