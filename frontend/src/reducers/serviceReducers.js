import * as con from '../constants/serviceConstants';

export const serviceListReducer = (state = { services: [] }, action) => {
  switch (action.type) {
    case con.SERVICE_LIST_REQUEST:
      return { loading: true, services: [] };
    case con.SERVICE_LIST_SUCCESS:
      return { loading: false, services: action.payload };
    case con.SERVICE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const serviceDetailsReducer = (state = { service: { reviews: [] } }, action) => {
  switch (action.type) {
    case con.SERVICE_DETAILS_REQUEST:
      return { loading: true, ...state };
    case con.SERVICE_DETAILS_SUCCESS:
      return { loading: false, service: action.payload };
    case con.SERVICE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const serviceCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case con.SERVICE_CREATE_REQUEST:
      return { loading: true };
    case con.SERVICE_CREATE_SUCCESS:
      return { loading: false, success: true, service: action.payload };
    case con.SERVICE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};