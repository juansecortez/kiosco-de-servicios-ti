import React from 'react';
import Menuitems from './MenuItems';
import { useLocation } from 'react-router';
import { Box, List } from '@mui/material';
import NavItem from './NavItem';
import NavGroup from './NavGroup/NavGroup';

const SidebarItems = () => {
  const { pathname } = useLocation();
  const pathDirect = pathname;

  // Obtener el rol del usuario desde tu sistema de autenticación/roles}
  const userData = JSON.parse(localStorage.getItem('user'));
  const userRole = userData?.role || ''; // Asigna un valor predeterminado si userData es null o undefined

  const filteredItems = Menuitems.filter((item) => {
    if (item.adminOnly) {
      return userRole === 'Administrador';
    }
    return true;
  });

  return (
    <Box sx={{ px: 2 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {filteredItems.map((item) => {
          if (item.subheader) {
            return <NavGroup item={item} key={item.subheader} />;
          } else {
            return <NavItem item={item} key={item.id} pathDirect={pathDirect} />;
          }
        })}
      </List>
    </Box>
  );
};

export default SidebarItems;
