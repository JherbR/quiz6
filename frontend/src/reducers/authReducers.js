import * as con from '../constants/authConstants';

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case con.USER_LOGIN_REQUEST: return { loading: true };
    case con.USER_LOGIN_SUCCESS: return { loading: false, userInfo: action.payload };
    case con.USER_LOGIN_FAIL: return { loading: false, error: action.payload };
    case con.USER_LOGOUT: return {};
    default: return state;
  }
};

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case con.USER_LIST_SUCCESS: return { loading: false, users: action.payload };
    default: return state;
  }
};