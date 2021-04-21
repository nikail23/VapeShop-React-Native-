export const SET_AUTH_LOADING = "SET_AUTH_LOADING";
export const SET_AUTH_ERROR = "SET_AUTH_ERROR";
export const AUTHENTICATE = "AUTHENTICATE";
export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const LOGOUT_SUCCEEDED = "LOGOUT_SUCCEEDED";
export const SET_DID_TRY_AL = "SET_DID_TRY_AL";
export const SET_DID_TRY_AL_SUCCEEDED = "SET_DID_TRY_AL_SUCCEEDED";

export const setAuthLoading = () => {
  return { type: SET_AUTH_LOADING }
};

export const setAuthError = (error) => {
  return { type: SET_AUTH_ERROR, error }
};

export const setDidTryAL = () => {
  return { type: SET_DID_TRY_AL };
};

export const setDidTryALSucceeded = () => {
  return { type: SET_DID_TRY_AL_SUCCEEDED };
};

export const authenticate = (userId, token, expiryTime) => {
  return { type: AUTHENTICATE, userId: userId, token: token };
};

export const signup = (email, password) => {
  return { type: SIGNUP, email: email, password: password }
};

export const login = (email, password) => {
  return { type: LOGIN, email: email, password: password }
};

export const logout = () => {
  return { type: LOGOUT };
};

export const logout_succeeded = () => {
  return { type: LOGOUT_SUCCEEDED };
};
