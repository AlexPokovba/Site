import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, TextField, Button } from '@mui/material';

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();

  const [keyword, setKeyword] = useState(urlKeyword || '');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/search/${keyword.trim()}`);
      setKeyword('');
    } else {
      navigate('/');
    }
  };

  return (
    <Box
      component='form'
      onSubmit={submitHandler}
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#1c1c1c',
        padding: '8px',
        borderRadius: '8px',
      }}
    >
      <TextField
        variant='outlined'
        fullWidth
        size='small'
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        InputProps={{
          style: {
            backgroundColor: '#333',
            color: 'white',
            borderRadius: '8px',
          },
        }}
        InputLabelProps={{
          style: { color: '#aaa' },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'lime',
            },
            '&:hover fieldset': {
              borderColor: '#76ff03',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#76ff03',
            },
          },
          marginRight: '10px',
        }}
      />
      <Button
        type='submit'
        variant='contained'
        sx={{
          backgroundColor: 'lime',
          color: '#121212',
          fontWeight: 'bold',
          textTransform: 'none',
          padding: '6px 16px',
          borderRadius: '8px',
          '&:hover': {
            backgroundColor: '#76ff03',
          },
        }}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBox;
