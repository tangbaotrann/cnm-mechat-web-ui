// libs
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// me
import Home from './pages/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import PhoneBook from './pages/PhoneBook/PhoneBook';
import ConFirmOTP from './pages/ConFirmOTP';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchUsers } from './redux/features/user/usersSlice';
import { fetchApiUser } from './redux/features/user/userSlice';
import { friendAccept } from './redux/features/friend/friendAcceptSlice';
import { meRequestFriend } from './redux/features/friend/meFriendRequestSlice';

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchApiUser());
        dispatch(friendAccept());
        dispatch(meRequestFriend());
    });
    return (
        <Router>
            <Routes>
                {/* Home page */}
                <Route exact path="/me.chat" element={<Home />} />

                {/* Login */}
                <Route path="/login" element={<Login />} />

                {/* Register */}
                <Route path="/register" element={<Register />} />

                <Route path="/confirmotp" element={<ConFirmOTP />} />
                {/* PhoneBook */}
                <Route path="/phonebook" element={<PhoneBook />} />
            </Routes>
        </Router>
    );
}

export default App;
