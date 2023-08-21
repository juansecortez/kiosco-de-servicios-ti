import { Link } from 'react-router-dom';
import logo1 from 'src/assets/images/logos/icono.png';
import { styled } from '@mui/material';

const LinkStyled = styled(Link)(() => ({
  height: '60px',
  width: '180px',
  overflow: 'hidden',
  display: 'block',
  marginTop: '10px',
}));

const Logo = () => {
  return (
    <LinkStyled to="/profile">
      <img src={logo1} alt="#" height="50" />
    </LinkStyled>
  );
};

export default Logo;
