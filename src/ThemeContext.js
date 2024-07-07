
import { ThemeProvider, createTheme } from '@mui/material';
import React, { createContext, useContext, useState } from 'react';

//  theme
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    // Customize light theme colors
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212', // Dark background color
      paper: '#333',       // Dark background color for paper (if needed)
    },
    
    // Customize dark theme colors
  },
  background: {
    default: '#880e4f', // Dark pink background color
    paper: '#880e4f',   // Dark pink background color for paper (if needed)
  },
});

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export function ThemeProviderWrapper({ children }) {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === lightTheme ? darkTheme : lightTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}
