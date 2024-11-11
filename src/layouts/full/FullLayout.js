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

// Ajusta el espacio disponible del contenido según el sidebar
const PageWrapper = styled('div')(({ isOpen }) => ({
  display: 'flex',
  flexGrow: 1,
  flexDirection: 'column',
  zIndex: 1,
  backgroundColor: 'transparent',
  marginLeft: isOpen ? '325px' : '0px',  // Ajusta el margen según el tamaño del sidebar
  transition: 'margin-left 1s ease',    // Transición suave al cambiar el tamaño del sidebar
}));

const FullLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <MainWrapper className="mainwrapper">
      {/* Sidebar ajustable */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        onSidebarClose={() => setSidebarOpen(false)}
      />

      {/* Contenido ajustado dinámicamente */}
      <PageWrapper isOpen={isSidebarOpen} className="page-wrapper">
        <Header toggleSidebar={() => setSidebarOpen(prev => !prev)} />
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
