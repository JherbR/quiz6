import axios from 'axios';
import * as con from '../constants/authConstants';

const API_BASE = 'http://127.0.0.1:8000';

export const createOrder = (orderData) => async (dispatch, getState) => {
  try {
    const { userLogin: { userInfo } } = getState();
    const config = { headers: { Authorization: `Bearer ${userInfo.access}` } };
    const { data } = await axios.post(`${API_BASE}/api/v1/orders/create/`, orderData, config);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.response?.data?.detail || 'Order creation failed' };
  }
};

export const updateOrder = (orderId, orderData) => async (dispatch, getState) => {
  try {
    const { userLogin: { userInfo } } = getState();
    const config = { headers: { Authorization: `Bearer ${userInfo.access}` } };
    const { data } = await axios.patch(`${API_BASE}/api/v1/orders/update/${orderId}/`, orderData, config);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.response?.data?.detail || 'Order update failed' };
  }
};

export const getUserOrderHistory = () => async (dispatch, getState) => {
  try {
    const { userLogin: { userInfo } } = getState();
    const config = { headers: { Authorization: `Bearer ${userInfo.access}` } };
    const { data } = await axios.get(`${API_BASE}/api/v1/orders/history/`, config);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.response?.data?.detail || 'Failed to fetch orders' };
  }
};
