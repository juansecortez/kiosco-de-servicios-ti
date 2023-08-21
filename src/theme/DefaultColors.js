import { createTheme } from '@mui/material/styles';
import typography from './Typography';
import { shadows } from './Shadows';

const baselightTheme = createTheme({
  direction: 'ltr',
  palette: {
    peco: {
      main: '#373A3C',
      secondary: '#D6D6D6',
    },
    buttonDanger: {
      main: '#c0392b',
      light: '#FDEDE8',
      dark: '#F00C0C',
      contrastText: '#ffffff',
    },
    buttonSuccess: {
      main: '#008000',
      light: '#FDEDE8',
      dark: '#00B900',
      contrastText: '#ffffff',
    },
    buttonPrimary: {
      main: '#226AB9',
      light: '#FDEDE8',
      dark: '#007bff',
      contrastText: '#ffffff',
    },
    primary: {
      main: '#c0392b',
      light: '#ECF2FF',
      dark: '#FA4937 ',
    },
    secondary: {
      main: '#49BEFF',
      light: '#E8F7FF',
      dark: '#23afdb',
    },
    success: {
      main: '#008000',
      light: '#E6FFFA',
      dark: '#00B900',
      contrastText: '#ffffff',
    },
    info: {
      main: '#539BFF',
      light: '#EBF3FE',
      dark: '#1682d4',
      contrastText: '#ffffff',
    },
    error: {
      main: '#FA896B',
      light: '#FDEDE8',
      dark: '#f3704d',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#FFAE1F',
      light: '#FEF5E5',
      dark: '#ae8e59',
      contrastText: '#ffffff',
    },
    purple: {
      A50: '#EBF3FE',
      A100: '#6610f2',
      A200: '#557fb9',
    },
    grey: {
      100: '#F2F6FA',
      200: '#EAEFF4',
      300: '#DFE5EF',
      400: '#7C8FAC',
      500: '#5A6A85',
      600: '#2A3547',
    },
    text: {
      primary: '#2A3547',
      main: '#FFFFFF',
      sidebar: '#FFFFFF',
      secondary: '#5A6A85',
      dark: '#000000',
    },
    action: {
      disabledBackground: 'rgba(73,82,88,0.12)',
      hoverOpacity: 0.02,
      hover: '#f6f9fc',
    },
    divider: '#e5eaef',
  },
  typography,
  shadows,
});

export { baselightTheme };
