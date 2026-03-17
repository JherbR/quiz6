import { configureStore } from '@reduxjs/toolkit';
import { userLoginReducer, userRegisterReducer } from './reducers/authReducers';
import { serviceListReducer, serviceDetailsReducer, serviceCreateReducer } from './reducers/serviceReducers';
import { subscriptionReducer, subscriptionTierReducer } from './reducers/subscriptionReducers';

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const preloadedState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const store = configureStore({
  reducer: {
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    serviceList: serviceListReducer,
    serviceDetails: serviceDetailsReducer,
    serviceCreate: serviceCreateReducer,
    subscription: subscriptionReducer,
    subscriptionTiers: subscriptionTierReducer,
  },
  preloadedState,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;