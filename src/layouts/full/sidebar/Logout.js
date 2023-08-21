import React from 'react';
import { Box, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout } from 'src/redux/actions/authActions';

export const Logout = () => {
  const dispatch = useDispatch();

  const onLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      alignContent={'end'}
      gap={2}
      sx={{ m: 3, p: 3, borderRadius: '8px' }}
    >
      <Button onClick={onLogout} color="primary" variant="contained" fullWidth>
        Cerrar Sesión
      </Button>
    </Box>
  );
};
