import { SUB_DETAILS_REQUEST, SUB_DETAILS_SUCCESS, SUB_DETAILS_FAIL, USE_AI_QUESTION } from '../constants/subscriptionConstants';

export const subscriptionReducer = (state = { info: { usage_left: 0 } }, action) => {
  switch (action.type) {
    case SUB_DETAILS_REQUEST: return { loading: true, info: state.info };
    case SUB_DETAILS_SUCCESS: return { loading: false, info: action.payload };
    case SUB_DETAILS_FAIL: return { loading: false, error: action.payload };
    case USE_AI_QUESTION: return { ...state, info: { ...state.info, usage_left: state.info.usage_left - 1 } };
    default: return state;
  }
};