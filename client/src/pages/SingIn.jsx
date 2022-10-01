import React, { useState } from "react";
import { Container, Box, Typography, Grid, FormControlLabel, Button, Avatar, Checkbox, Link, } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch, } from "react-redux";
import { useNavigate } from "react-router-dom";
import FileBase64 from "react-file-base64";

import { ERROR } from "../constants/actionType";
import Input from "../Components/InputPassword";
import { singUp, singIn } from "../actions/auth";



const initialData = { firstName: '', lastName: '', email: '', password: '', conformPassword: '', age: '' };

const SingIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialData);
    const [isSingUp, setIsSingUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);



    document.title = `Cithi -Sing ${isSingUp ? 'Up' : 'In'}`;

    const handleShowPassword = () => setShowPassword(preValue => !preValue);
    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });


    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSingUp) {
            if (!formData.firstName || !formData.lastName || !formData.email || !formData.age)
                dispatch({ type: ERROR, status: 400, message: "Please fill all the input fields" });
            else if (formData.password.length < 8)
                dispatch({ type: ERROR, status: 400, message: "Your password is too much short" });
            else if (formData.password !== formData.conformPassword)
                dispatch({ type: ERROR, status: 400, message: "Your password don't match" });
            else {
                dispatch({ type: ERROR, status: 500, message: "Verify your accout" });
                dispatch(singUp(formData, navigate));
            }
        } else
            dispatch(singIn(formData, navigate));

    }

    return (
        <Container component="main" maxWidth="xs" >

            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }}  >
                <Avatar sx={{ m: 1, bgcolor: 'red' }}>
                    <AccountCircleIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sing {isSingUp ? 'Up' : 'In'}
                </Typography>

                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        {isSingUp &&
                            <>
                                <Input name='firstName' label='First Name' handleChange={handleChange} value={formData.firstName} half />
                                <Input name='lastName' label='Last Name' handleChange={handleChange} value={formData.lastName} half />
                            </>}
                        <Input type='email' name='email' label='Email Address' handleChange={handleChange} value={formData.email} />

                        <Input type={showPassword ? 'text' : 'password'} name='password' label='Password' handleChange={handleChange} handleShowPassword={handleShowPassword} value={formData.password} />

                        {isSingUp && <>
                            <Input type='password' name='conformPassword' label='Comform Password' handleChange={handleChange} value={formData.conformPassword} />
                            <Input type='number' name='age' label='Age' handleChange={handleChange} value={formData.age} />
                            <Grid paddingTop={2} paddingX={3}>
                                Profile Pic:   <FileBase64 type="file" mutiple={false} onDone={({ base64 }) => setFormData({ ...formData, photo: base64 })} />
                            </Grid>
                        </>}

                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label={isSingUp ? "I am agree with the terms and conditions" : "remember me"}
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
                        Sign {isSingUp ? 'up' : 'in'}
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2" onClick={() => setIsSingUp(!isSingUp)}>
                                {isSingUp ? "Already have an account? Sign in" : "Don't have any account? Sing Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            {/* <Copyright sx={{ mt: 5 }} /> */}
        </Container >


    )
}
export default SingIn;