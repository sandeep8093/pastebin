import { loginFailure, loginStart, loginSuccess,registerFailure,registerSuccess,registerStart,logOut } from "./userRedux";
import { publicRequest,userRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/auth/joinin", user);
    dispatch(registerSuccess(res.data));
  } catch (err) {
    dispatch(registerFailure());
  }
};

export const logout = async (dispatch) => {

    await userRequest.post("/auth/logout");
    dispatch(logOut());
 
};
