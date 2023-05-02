import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./features/Table/TableSlice"

export const store = configureStore({
    reducer: {
        user: UserReducer,
  },
});
