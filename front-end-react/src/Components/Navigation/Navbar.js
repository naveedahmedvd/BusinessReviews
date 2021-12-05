// Importing files from Material-UI
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from '@mui/material';
import './navbar.css';

// // Using Inline Styling
// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//     },
//     menuButton: {
//         marginRight: theme.spacing(2),
//     },
// }));

// Exporting Default Navbar to the App.js File
export default function Navbar({ Title }) {
    // const classes = useStyles();

    const menuItems = [
        {
            url: '/',
            title: 'Business Reviews'
        },
        {
            url: '/Restaurants',
            title: 'Restaurants'
        },
    ];
    if (!localStorage.getItem('jwt')) {
        menuItems.push({
            url: '/signup',
            title: 'Sign Up'
        });
        menuItems.push({
            url: '/login',
            title: 'Login'
        });
    }
    else {
        menuItems.push({
            url: '/Admin',
            title: 'Admin'
        });
    }
    const menu = menuItems.map((x, idx) => <Typography key={idx} variant="h6" color="inherit"> <Link className='menuItem' href={x.url} style={{ textDecoration: 'none' }}>{x.title}</Link></Typography>)
    return (
        <div>
            <AppBar position="static" color="transparent">
                <Toolbar variant="dense">
                    <IconButton edge="start"
                        color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    {menu}
                </Toolbar>
            </AppBar>
        </div>
    );
}
