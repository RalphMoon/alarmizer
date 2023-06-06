import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import initialState from '../services/slices/initialState';
import alarmReducer from '../services/slices/alarm';

const reducer = {
  alarm: alarmReducer
};

const store = configureStore({
  reducer,
  initialState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

export default store;
