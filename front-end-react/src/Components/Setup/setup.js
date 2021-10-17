import React, { useState } from "react";
import Navbar from "../Navigation/Navbar";
import { useSelector, useDispatch } from 'react-redux'

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
import { useCreateApplicationMutation } from "../../Store/apiSlice";
import { setApplication } from '../../Store/ApplicationSlice';
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

export default function Setup(props) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [applicationName, setApplicationName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [description, setDescription] = useState('');
    const [createApplication, { data }] = apiSlice.endpoints.createApplication.useMutation()

    const OnSubmit = (e) => {
        e.preventDefault();
        const appObject = {
            Name: applicationName,
            Company: companyName,
            Description: description
        };
        var response = createApplication(appObject)
            .then(x => {
                dispatch(setApplication(appObject));
                props.history.push('/');
            });
    }

    const onChangeApplicationName = (e) => {
        setApplicationName(e.target.value);
        console.log(applicationName);
    }
    const onChangeCompanyName = (e) => {
        setCompanyName(e.target.value);
    }
    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Welcome to NavCMS
                </Typography>
                <form
                    className={classes.form}
                    noValidate
                    action=''
                    method='GET'
                    onSubmit={OnSubmit}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="application"
                                name="applicationName"
                                variant="outlined"
                                required
                                fullWidth
                                id="applicationName"
                                label="Application Name"
                                autoFocus
                                onChange={onChangeApplicationName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="company"
                                label="Company"
                                name="company"
                                autoComplete="company"
                                onChange={onChangeCompanyName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="description"
                                label="Description"
                                name="description"
                                autoComplete="description"
                                onChange={onChangeDescription}
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
                        Submit
                    </Button>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}
