import { publicRequest } from "../../utils/api/api";

export const login = async (dispatch: any, user: ILogin) => {
  dispatch(loginStart());
  try {
    const response = await publicRequest.post("/api/auth/login", user);
    console.log(response.data);
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};
