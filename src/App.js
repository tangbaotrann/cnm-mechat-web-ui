// libs
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// me
import Home from './pages/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import PhoneBook from './pages/PhoneBook/PhoneBook';
import ConFirmOTP from './pages/ConFirmOTP';
import { fetchApiUser } from './redux/features/user/userSlice';

function App() {
    const dispatch = useDispatch();

    // get user current
    useEffect(() => {
        dispatch(fetchApiUser());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
