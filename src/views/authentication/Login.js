import React from 'react';
import { Grid, Box, Card, Typography } from '@mui/material';

// imagenes
import loginbg from 'src/assets/images/backgrounds/loginBackgroud.jpeg';
import logo from 'src/assets/images/logos/pecoLogo3.png';

// components
import PageContainer from 'src/components/container/PageContainer';

import AuthLogin from './auth/AuthLogin';

const Login2 = () => {
  return (
    <PageContainer description="this is Login page">
      <Box
        sx={{
          backgroundImage: `url(${loginbg})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          position: 'absolute',
          height: '100vh',
          width: '100%',
          zIndex: -1,
        }}
      >
        <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card
              elevation={9}
              sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '380px', bgcolor: 'peco.secondary' }}
            >
              <Typography variant="h5" textAlign="center" color="text.dark" mb={2}>
                Kiosco de Servicios TI
              </Typography>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Box
                  sx={{
                    backgroundImage: `url(${logo})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '180px',
                    width: '180px',
                    borderRadius: '50%',
                    mb: 2,
                  }}
                ></Box>
              </Box>
              <AuthLogin
                subtext={
                  <Typography
                    variant="subtitle1"
                    textAlign="center"
                    color="textSecondary"
                    mb={1}
                  ></Typography>
                }
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Login2;
