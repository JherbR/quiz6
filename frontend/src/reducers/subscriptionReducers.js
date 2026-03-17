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
  USE_AI_QUESTION,
  SUBSCRIPTION_LIST_ALL_REQUEST,
  SUBSCRIPTION_LIST_ALL_SUCCESS,
  SUBSCRIPTION_LIST_ALL_FAIL,
} from '../constants/subscriptionConstants';

export const subscriptionTierReducer = (state = { tiers: [] }, action) => {
  switch (action.type) {
    case SUB_TIERS_REQUEST:
      return { loading: true, tiers: [] };
    case SUB_TIERS_SUCCESS:
      return { loading: false, tiers: action.payload };
    case SUB_TIERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const subscriptionReducer = (state = { info: { usage_left: 0 } }, action) => {
  switch (action.type) {
    case SUB_DETAILS_REQUEST:
      return { loading: true, info: state.info };
    case SUB_DETAILS_SUCCESS:
      return { loading: false, info: action.payload };
    case SUB_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case SUBSCRIBE_REQUEST:
      return { ...state, subscribing: true };
    case SUBSCRIBE_SUCCESS:
      return { loading: false, subscribing: false, info: action.payload };
    case SUBSCRIBE_FAIL:
      return { ...state, subscribing: false, error: action.payload };
    case USE_AI_QUESTION:
      return { ...state, info: { ...state.info, usage_left: state.info.usage_left - 1 } };
    default:
      return state;
  }
};

export const subscriptionListAllReducer = (state = { subscriptions: [] }, action) => {
  switch (action.type) {
    case SUBSCRIPTION_LIST_ALL_REQUEST:
      return { loading: true, subscriptions: [] };
    case SUBSCRIPTION_LIST_ALL_SUCCESS:
      return { loading: false, subscriptions: action.payload };
    case SUBSCRIPTION_LIST_ALL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};