import axios from 'axios';
import * as con from '../constants/authConstants';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: con.USER_LOGIN_REQUEST });
    const { data } = await axios.post('/api/v1/users/login/', { email, password });
    dispatch({ type: con.USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: con.USER_LOGIN_FAIL, payload: error.response.data.detail });
  }
};

export const listUsers = () => async (dispatch, getState) => {
  const { userLogin: { userInfo } } = getState();
  const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
  const { data } = await axios.get('/api/v1/users/', config);
  dispatch({ type: con.USER_LIST_SUCCESS, payload: data });
};