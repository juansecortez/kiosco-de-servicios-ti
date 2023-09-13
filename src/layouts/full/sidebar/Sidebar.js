import { Box, Drawer } from '@mui/material';
import Logo from '../shared/logo/Logo';
import SidebarItems from './SidebarItems';
import { Logout } from './Logout';

const Sidebar = (props) => {
  const sidebarWidth = '350px';

  return (
    <Drawer
      anchor="left"
      open={props.isSidebarOpen}
      onClose={props.onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: {
          width: sidebarWidth,
          bgcolor: 'peco.main',
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
    >
      <Box px={2}>
        <Logo />
      </Box>
      <SidebarItems />
      <Logout />
    </Drawer>
  );
};

export default Sidebar;
