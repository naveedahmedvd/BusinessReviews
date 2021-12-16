import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useHistory } from "react-router-dom";


const pages = ['Products', 'Pricing', 'Blog'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];



let IS_ADMIN = false;
let IS_LOGGED_IN = false;
export default function Navbar() {
    const history = useHistory();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const [anchorElUser2, setAnchorElUser2] = React.useState(null);

    // const [isAdmin, setIsAdmin] = React.useState(false);


    const logout = (e) => {
        e.preventDefault();
        console.log('clicked', e);
        localStorage.removeItem('jwt');
        window.location.reload(false);
    }
    const settings = [
        {
            title: 'Profile', url: '',
        },
        {
            title: 'Account', url: '',
        },
        {
            title: 'Dashboard', url: '',
        },
        {
            title: 'Logout', url: '', onclick: logout
        },
    ]
    const settings2 = [
        {
            url: '/signup',
            title: 'Sign Up'
        },
        {
            url: '/login',
            title: 'Login'
        }
    ]
    const navigateTo = (url) => {
        history.push(url);
    }

    const jwt = localStorage.getItem('jwt');

    const menuItems = [
        {
            url: '/',
            title: 'Business Reviews'
        },
        {
            url: '/Restaurants',
            title: 'Restaurants'
        },
        // {
        //     url: '/search',
        //     title: 'Search'
        // },
    ];

    if (jwt) {
        IS_LOGGED_IN = true;
        const tmp = localStorage.getItem('userData');
        const userData = JSON.parse(tmp ? tmp : {});
        const isAdmin = userData.role == 'admin';
        IS_ADMIN = isAdmin;
        if (isAdmin) {
            menuItems.push({
                url: '/Admin',
                title: 'Admin'
            });

        }
    }


    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    ////

    const handleOpenUserMenu2 = (event) => {
        setAnchorElUser2(event.currentTarget);
    };


    const handleCloseUserMenu2 = () => {
        setAnchorElUser2(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        Business
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {menuItems.map((page) => (
                                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center" onClick={() => navigateTo(page.url)}>{page.title}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {menuItems.map((page) => (
                            <Button
                                key={page.title}
                                onClick={() => navigateTo(page.url)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.title}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 0 }} hidden={!IS_LOGGED_IN}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar2"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting.title} onClick={setting.onclick}>
                                    <Typography textAlign="center">{setting.title}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 0 }} hidden={IS_LOGGED_IN}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu2} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar2"
                            anchorEl={anchorElUser2}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser2)}
                            onClose={handleCloseUserMenu2}
                        >
                            {settings2.map((setting) => (
                                <MenuItem key={setting.title} onClick={() => navigateTo(setting.url)}>
                                    <Typography textAlign="center">{setting.title}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    );
};
