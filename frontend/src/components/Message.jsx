import React from 'react';
import { Box, Typography } from '@mui/material';

const Message = ({ severity = 'info', children }) => {
  const getBackgroundColor = (severity) => {
    switch (severity) {
      case 'success':
        return '#4caf50';
      case 'error':
        return '#f44336';
      case 'warning':
        return '#ff9800';
      case 'info':
      default:
        return '#2196f3';
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: getBackgroundColor(severity),
        color: '#fff',
        padding: '10px 16px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '16px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography
        variant='body1'
        sx={{
          fontSize: '1rem',
          fontWeight: 500,
        }}
      >
        {children}
      </Typography>
    </Box>
  );
};

export default Message;
