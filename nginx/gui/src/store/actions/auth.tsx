import { logout } from '../../api';
import { getCurrentUser } from '../../api/get';
import * as types from './types';

function setIsLoading(isLoading: any) {
  return {
    type: types.IS_LOADING,
    isLoading,
  };
}

function setAuth(user: any, isAuthenticated: boolean) {
  return {
    type: types.SET_AUTH,
    user: { user, isLogin: isAuthenticated },
  };
}


export const socialLogin = () => {
  return (dispatch: any) => {
    getCurrentUser().then((user) => {
      if (user) {
        dispatch(setAuth(user, true));
      }
      else
        dispatch(setAuth(null, false));
    })
  };
};


export const checkLogin = (user: any) => {
  return (dispatch: any) => {
    dispatch(setAuth(user, true));
  };
};


export const socialLogout = () => {
  return (dispatch: any) => {
    dispatch(setAuth(null, false));
    logout()
    localStorage.clear();
  }
}