import React from "react"
import { TextField, InputAdornment, Grid, IconButton } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';



export default ({ half = false, name, handleChange, autoFocus, label, handleShowPassword, type, value }) => {
    return (
        <Grid item xs={half ? 6 : 12}>
            <TextField
                name={name}
                type={type}
                fullWidth

                value={value}
                onChange={handleChange}
                variant='outlined'
                label={label}
                autoFocus={autoFocus}
                required
                InputProps={name === 'password' ? {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword} >
                                {type === 'password' ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                        </InputAdornment>
                    )
                } : null}
            />
        </Grid>
    )
}