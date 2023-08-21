import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../redux/actions/authActions';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const AuthLogin = ({ title, subtitle, subtext }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState({
    username: '',
    password: '',
  });
  const { username, password } = userLogin;

  const handleChangeInput = (prop) => (event) => {
    setUserLogin({ ...userLogin, [prop]: event.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(userLogin));
  };

  useEffect(() => {
    if (auth.access_token) {
      navigate('/profile');
    }
  }, [auth.access_token, navigate]);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <form onSubmit={onSubmit}>
        <Stack>
          <Box>
            <TextField
              id="username"
              type="text"
              name="username"
              label="Ingresa Usuario"
              variant="outlined"
              fullWidth
              value={username || ''}
              onChange={handleChangeInput('username')}
            />
          </Box>
          <Box mt="25px" mb={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Ingresa Contraseña</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Ingresa Contraseña"
                value={password || ''}
                onChange={handleChangeInput('password')}
              />
            </FormControl>
          </Box>
          <Box>
            <Button color="primary" variant="contained" size="large" fullWidth type="submit">
              Iniciar Sesión
            </Button>
          </Box>
          {subtitle}
        </Stack>
      </form>
    </>
  );
};
export default AuthLogin;
