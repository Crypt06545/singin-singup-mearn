import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Paper, Typography } from "@mui/material";


const Error404 = () => {
    document.title = 'Cithi -404 Error'
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => navigate('/'), 5000);
    }, []);

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="90vh" >
            <Paper variant="outlined">
                <Typography variant="h3" color="red" align="center" paddingX={5} paddingTop={2}>404 ERROR</Typography>
                <Typography variant="h5" align="center" paddingBottom={2}>Page not found</Typography>
            </Paper>
        </Box>
    )
}

export default Error404;