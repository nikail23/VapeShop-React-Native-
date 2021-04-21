import {
    SET_AUTH_LOADING,
    SET_AUTH_ERROR,
    AUTHENTICATE,
    LOGOUT_SUCCEEDED,
    SET_DID_TRY_AL_SUCCEEDED,
  } from "../actions/auth";
  
  const initialState = {
    token: null,
    userId: null,
    didTryAutoLogin: false,
    loading: false,
    error: null,
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case AUTHENTICATE:
        return {
          token: action.token,
          userId: action.userId,
          didTryAutoLogin: true,
          loading: false,
          error: null,
        };
      case SET_AUTH_LOADING:
        return {
          ...state,
          didTryAutoLogin: true,
          loading: true,
          error: null,
        };
      case SET_AUTH_ERROR:
        return {
          ...state,
          didTryAutoLogin: true,
          loading: false,
          error: action.error,
        };
      case SET_DID_TRY_AL_SUCCEEDED:
        return {
          ...state,
          didTryAutoLogin: true,
          loading: false,
          error: null,
        };
      case LOGOUT_SUCCEEDED:
        return {
          ...initialState,
          didTryAutoLogin: true,
          loading: false,
          error: null,
        };
      default:
        return state;
    }
  };
  