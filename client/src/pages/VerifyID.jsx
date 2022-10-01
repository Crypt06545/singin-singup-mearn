import React, { useState } from "react";
import { Container, Box, Typography, Grid, FormControlLabel, Button, Avatar, Checkbox, Link, TextField } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import * as api from "../api";
import { useNavigate } from "react-router-dom";

const VerifyID = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await api.verifyAccount({ email: user.profile.email, otp });
        if (data.status === 200) navigate('/profile');
    }

    return (<>

        <Container component="main" maxWidth="xs" >
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
                <Avatar sx={{ m: 1, bgcolor: 'red' }}>
                    <AccountCircleIcon />
                </Avatar>
                <Typography component="h1" variant="h5"> Verify ID</Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} margin={4}>



                    <Typography variant="body1" > Enter the 6 digit Code here: </Typography>
                    <TextField type='text' name='otp' label='Verification Code' fullWidth onChange={e => setOtp(e.target.value)} variant='standard' value={otp} />



                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
                        Verify
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/singin" variant="body2" >
                                Already have an account? Sing In
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container >

    </>)
}

export default VerifyID;