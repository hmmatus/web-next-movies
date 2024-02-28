import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialStateI {
  jwt: string;
  expiration: string;
  isLoggedIn: boolean;
}
const initialState: InitialStateI = {
  jwt: "",
  expiration: "",
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveJwt: (state, action: PayloadAction<{jwt: string}>) => {
      console.log(action.payload);
      state.jwt = action.payload.jwt;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.jwt=""
      state.isLoggedIn=false;
    },
  },
});

export const { saveJwt, logout  } = authSlice.actions;

export default authSlice.reducer;
