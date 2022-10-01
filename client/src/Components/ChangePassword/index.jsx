import React, { useState } from "react";
import { Grid, Typography, Box, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";


import Input from "./Input";
import * as api from "../../api";
import { ERROR, LOGOUT } from "../../constants/actionType";

const initialData = { previousPassword: '', newPassword: '', conformPassword: '' };

const ChangePassword = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(initialData);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const handleChange = e => setFormData({ ...FormData, [e.target.name]: e.target.value });

    const submitForm = async (e) => {
        e.preventDefault();

        if (formData.newPassword !== formData.conformPassword)
            dispatch({ type: ERROR, staus: 401, message: "Password don't match" });
        else {
            const data = await api.changePassworsd({ email: user.profile.email, previousPassword: formData.previousPassword, newPassword: formData.newPassword, conformPassword: formData.conformPassword });
            dispatch({ type: LOGOUT });
        }

    }
    return (<>

        <Box component="form" onSubmit={submitForm}>
            <Typography component="h2" variant="h6" color="coral" >Change Password</Typography>
            <Grid container spacing={2}>
                <Input text='previous password' name='previousPassword' handleChange={handleChange} value={formData.previousPassword} />
                <Input text='new password' name='newPassword' handleChange={handleChange} value={formData.newPassword} />
                <Input text='conform password' name='conformPassword' handleChange={handleChange} value={formData.conformPassword} />

            </Grid>
            <Button type="submit" variant="outlined" color="warning" sx={{ mt: 2 }} >change</Button>
        </Box>
    </>)
}

export default ChangePassword;