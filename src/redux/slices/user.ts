import { type UserI, type UserRole } from "@/models/user.model"
import { type PayloadAction, createSlice } from "@reduxjs/toolkit"

interface UserSliceI {
  email: string
  id: string
  name: string
  role: UserRole | null
}
const initialState: UserSliceI = {
  email: "",
  name: "",
  id: "",
  role: null,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<{ user: UserI }>) => {
      console.log(action.payload)
      const { id, name, email, role } = action.payload.user
      state.id = id
      state.name = name
      state.email = email
      state.role = role
    },
    removeUser: (state) => {
      state.id = initialState.id
      state.name = initialState.name
      state.email = initialState.email
      state.role = initialState.role
    },
  },
})

export const { saveUser, removeUser } = userSlice.actions

export default userSlice.reducer
