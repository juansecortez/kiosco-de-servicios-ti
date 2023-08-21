import React from 'react';
import DashboardCard from '../../../components/shared/DashboardCard';

import { Box, Typography } from '@mui/material';

// import ProfileImg from 'src/assets/images/profile/user-1.png';
import { useSelector } from 'react-redux';

const ProfileView = () => {
  const { auth } = useSelector((state) => state);
  const puesto = JSON.parse(localStorage.getItem('user')).PUESTO;

  return (
    <DashboardCard title="Perfil">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ maxHeight: '300px' }}
      >
        {/* <Box>
          <Avatar
            src={ProfileImg}
            alt={ProfileImg}
            sx={{
              width: 200,
              height: 200,
            }}
          />
        </Box> */}

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            alignContent: 'center',
          }}
        >
          <Typography
            mt={2}
            variant="name"
            fontWeight={600}
            fontSize={22}
            sx={{
              color: 'text.primary',
              textAlign: 'center',
            }}
          >
            {auth.user?.NOMBRE}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            alignContent: 'center',
          }}
        >
          <Typography
            mt={1}
            variant="puesto"
            fontWeight={600}
            fontSize={18}
            sx={{
              color: 'text.primary',
            }}
          >
            {puesto}
          </Typography>
        </Box>

        {/* <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            alignContent: 'center',
          }}>
          <Typography
            variant="gerencia"
            fontWeight={600}
            fontSize={16}
            sx={{
              color: 'text.primary',
            }}
          >
            Desarrollo TI
          </Typography>
        </Box> */}
      </Box>
    </DashboardCard>
  );
};

export default ProfileView;
