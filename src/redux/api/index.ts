import { publicRequest } from "../../utils/api/api";
import { calculateTotal, fetchFailure, fetchSuccess } from "../features/Table/TableSlice";

export const fetchAllUsers = async (
  dispatch: any,
  seed?: string,
  result?: number,
  page=1
) => {
  try {
    const response = page
      ? await publicRequest.get(`/?page=${page}&results=${result}&seed=abc`)
      : await publicRequest.get(`/?results=${result}&seed=abc`);
      dispatch(fetchSuccess(response.data.results));
      dispatch(calculateTotal(response.data.info))
  } catch (error) {
    dispatch(fetchFailure());
  }
};
