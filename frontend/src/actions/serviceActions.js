import axios from 'axios';
import * as con from '../constants/serviceConstants';

export const listServices = () => async (dispatch) => {
  try {
    dispatch({ type: con.SERVICE_LIST_REQUEST });
    const { data } = await axios.get('/api/v1/services/');
    dispatch({ type: con.SERVICE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: con.SERVICE_LIST_FAIL, payload: error.response && error.response.data.detail ? error.response.data.detail : error.message });
  }
};

export const listServiceDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: con.SERVICE_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/services/${id}/`);
    dispatch({ type: con.SERVICE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: con.SERVICE_DETAILS_FAIL, payload: error.response && error.response.data.detail ? error.response.data.detail : error.message });
  }
};

export const createService = (serviceData) => async (dispatch, getState) => {
  try {
    dispatch({ type: con.SERVICE_CREATE_REQUEST });
    const { userLogin: { userInfo } } = getState();
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
    const { data } = await axios.post('/api/v1/services/create/', serviceData, config);
    dispatch({ type: con.SERVICE_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: con.SERVICE_CREATE_FAIL, payload: error.response && error.response.data.detail ? error.response.data.detail : error.message });
  }
};