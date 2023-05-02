import { publicRequest } from "../../utils/api/api";
import toast from "react-hot-toast";
import { fetchFailure, fetchSuccess } from "../features/Table/TableSlice";

export const fetchUser = async (dispatch: any, result?: number) => {
    console.log("result is ", result)
  try {
    const response = await publicRequest.get(`/?results=${result}`);
    console.log("data is ", response.data);
    dispatch(fetchSuccess(response.data.results));
  } catch (error) {
    dispatch(fetchFailure());
  }
};
