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
    saveJwt: (state, action: PayloadAction<{jwt: string, expiration: string}>) => {
      state.jwt = action.payload.jwt;
      state.expiration = action.payload.expiration;
      state.isLoggedIn = true;
    },
    removeJwt: (state) => {
      state = {
        ...initialState
      }
    },
  },
});

export const { saveJwt, removeJwt  } = authSlice.actions;

export default authSlice.reducer;
