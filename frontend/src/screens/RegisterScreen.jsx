import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  Grid,
  Paper,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <Grid
      container
      justifyContent='center'
      alignItems='center'
      sx={{ minHeight: '100vh', backgroundColor: '#1b3a27', padding: 2 }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            backgroundColor: '#222',
            color: '#fff',
            borderRadius: 3,
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
          }}
        >
          <Typography
            variant='h4'
            align='center'
            gutterBottom
            sx={{ color: 'lime', fontWeight: 'bold' }}
          >
            Create an Account
          </Typography>

          <Box component='form' onSubmit={submitHandler} noValidate>
            <TextField
              fullWidth
              label='Name'
              variant='outlined'
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin='normal'
              InputProps={{
                style: { color: '#fff' },
              }}
              InputLabelProps={{
                style: { color: '#9e9e9e' },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'lime' },
                  '&:hover fieldset': { borderColor: '#00ff00' },
                  '&.Mui-focused fieldset': { borderColor: '#00ff00' },
                },
              }}
            />

            <TextField
              fullWidth
              label='Email Address'
              variant='outlined'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin='normal'
              InputProps={{
                style: { color: '#fff' },
              }}
              InputLabelProps={{
                style: { color: '#9e9e9e' },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'lime' },
                  '&:hover fieldset': { borderColor: '#00ff00' },
                  '&.Mui-focused fieldset': { borderColor: '#00ff00' },
                },
              }}
            />

            <TextField
              fullWidth
              label='Password'
              variant='outlined'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin='normal'
              InputProps={{
                style: { color: '#fff' },
              }}
              InputLabelProps={{
                style: { color: '#9e9e9e' },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'lime' },
                  '&:hover fieldset': { borderColor: '#00ff00' },
                  '&.Mui-focused fieldset': { borderColor: '#00ff00' },
                },
              }}
            />

            <TextField
              fullWidth
              label='Confirm Password'
              variant='outlined'
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              margin='normal'
              InputProps={{
                style: { color: '#fff' },
              }}
              InputLabelProps={{
                style: { color: '#9e9e9e' },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'lime' },
                  '&:hover fieldset': { borderColor: '#00ff00' },
                  '&.Mui-focused fieldset': { borderColor: '#00ff00' },
                },
              }}
            />

            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{
                backgroundColor: 'lime',
                color: '#000',
                borderRadius: 3,
                padding: 1.5,
                marginTop: 2,
                '&:hover': {
                  backgroundColor: '#00ff00',
                },
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} color='inherit' />
              ) : (
                'Register'
              )}
            </Button>
          </Box>

          <Typography
            variant='body2'
            align='center'
            sx={{ marginTop: 2, color: '#9e9e9e' }}
          >
            Already have an account?{' '}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : '/login'}
              style={{
                color: 'lime',
                fontWeight: 'bold',
                textDecoration: 'none',
              }}
            >
              Login Here
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default RegisterScreen;
