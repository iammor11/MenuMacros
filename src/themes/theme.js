import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: "'Montserrat', sans-serif",
  },
  palette: {
    primary: {
      main: '#e91e63', // Pink
    },
    secondary: {
      main: '#000', // Black
    },
    background: {
      default: '#fff',
      paper: '#f5f5f5',
    },
    text: {
      primary: '#000',
      secondary: '#575757',
    },
  },
});

export default theme;