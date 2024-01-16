import { configureStore } from '@reduxjs/toolkit';
// import ReduxThunk from 'redux-thunk';

import appDataReducer from './reducers/appData.js';
import clockingsReducer from './reducers/clockings.js';
import authReducer from './reducers/auth.js';

// reducer setup, to be updated
const rootReducer = {
  appData: appDataReducer,
  clockings: clockingsReducer,
  auth: authReducer,
  // add other reducers here
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }), //.concat(ReduxThunk),
  // add other store configuration here
});

export default store;
