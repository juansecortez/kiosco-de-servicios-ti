import { CssBaseline, ThemeProvider } from '@mui/material';
import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';

import Router from './routes/Router';
import { baselightTheme } from './theme/DefaultColors';
import { refreshToken } from './redux/actions/authActions';
import { useDispatch } from 'react-redux';
import { Alert } from './components/alert/Alert';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  const routing = useRoutes(Router);
  const theme = baselightTheme;
  return (
    <ThemeProvider theme={theme}>
      <Alert />
      <CssBaseline />
      {routing}
    </ThemeProvider>
  );
}

export default App;
