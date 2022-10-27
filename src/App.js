// libs
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// me
import Home from './pages/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import PhoneBook from './pages/PhoneBook/PhoneBook';
import ConFirmOTP from './pages/ConFirmOTP';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchUsers } from './redux/features/user/usersSlice';
import { fetchApiUser } from './redux/features/user/userSlice';
import { friendAccept } from './redux/features/friend/friendAcceptSlice';
import { meRequestFriend } from './redux/features/friend/meFriendRequestSlice';
import ForgetPassWord from './pages/Login/ForgetPassWord';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
        // dispatch(fetchApiUser());
        // dispatch(friendAccept());
        // dispatch(meRequestFriend());
    });

    return (
        <Router>
            <Routes>
                {/* Login */}

                <Route exact path="/" element={<Login />} />
                {/* Home page */}
                <Route path="/me.chat" element={<Home />} />
                {/* Register */}
                <Route path="/register" element={<Register />} />

                <Route path="/forgetPassWord" element={<ForgetPassWord />} />

                <Route path="/confirmotp" element={<ConFirmOTP />} />
                {/* PhoneBook */}
                <Route path="/phonebook" element={<PhoneBook />} />
            </Routes>
        </Router>
    );
}

export default App;
