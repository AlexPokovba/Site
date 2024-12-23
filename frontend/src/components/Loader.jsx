import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const Loader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        minHeight: '150px',
      }}
    >
      <CircularProgress
        size={80}
        sx={{
          color: 'lime',
        }}
      />
    </Box>
  );
};

export default Loader;
