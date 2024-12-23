import React from 'react';
import { Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  const location = useLocation();
  const isInAdmin = location.pathname.includes('/admin');
  const typeOfPage = isInAdmin
    ? location.pathname.split('/')[2]
    : location.pathname.split('/')[1];

  return (
    pages > 1 && (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '30px',
          marginBottom: '30px',
        }}
      >
        {[...Array(pages).keys()].map((x) => {
          const targetPage = x + 1;

          const link = isAdmin
            ? `/admin/${typeOfPage}/${targetPage}`
            : keyword
            ? `/search/${keyword}/page/${targetPage}`
            : `/page/${targetPage}`;

          return (
            <Link
              to={link}
              key={targetPage}
              style={{
                textDecoration: 'none',
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '40px',
                height: '40px',
                fontSize: '1rem',
                fontWeight: 600,
                margin: '0 5px',
                borderRadius: '50%',
                backgroundColor: targetPage === page ? '#76ff03' : '#1c1c1c', 
                color: targetPage === page ? '#121212' : '#e0e0e0',
                border: '1px solid',
                borderColor: targetPage === page ? '#76ff03' : '#444',
                transition: 'all 0.3s ease',
              }}
            >
              {targetPage}
            </Link>
          );
        })}
      </Box>
    )
  );
};

export default Paginate;
