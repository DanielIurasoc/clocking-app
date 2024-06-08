import React from 'react';
import { Provider } from 'react-redux';
import { firebase } from '@react-native-firebase/app';

import { ThemeProvider } from './components/UI/ThemeContext.js';
import store from './store/store.js';

// firebase config data
import firebaseConfig from './firebase/firebaseConfig.js';

import App from './App.js';

const MyApp = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;
