import React from 'react';
import { AppBar, Toolbar, IconButton,} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { IconMenu } from '@tabler/icons';
import Logo from './Brand';
import Profile from './Profile';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'center',
  },
  logoContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
}));

const Header = (props) => {
  const classes = useStyles();

  return (
    <AppBar position="sticky" color="inherit">
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={props.toggleSidebar}
        >
          <IconMenu width="20" height="20" />
        </IconButton>
        <div className={classes.logoContainer}>
          <Logo />
        </div>
        <Profile />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
