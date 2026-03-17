import axios from 'axios';
import * as con from '../constants/authConstants';

// Helper function to decode JWT token (without verification - for frontend only)
const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: con.USER_LOGIN_REQUEST });
    const { data } = await axios.post('http://127.0.0.1:8000/api/v1/users/login/', { email, password });
    
    // Decode the access token to get user info
    const decodedToken = decodeToken(data.access);
    
    // Store both tokens and user info
    const userInfo = {
      access: data.access,
      refresh: data.refresh,
      email: decodedToken?.email || email,
      role: decodedToken?.role || 'User',
      is_admin: decodedToken?.is_admin || false,
      is_seller: decodedToken?.role === 'Seller',
    };
    
    dispatch({ type: con.USER_LOGIN_SUCCESS, payload: userInfo });
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  } catch (error) {
    const errorMsg = error.response?.data?.detail || error.response?.data?.error || 'Login failed';
    dispatch({ type: con.USER_LOGIN_FAIL, payload: errorMsg });
  }
};

export const register = (email, username, password, first_name, last_name, phone_number, location, gender) => async (dispatch) => {
  try {
    dispatch({ type: con.USER_REGISTER_REQUEST });
    const { data } = await axios.post('http://127.0.0.1:8000/api/v1/users/register/', {
      email, username, password, first_name, last_name, phone_number, location, gender
    });
    dispatch({ type: con.USER_REGISTER_SUCCESS, payload: data });
    return { success: true };
  } catch (error) {
    const errorMsg = error.response?.data?.detail || error.response?.data || 'Registration failed';
    dispatch({ type: con.USER_REGISTER_FAIL, payload: errorMsg });
    return { success: false, error: errorMsg };
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: con.USER_LOGOUT });
  localStorage.removeItem('userInfo');
};

export const listUsers = () => async (dispatch, getState) => {
  const { userLogin: { userInfo } } = getState();
  const config = { headers: { Authorization: `Bearer ${userInfo.access}` } };
  try {
    const { data } = await axios.get('http://127.0.0.1:8000/api/v1/users/admin/users/', config);
    dispatch({ type: con.USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};