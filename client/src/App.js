import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

import AlertMessage from "./Components/AlertMessage";
import Navbar from "./Components/Navbar";
import ChatRoom from "./pages/ChatRoom";
import Error404 from "./pages/Error404";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SingIn from "./pages/SingIn";
import VerifyId from "./pages/VerifyID";

const App = () => {
    const alertMessage = useSelector(store => store.utils);

    return (
        <>
            <Navbar />
            {alertMessage.status > 0 &&
                <AlertMessage message={alertMessage?.message} status={alertMessage?.status} />
            }
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/chatroom/:id" element={<ChatRoom />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/singin" element={<SingIn />} />
                <Route path='/error404' element={<Error404 />} />
                <Route path='/verify' element={<VerifyId />} />
                <Route path="*" element={<Navigate to='/error404' />} />

            </Routes>

        </>
    )
}

export default App;