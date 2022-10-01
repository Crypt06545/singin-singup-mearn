import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Container, CssBaseline, Box, Paper, Typography, Avatar } from "@mui/material";

import { deleteAccount } from "../actions/auth";
import ChangePassword from "../Components/ChangePassword";

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    useEffect(() => {
        if (!user) navigate('/singin')
    }, [user])

    const deleteProfile = () => {
        dispatch(deleteAccount(user.profile._id, navigate));
    }


    return (
        <>

            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Paper sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }} >
                    <Avatar sx={{ m: 1, width: 128, height: 128 }} src={user.profile?.photo} alt='profile pic' />
                    <Typography component="h1" variant="h5">
                        {user.profile.firstName} {user.profile?.lastName}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                        <Typography variant="body1" >
                            <b>Email ID: </b>
                            {user.profile?.email}
                            <br />
                            <b>Age: </b>
                            {user.profile?.age}
                            <br />
                            <b>Join On: </b>
                            {user.profile?.date.split('T')[0]}
                        </Typography>
                        <ChangePassword />

                        <Button fullWidth variant="contained" color="error" sx={{ mt: 3, mb: 2 }} onClick={deleteProfile}> Delete account </Button>
                    </Box>
                </Paper>

            </Container>
        </>
    )
}

export default Profile;