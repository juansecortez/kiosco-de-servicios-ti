import { Box, Drawer } from '@mui/material';
import Logo from '../shared/logo/Logo';
import SidebarItems from './SidebarItems';
import { Logout } from './Logout';

const Sidebar = (props) => {
  const sidebarWidth = props.isSidebarOpen ? '325px' : '60px'; // Ancho dinámico

  return (
    <Drawer
      anchor="left"
      open={props.isSidebarOpen}
      onClose={props.onSidebarClose}
      variant="persistent"  // Sidebar persistente
      ModalProps={{
        keepMounted: true,  // Mejora el rendimiento
      }}
      PaperProps={{
        sx: {
          boxShadow: (theme) => theme.shadows[8],
          bgcolor: 'peco.main', // Color de fondo personalizado
        },
      }}
    >
      {/* Usar el contenedor principal con `overflowY` configurado */}
      <Box
        sx={{
          width: sidebarWidth,
          transition: 'width 1s ease',
          overflowY: 'auto',  // Controla el scrollbar solo cuando sea necesario
          height: '100%',
          '&::-webkit-scrollbar': { width: '6px' },  // Scrollbar más delgado inline
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',  // Color sutil del scrollbar
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.3)',  // Color del thumb al hacer hover
          },
        }}
      >
        <Box px={2}>
          <Logo />
        </Box>
        <SidebarItems />
        <Logout />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
