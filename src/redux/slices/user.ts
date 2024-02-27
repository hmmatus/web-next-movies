import { AdminUserI, UserI } from "@/models/user";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserSliceI  {
  email: string;
  id: string;
  name: string;
}
const initialState: UserSliceI = {
  email: "",
  name: "",
  id: "",
};

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<{user: Partial<AdminUserI>}>) => {
      state = {
        ...state,
        ...action.payload.user
      }
    },
    removeUser: (state) => {
      state = {
        ...initialState
      }
    },
  },
});

export const { saveUser, removeUser  } = userSlice.actions;

export default userSlice.reducer;
