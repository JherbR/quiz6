import axios from 'axios';
import {
  SUB_TIERS_REQUEST,
  SUB_TIERS_SUCCESS,
  SUB_TIERS_FAIL,
  SUB_DETAILS_REQUEST,
  SUB_DETAILS_SUCCESS,
  SUB_DETAILS_FAIL,
  SUBSCRIBE_REQUEST,
  SUBSCRIBE_SUCCESS,
  SUBSCRIBE_FAIL,
  SUBSCRIPTION_LIST_ALL_REQUEST,
  SUBSCRIPTION_LIST_ALL_SUCCESS,
  SUBSCRIPTION_LIST_ALL_FAIL,
} from '../constants/subscriptionConstants';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://127.0.0.1:8000';

export const listSubscriptionTiers = () => async (dispatch) => {
  try {
    dispatch({ type: SUB_TIERS_REQUEST });
    const { data } = await axios.get(`${API_BASE}/api/v1/subscriptions/tiers/`);
    dispatch({ type: SUB_TIERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ 
      type: SUB_TIERS_FAIL, 
      payload: error.response?.data?.detail || error.message 
    });
  }
};

export const getMySubscription = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SUB_DETAILS_REQUEST });
    const { userLogin: { userInfo } } = getState();
    const config = { headers: { Authorization: `Bearer ${userInfo.access}` } };
    const { data } = await axios.get(`${API_BASE}/api/v1/subscriptions/me/`, config);
    dispatch({ type: SUB_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ 
      type: SUB_DETAILS_FAIL, 
      payload: error.response?.data?.detail || error.message 
    });
  }
};

export const subscribeToTier = (tierId) => async (dispatch, getState) => {
  try {
    dispatch({ type: SUBSCRIBE_REQUEST });
    const { userLogin: { userInfo } } = getState();
    const config = { headers: { Authorization: `Bearer ${userInfo.access}` } };
    
    const { data } = await axios.post(
      `${API_BASE}/api/v1/subscriptions/subscribe/`, 
      { tier_id: tierId }, 
      config
    );

    dispatch({ type: SUBSCRIBE_SUCCESS, payload: data });
    return { success: true, data };
  } catch (error) {
    const message = error.response?.data?.detail || error.message;
    dispatch({ type: SUBSCRIBE_FAIL, payload: message });
    return { success: false, error: message };
  }
};

export const listAllSubscriptions = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SUBSCRIPTION_LIST_ALL_REQUEST });

    const { userLogin: { userInfo } } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(`${API_BASE}/api/v1/subscriptions/admin/all/`, config);

    dispatch({ type: SUBSCRIPTION_LIST_ALL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SUBSCRIPTION_LIST_ALL_FAIL,
      payload: error.response?.data?.detail || error.message,
    });
  }
};