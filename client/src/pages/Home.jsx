import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Box, TextField, Table, TableCell, TableBody, TableHead, TableRow, TableContainer, Paper, Typography, Avatar } from "@mui/material";

import * as api from "../api";

function createData(
    name,
    calories,
    fat,
    carbs,
    protein
) {
    return { name, calories, fat, carbs, protein };
}
const Home = () => {
    document.title = 'Cithe -Home';
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [options, setOptions] = useState([]);
    const [searchKey, setSearchKey] = useState("");

    useEffect(() => {
        if (user == null) navigate('/singin');
    }, [])

    const searchUsers = async (e) => {
        setSearchKey(e.target.value);
        const { data } = await api.searchUsers(searchKey);
        setOptions(data);
    }


    return (
        <>
            <Container component="main" maxWidth="xs" >
                <Box
                    sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
                    <TextField
                        label='Search by Name' type="text" onChange={searchUsers} value={searchKey} fullWidth sx={{ display: 'inline-block', }}
                    />
                </Box>
            </Container>
            <Container>
                <Typography variant="h4" align="center" paddingY={4}>
                    Search Users
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell  >First Name</TableCell>
                                <TableCell align="center">Last Name</TableCell>
                                <TableCell align="right">Image</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {options.length !== 0 ? options.map((user) => (
                                <TableRow key={user.firstName} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} component={Link} to={`/chatroom/${user._id}`}>
                                    <TableCell component="th" scope="row">
                                        {user.firstName}
                                    </TableCell>
                                    <TableCell align="center">{user.lastName}</TableCell>
                                    <TableCell align="right"><Avatar src={user.photo} alt='image' /></TableCell>
                                </TableRow>
                            )) : <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    No Result
                                </TableCell>
                                <TableCell align="center">No Result</TableCell>
                                <TableCell align="right">No Result</TableCell>
                            </TableRow>}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>

        </>
    )
}

export default Home;