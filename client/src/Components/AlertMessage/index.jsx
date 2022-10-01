import React, { useEffect } from "react";
import { Alert } from "@mui/material";
import { Container } from "@mui/system";
import { useDispatch } from "react-redux";

import { ERROR } from "../../constants/actionType";

const AlertMessage = ({ status, message }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        setTimeout(() => {
            dispatch({ type: ERROR, status: 0, message: "" });
        }, 3000)
    }, []);

    return (
        <Container>
            <Alert color={status >= 500 ? 'warning' : status >= 400 ? 'error' : 'success'} icon={status >= 400 ? "❗" : "✅"} sx={{ margin: 2, width: '100%' }} >{message}</Alert>
        </Container>
    )
}

export default AlertMessage;