import axios from 'axios';
import { SUB_DETAILS_REQUEST, SUB_DETAILS_SUCCESS, SUB_DETAILS_FAIL } from '../constants/subscriptionConstants';

export const getSubscription = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SUB_DETAILS_REQUEST });
    const { userLogin: { userInfo } } = getState();
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
    const { data } = await axios.get('/api/v1/subscription/my/', config);
    dispatch({ type: SUB_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SUB_DETAILS_FAIL, payload: error.message });
  }
};