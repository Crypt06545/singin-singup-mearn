import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Link, Button, CssBaseline, Avatar } from '@mui/material';
import { Link as LinkTag, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

import ICON from "../../images/logo.png";
import { LOGOUT } from '../../constants/actionType';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    useEffect(() => {
        //code 
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    const logout = () => {
        dispatch({ type: LOGOUT });
        setUser(null);
        navigate('/singin');
    }
    return (
        <>

            <CssBaseline />
            <AppBar
                position="static"
                color="default"
                elevation={0}
                sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
            >
                <Toolbar sx={{ flexWrap: 'wrap' }}>
                    <Avatar src={ICON} alt='logo' variant='rounded' />
                    <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }} paddingLeft={1}>
                        CITHI -Chat Room
                    </Typography>
                    <nav>
                        <Link variant="button" color="text.primary" sx={{ my: 1, mx: 1.5 }} component={LinkTag} to='/' >
                            Home
                        </Link>
                        {user &&
                            <Link variant="button" color="text.primary" component={LinkTag}
                                to='/profile'>  {user.profile?.firstName} </Link>

                        }
                        <Link variant="button" color="text.primary" sx={{ my: 1, mx: 1.5 }} component={LinkTag} to='/support'>
                            Support
                        </Link>

                    </nav>
                    {user ?
                        <Button variant='contained' sx={{ my: 1, mx: 1.5 }} color={'error'} onClick={logout}>Logout</Button>
                        :
                        <Button variant="contained" component={LinkTag} to='/singin' sx={{ my: 1, mx: 1.5 }}>
                            Login
                        </Button>
                    }
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar;