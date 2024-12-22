import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  IconButton,
} from '@mui/material';
import Paginate from '../../components/Paginate';
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from '../../slices/usersApiSlice';
import { toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';

const UserListScreen = () => {
  const { pageNumber } = useParams();
  const { data, refetch, isLoading, error } = useGetUsersQuery({
    pageNumber,
  });

  const [deleteUser] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteUser(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        padding: '20px',
        backgroundColor: '#1e4620',
        height: 'fit-content',
      }}
    >
      <Box sx={{ padding: 4, backgroundColor: '#1e4620' }}>
        <Typography
          variant='h4'
          sx={{
            marginBottom: 3,
            color: '#76ff03',
            fontWeight: 'bold',
            textAlign: 'start',
          }}
        >
          Users
        </Typography>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <>
            <TableContainer
              component={Paper}
              sx={{
                borderRadius: 4,
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
                overflow: 'hidden',
              }}
            >
              <Table>
                <TableHead sx={{ backgroundColor: '#263238' }}>
                  <TableRow>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>
                      ID
                    </TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>
                      NAME
                    </TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>
                      EMAIL
                    </TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>
                      ADMIN
                    </TableCell>
                    <TableCell
                      sx={{ color: '#fff', fontWeight: 'bold' }}
                    ></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.users.map((user) => (
                    <TableRow
                      key={user._id}
                      hover
                      sx={{
                        '&:hover': { backgroundColor: '#f0f0f0' },
                      }}
                    >
                      <TableCell>{user._id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>
                        <a
                          href={`mailto:${user.email}`}
                          style={{ color: '#00bcd4', textDecoration: 'none' }}
                        >
                          {user.email}
                        </a>
                      </TableCell>
                      <TableCell>
                        {user.isAdmin ? (
                          <FaCheck
                            style={{ color: 'green', fontSize: '1.2rem' }}
                          />
                        ) : (
                          <FaTimes
                            style={{ color: 'red', fontSize: '1.2rem' }}
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        {!user.isAdmin && (
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton
                              component={Link}
                              to={`/admin/user/${user._id}/edit`}
                              sx={{ color: '#00c853' }}
                            >
                              <FaEdit />
                            </IconButton>
                            <IconButton
                              onClick={() => deleteHandler(user._id)}
                              sx={{ color: '#e53935' }}
                            >
                              <FaTrash />
                            </IconButton>
                          </Box>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Paginate pages={data.pages} page={data.page} isAdmin={true} />
          </>
        )}
      </Box>
    </Box>
  );
};

export default UserListScreen;
