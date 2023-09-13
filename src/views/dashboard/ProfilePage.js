import React from 'react';
import { Grid } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

// components
import ProfileView from './components/ProfileView';
import HistoryTI from './components/HistoryTI';
import RequestsMade from './components/RequestsMade';
import TodasLasSolicitudes from './components/TodasLasSolicitudes';


const ProfilePage = () => {
  return (
    <PageContainer description="this is ProfilePage">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ProfileView />
        </Grid>
        <Grid item xs={12}>
          <HistoryTI />
        </Grid>
      
        <Grid item xs={12}>
          <RequestsMade />
          <TodasLasSolicitudes />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ProfilePage;
