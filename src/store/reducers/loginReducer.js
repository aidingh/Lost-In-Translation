import {
  ACTION_LOGIN_ATTEMPT,
  ACTION_LOGIN_SUCCESS,
  ACTION_LOGIN_ERROR,
} from "../actions/loginActions";

const initalState = {
  loginAttempt: false,
  loginError: "",
};

export const loginReducer = (state = initalState, action) => {
  switch (action.type) {
    case ACTION_LOGIN_ATTEMPT:
      return {
        ...state,
        loginAttempt: true,
        loginError: "",
      };
    case ACTION_LOGIN_SUCCESS:
      return {
        ...initalState,
      };
    case ACTION_LOGIN_ERROR:
      return {
        ...state,
        loginAttempt: false,
        loginError: action.payload,
      };
    default:
      return state;
  }
};
