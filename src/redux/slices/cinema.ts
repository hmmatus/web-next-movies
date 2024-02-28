import { CinemaI } from "@/models/cinema";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialStateI extends CinemaI {

}
const initialState: InitialStateI = {
  id: "",
  name: "",
  description: ""
};

export const cinemaSlice = createSlice({
  name: "cinema",
  initialState,
  reducers: {
    saveCinema: (state, action: PayloadAction<CinemaI>) => {
      state.id = action.payload.id,
      state.name = action.payload.name
      state.description = action.payload.description
    },
    removeCinema: (state) => {
      state.id = initialState.id,
      state.name = initialState.name
      state.description = initialState.description
    },
  },
});

export const { saveCinema, removeCinema  } = cinemaSlice.actions;

export default cinemaSlice.reducer;
