import axios from 'axios';
import * as con from '../constants/serviceConstants';

const API_BASE = 'http://127.0.0.1:8000';

export const listServices = () => async (dispatch) => {
  try {
    dispatch({ type: con.SERVICE_LIST_REQUEST });
    const { data } = await axios.get(`${API_BASE}/api/v1/services/list/`);
    dispatch({ type: con.SERVICE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: con.SERVICE_LIST_FAIL, payload: error.response && error.response.data.detail ? error.response.data.detail : error.message });
  }
};

export const listServiceDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: con.SERVICE_DETAILS_REQUEST });
    const { data } = await axios.get(`${API_BASE}/api/v1/services/${id}/`);
    dispatch({ type: con.SERVICE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: con.SERVICE_DETAILS_FAIL, payload: error.response && error.response.data.detail ? error.response.data.detail : error.message });
  }
};

export const listSellerServices = () => async (dispatch, getState) => {
  try {
    dispatch({ type: con.SERVICE_LIST_REQUEST });
    const { userLogin: { userInfo } } = getState();
    const config = { headers: { Authorization: `Bearer ${userInfo.access}` } };
    const { data } = await axios.get(`${API_BASE}/api/v1/services/manage/`, config);
    dispatch({ type: con.SERVICE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: con.SERVICE_LIST_FAIL, payload: error.response && error.response.data.detail ? error.response.data.detail : error.message });
  }
};

export const createService = (serviceData) => async (dispatch, getState) => {
  try {
    dispatch({ type: con.SERVICE_CREATE_REQUEST });
    const { userLogin: { userInfo } } = getState();
    const config = { headers: { Authorization: `Bearer ${userInfo.access}` } };
    const { data } = await axios.post(`${API_BASE}/api/v1/services/manage/`, serviceData, config);
    dispatch({ type: con.SERVICE_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: con.SERVICE_CREATE_FAIL, payload: error.response && error.response.data.detail ? error.response.data.detail : error.message });
  }
};

export const deleteService = (id) => async (dispatch, getState) => {
  try {
    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    await axios.delete(`${API_BASE}/api/v1/services/manage/${id}/`, config);
    
    return { success: true };
  } catch (error) {
    const message = error.response && error.response.data.detail
      ? error.response.data.detail
      : error.message;
    return { success: false, error: message };
  }
};

export const updateService = (id, serviceData) => async (dispatch, getState) => {
  try {
    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.put(`${API_BASE}/api/v1/services/manage/${id}/`, serviceData, config);

    return { success: true, data };
  } catch (error) {
    const message = error.response && error.response.data.detail
      ? error.response.data.detail
      : error.message;
    return { success: false, error: message };
  }
};