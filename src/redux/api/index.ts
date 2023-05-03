import { publicRequest } from "../../utils/api/api";
import toast from "react-hot-toast";
import { fetchFailure, fetchSuccess } from "../features/Table/TableSlice";

export const fetchAllUsers = async (
  dispatch: any,
  result?: number,
  page?: number
) => {
  try {
    const response = page
      ? await publicRequest.get(
          `/?page=${page}&results=${result}&seed=abc&inc=login,name,location,email,phone`
        )
      : await publicRequest.get(
          `/?results=${result}&seed=abc`
        );
    console.log(response.data);
    dispatch(fetchSuccess(response.data.results));
  } catch (error) {
    dispatch(fetchFailure());
  }
};
