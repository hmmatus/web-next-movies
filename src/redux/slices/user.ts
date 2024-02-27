import { AdminUserI, UserI, UserRole } from "@/models/user";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserSliceI  {
  email: string;
  id: string;
  name: string;
  idCinema: string;
  role: UserRole;
}
const initialState: UserSliceI = {
  email: "",
  name: "",
  id: "",
  idCinema: "",
  role: UserRole.customer
};

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<{user: Partial<AdminUserI>}>) => {
      const { email, name, id, idCinema, role } = action.payload.user;
      state.email = email || state.email; // Only update if provided in payload
      state.name = name || state.name; // Only update if provided in payload
      state.id = id || state.id; // Only update if provided in payload
      state.idCinema = idCinema || state.idCinema; // Only update if provided in payload
      state.role = UserRole[role as UserRole];
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
