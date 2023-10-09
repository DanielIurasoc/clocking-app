import { configureStore } from '@reduxjs/toolkit';

import activeScreenReducer from './reducers/activeScreen';
import clockingsReducer from './reducers/clockings';

// reducer setup, to be updated
const rootReducer = {
  activeScreen: activeScreenReducer,
  clockings: clockingsReducer,

  // add other reducers here
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // add other store configuration here
});

export default store;
