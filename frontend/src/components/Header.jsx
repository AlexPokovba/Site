import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Box,
  Container,
  Button,
  Badge,
} from '@mui/material';
import { useState } from 'react';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { MdAdminPanelSettings } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import SearchBox from './SearchBox';
import logo from '../assets/logo.png';
import { resetCart } from '../slices/cartSlice';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);

  const [adminMenuAnchorEl, setAdminMenuAnchorEl] = useState(null);

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  const handleAdminMenuOpen = (event) => {
    setAdminMenuAnchorEl(event.currentTarget);
  };

  const handleAdminMenuClose = () => {
    setAdminMenuAnchorEl(null);
  };
  return (
    <AppBar
      position='sticky'
      sx={{
        backgroundColor: 'black',
        color: 'lime',
      }}
    >
      <Container>
        <Toolbar>
          <Box
            component={Link}
            to='/'
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'lime',
              flexGrow: 1,
            }}
          >
            <img
              src={logo}
              alt='GymPro'
              style={{ width: '40px', marginRight: '10px' }}
            />
            <Typography variant='h6' component='div'>
              GymPro
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1, marginLeft: 2 }}>
            <SearchBox />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 2 }}>
            <IconButton
              component={Link}
              to='/cart'
              sx={{
                backgroundColor: '#1c1c1c',
                color: 'lime',
                borderRadius: '50%',
                padding: '10px',
                '&:hover': {
                  backgroundColor: '#76ff03',
                  color: '#121212',
                },
              }}
            >
              <Badge
                badgeContent={cartItems.length}
                color='success'
                sx={{
                  '& .MuiBadge-badge': {
                    backgroundColor: 'red',
                    color: '#121212',
                    fontWeight: 'bold',
                    left: '50%',
                  },
                }}
              >
                <FaShoppingCart size={20} />
              </Badge>
            </IconButton>
          </Box>
          {userInfo ? (
            <>
              <Box
                sx={{ display: 'flex', alignItems: 'center', marginLeft: 2 }}
              >
                <IconButton
                  onClick={handleUserMenuOpen}
                  sx={{
                    backgroundColor: '#1c1c1c',
                    color: 'lime',
                    borderRadius: '50%',
                    padding: '10px',
                    '&:hover': {
                      backgroundColor: '#76ff03',
                      color: '#121212',
                    },
                  }}
                >
                  <FaUser size={20} />
                </IconButton>
              </Box>
              <Menu
                id='user-menu'
                anchorEl={userMenuAnchorEl}
                open={Boolean(userMenuAnchorEl)}
                onClose={handleUserMenuClose}
                sx={{
                  '& .MuiPaper-root': {
                    mt: 1,
                    backgroundColor: '#1c1c1c',
                    color: 'lime',
                  },
                }}
              >
                <MenuItem
                  component={Link}
                  to='/profile'
                  sx={{
                    '&:hover': { backgroundColor: '#333' },
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={logoutHandler}
                  sx={{
                    '&:hover': { backgroundColor: '#333' },
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 2 }}>
              <IconButton
                component={Link}
                to='/login'
                sx={{
                  backgroundColor: '#1c1c1c',
                  color: 'lime',
                  borderRadius: '50%',
                  padding: '10px',
                  '&:hover': {
                    backgroundColor: '#76ff03',
                    color: '#121212',
                  },
                }}
              >
                <FaUser size={20} />
              </IconButton>
            </Box>
          )}
          {userInfo && userInfo.isAdmin && (
            <>
              <Box
                sx={{ display: 'flex', alignItems: 'center', marginLeft: 2 }}
              >
                <Button
                  onClick={handleAdminMenuOpen}
                  startIcon={<MdAdminPanelSettings />}
                  sx={{
                    backgroundColor: '#1c1c1c',
                    color: 'lime',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    '&:hover': {
                      backgroundColor: '#76ff03',
                      color: '#121212',
                    },
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  Admin
                </Button>
              </Box>
              <Menu
                id='admin-menu'
                anchorEl={adminMenuAnchorEl}
                open={Boolean(adminMenuAnchorEl)}
                onClose={handleAdminMenuClose}
                sx={{
                  '& .MuiPaper-root': {
                    mt: 1,
                    backgroundColor: '#1c1c1c',
                    color: 'lime',
                  },
                }}
              >
                <MenuItem
                  component={Link}
                  to='/admin/productlist'
                  sx={{
                    '&:hover': { backgroundColor: '#333' },
                  }}
                >
                  Products
                </MenuItem>
                <MenuItem
                  component={Link}
                  to='/admin/orderlist'
                  sx={{
                    '&:hover': { backgroundColor: '#333' },
                  }}
                >
                  Orders
                </MenuItem>
                <MenuItem
                  component={Link}
                  to='/admin/userlist'
                  sx={{
                    '&:hover': { backgroundColor: '#333' },
                  }}
                >
                  Users
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
