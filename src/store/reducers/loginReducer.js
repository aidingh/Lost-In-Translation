/**
 * Credit to: Dewalds who created this code. I reuse this code to manage my redux login states.
 * loginReducer object will change the user states depending on action
 */

import {
  ACTION_LOGIN_ATTEMPTING,
  ACTION_LOGIN_SUCCESS,
  ACTION_LOGIN_ERROR,
} from "../actions/loginActions";

const initalState = {
  loginAttempt: false,
  loginError: "",
};

export const loginReducer = (state = initalState, action) => {
  switch (action.type) {
    case ACTION_LOGIN_ATTEMPTING:
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
