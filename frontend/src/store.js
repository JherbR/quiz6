import { configureStore } from '@reduxjs/toolkit';
import { userLoginReducer } from './reducers/authReducers';
import { serviceListReducer, serviceDetailsReducer } from './reducers/serviceReducers';
import { subscriptionReducer } from './reducers/subscriptionReducers';

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const preloadedState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const store = configureStore({
  reducer: {
    userLogin: userLoginReducer,
    serviceList: serviceListReducer,
    serviceDetails: serviceDetailsReducer,
    subscription: subscriptionReducer,
  },
  preloadedState,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;