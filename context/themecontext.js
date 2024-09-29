import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  useEffect(() => {
    setIsDarkMode(colorScheme === 'dark');
  }, [colorScheme]);

  const theme = {
    dark: {
      background: '#171717',
      text: '#EDEDED',
      primary: '#4ca1af',
      secondary: '#444444',
      accent: '#F0F5F9',
    },
    light: {
      background: '#F0F5F9',
      text: '#171717',
      primary: '#4ca1af',
      secondary: '#444444',
      accent: '#EDEDED',
    },
  };

  const currentTheme = isDarkMode ? theme.dark : theme.light;

  return (
    <ThemeContext.Provider value={{ isDarkMode, currentTheme, setIsDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);