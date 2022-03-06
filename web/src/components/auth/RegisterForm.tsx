import React, { FC, FormEvent } from 'react';
import {
  Box,
  Button,
  Divider,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

const RegisterForm: FC = () => {
  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('submit');
  };

  return (
    <Box
      sx={{
        border: 1,
        padding: 2,
        borderColor: '#cccccc',
        width: '350px',
        marginTop: 2,
      }}
    >
      <form onSubmit={onSubmitHandler}>
        <Grid container direction="column" justifyContent="flex-start">
          <Typography variant="h4" component="h1">
            Create account
          </Typography>
          <InputLabel
            sx={{ fontWeight: 500, marginTop: 1, color: '#000000' }}
            htmlFor="name"
          >
            Your Name
          </InputLabel>
          <TextField
            type="text"
            name="name"
            id="name"
            variant="outlined"
            size="small"
          />
          <InputLabel
            sx={{ fontWeight: 500, marginTop: 1, color: '#000000' }}
            htmlFor="email"
          >
            Your email
          </InputLabel>
          <TextField
            type="text"
            name="email"
            id="email"
            variant="outlined"
            size="small"
          />
          <InputLabel
            sx={{ fontWeight: 500, marginTop: 1, color: '#000000' }}
            htmlFor="password"
          >
            Password
          </InputLabel>
          <TextField
            type="text"
            name="password"
            id="password"
            variant="outlined"
            size="small"
            placeholder="Minimum 6 characters required"
          />
          <InputLabel
            sx={{ fontWeight: 500, marginTop: 1, color: '#000000' }}
            htmlFor="confirmPassword"
          >
            Confirm password
          </InputLabel>
          <TextField
            type="text"
            name="confirmPassword"
            id="confirmPassword"
            variant="outlined"
            size="small"
            placeholder="Minimum 6 characters required"
          />
          <Button
            variant="contained"
            style={{
              marginTop: '16px',
              height: '31px',
              backgroundColor: '#1d8a2f',
              color: 'white',
              textTransform: 'none',
            }}
            type="submit"
          >
            Register
          </Button>
        </Grid>
      </form>

      <Divider sx={{ marginTop: '16px', marginBottom: '16px' }} />
      <div>
        <small>
          Already have an account?{' '}
          <Link
            to="/signin"
            style={{ textDecoration: 'none', color: '#14a633' }}
          >
            Sign-in
          </Link>
        </small>
      </div>
    </Box>
  );
};

export default RegisterForm;
