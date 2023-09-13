import React, { useState } from 'react';
import { styled, Container, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';

const MainWrapper = styled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
}));

const PageWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  flexDirection: 'column',
  zIndex: 1,
  backgroundColor: 'transparent',
}));

const FullLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <MainWrapper className="mainwrapper">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        onSidebarClose={() => setSidebarOpen(false)}
      />
      <PageWrapper className="page-wrapper">
        <Header
          toggleSidebar={() => setSidebarOpen(prev => !prev)}
        />
        <Container
          sx={{
            paddingTop: '20px',
            maxWidth: '1200px',
          }}
        >
          <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
            <Outlet />
          </Box>
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default FullLayout;
