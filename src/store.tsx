import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import jwtReducer from "./features/jwtTokenslice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    jwt: jwtReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
