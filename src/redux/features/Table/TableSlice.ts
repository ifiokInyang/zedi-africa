import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";


// const initialState:User[] = [];
export interface EmployeeState {
  data: User[];
  singleEmployee: DisplayedUser;
}

const TableSlice = createSlice({
  name: "employeeTable",
  initialState: {
    data: [],
    singleEmployee: userDetails,
  } as EmployeeState,
  reducers: {
    addEmployee: (state: EmployeeState, action: PayloadAction<any>) => {
      state.data.push(action.payload);
    },
  },
});

export const getEmployeesAsync = () => async (dispatch: any) => {
  try {
    const response = await axios.get(`${ServerUrl}/users`);
    dispatch(getAllEmployees(response.data));
  } catch (err: any) {
    console.log(err);
    toast.error(err.response.data.message || "Something went wrong");
    throw new Error(err);
  }
};


export const { getAllEmployees, addEmployee, getAnEmployee } =
  TableSlice.actions;

export const showEmployee = (state: { employeeTable: EmployeeState }) =>
  state.employeeTable.data;

export default TableSlice.reducer;
