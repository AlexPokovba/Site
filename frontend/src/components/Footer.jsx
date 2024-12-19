import React from 'react';
import { Box, Typography, IconButton, Grid } from '@mui/material';
import { FaInstagram, FaFacebook, FaPhone } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#121212',
        color: '#fff',
        padding: '30px 0',
        borderTop: '2px solid #76ff03',
      }}
    >
      <Grid container spacing={4} justifyContent='center'>
        <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
          <Typography
            variant='subtitle1'
            gutterBottom
            sx={{
              fontWeight: 600,
              color: '#76ff03',
              textTransform: 'uppercase',
              marginBottom: 2,
            }}
          >
            Connect With Us
          </Typography>
          <Box>
            <IconButton
              href='https://instagram.com'
              target='_blank'
              rel='noopener noreferrer'
              sx={{
                color: '#fff',
                backgroundColor: '#2e2e2e',
                borderRadius: '50%',
                width: 40,
                height: 40,
                margin: '0 8px',
                '&:hover': {
                  backgroundColor: '#3d3d3d',
                  color: '#76ff03',
                },
              }}
            >
              <FaInstagram size={20} />
            </IconButton>
            <IconButton
              href='https://facebook.com'
              target='_blank'
              rel='noopener noreferrer'
              sx={{
                color: '#fff',
                backgroundColor: '#2e2e2e',
                borderRadius: '50%',
                width: 40,
                height: 40,
                margin: '0 8px',
                '&:hover': {
                  backgroundColor: '#3d3d3d',
                  color: '#76ff03',
                },
              }}
            >
              <FaFacebook size={20} />
            </IconButton>
            <IconButton
              href='tel:+123456789'
              sx={{
                color: '#fff',
                backgroundColor: '#2e2e2e',
                borderRadius: '50%',
                width: 40,
                height: 40,
                margin: '0 8px',
                '&:hover': {
                  backgroundColor: '#3d3d3d',
                  color: '#76ff03',
                },
              }}
            >
              <FaPhone size={20} />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
          <Typography
            variant='subtitle1'
            gutterBottom
            sx={{
              fontWeight: 600,
              color: '#76ff03',
              textTransform: 'uppercase',
              marginBottom: 2,
            }}
          >
            Our Location
          </Typography>
          <Typography variant='body2' sx={{ color: '#bdbdbd' }}>
            123 Green Street, Lime City
          </Typography>
          <Typography variant='body2' sx={{ color: '#bdbdbd' }}>
            Mon-Sat: 9:00 AM - 8:00 PM
          </Typography>
          <Typography variant='body2' sx={{ color: '#bdbdbd' }}>
            Sunday: Closed
          </Typography>
        </Grid>
      </Grid>
      <Box
        sx={{
          marginTop: '30px',
          textAlign: 'center',
          color: '#bdbdbd',
          fontSize: '0.875rem',
        }}
      >
        GymPro &copy; {new Date().getFullYear()} - All Rights Reserved
      </Box>
    </Box>
  );
};

export default Footer;
