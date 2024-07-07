import { createTheme } from '@mui/material/styles';

// 
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },

    
    custom: {
      black: '#000000',
      white: '#ffffff',
    },

    
    background: {
      default: '#121212',
      paper: '#333',
    },
  },
});

export { darkTheme };
