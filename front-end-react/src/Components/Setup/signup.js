import React, { useState } from "react";
import Navbar from "../Navigation/Navbar";
import { useSelector, useDispatch } from 'react-redux'
import jwt from 'jwt-decode'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { apiSlice } from "../../Store/apiSlice";
import { setToken } from '../../Store/AuthSlice';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [getToken] = apiSlice.endpoints.getToken.useMutation();

  const [createUser] = apiSlice.endpoints.createUser.useMutation();

  const loginCallback = (response) => {
    if (response.data && response.data.accessToken) {
      dispatch(setToken(response.data.accessToken))
      const userData = jwt(response.data.accessToken);
      console.log(userData);
      localStorage.setItem('userData', JSON.stringify(userData))
      localStorage.setItem('jwt', response.data.accessToken)
      props.history.push('/');
    }
    else if (response.error) {
      alert('unable to login')
      console.log(response.error);
    }
  }

  const OnSubmit = (e) => {
    e.preventDefault();
    const user = {
      Username: email,
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Password: password,
      ConfirmPassword: password
    };
    var response = createUser(user)
      .then(x => {
        if (!x.error) {
          getToken({ Username: user.Username, Password: user.Password })
            .then(response => {
              loginCallback(response);
            })
            .catch(error => {
              console.log('unable to login', error);
            })
          // props.history.push('/setup');
        }
        else {
          debugger;
          alert('unable to create user without admin privileg');
        }

      })
      .catch(err => {
        console.log('unable to sign up', err);
      });
  }

  const onChangeFirstName = (e) => {
    setFirstName(e.target.value);
    console.log(firstName);
  }
  const onChangeLastName = (e) => {
    setLastName(e.target.value);
  }
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  }
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form}
          noValidate
          onSubmit={OnSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={onChangeFirstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={onChangeLastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={onChangeEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={onChangePassword}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
