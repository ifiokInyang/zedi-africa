import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../../utils/api/interfaces/index.dto";



const TableSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: [],
    isFetching: false,
    error: false,
  } as IUser,
  reducers: {
    fetchSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    fetchFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});



export const { fetchSuccess, fetchFailure } = TableSlice.actions;

export const UserDetails = (state: { user: IUser }) => state.user;

export default TableSlice.reducer;
