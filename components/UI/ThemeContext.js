// ThemeContext.js
import React, { createContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { lightTheme, darkTheme } from '../../constants/Themes.js';
import Colors from '../../constants/Colors.js';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const darkMode = useSelector((state) => state.appData.darkModeOn);
  const [theme, setTheme] = useState(lightTheme);

  useEffect(() => {
    const newTheme = darkMode ? darkTheme : lightTheme;
    setTheme(newTheme);
    Object.keys(Colors).forEach((key) => {
      Colors[key] = newTheme[key];
    });
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
};
