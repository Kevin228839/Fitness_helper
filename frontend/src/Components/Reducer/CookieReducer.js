import { cookieObject } from '../../utils';

export const COOKIE_INIITIAL_STATE = {
  cookies: cookieObject()
};

export const CookieReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_COOKIES':
      return { ...state, cookies: action.payload };
  }
};
