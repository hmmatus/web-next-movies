import { AdminUserI, UserI, UserRole } from "@/models/user.model";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserSliceI  {
  email: string;
  id: string;
  name: string;
  idCinema: string;
  role: UserRole | null;
}
const initialState: UserSliceI = {
  email: "",
  name: "",
  id: "",
  idCinema: "",
  role: null,
};

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<{user: Partial<AdminUserI>}>) => {
      const { id } = action.payload.user;

    },
    removeUser: (state) => {
      state.id = initialState.id;
    },
  },
});

export const { saveUser, removeUser  } = userSlice.actions;

export default userSlice.reducer;
