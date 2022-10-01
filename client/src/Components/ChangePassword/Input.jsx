import { TextField, Grid } from "@mui/material";
import React from "react";

const Input = ({ name, value, text, handleChange }) => {
    return (
        <Grid item xs={12} >
            <TextField label={text} name={name} onChange={handleChange} value={value} fullWidth />
        </Grid>
    )
}
export default Input;