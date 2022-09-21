// libs
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// me
import Home from './pages/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

import ConfirmOTP from './pages/ConfirmOTP/ConfirmOTP';
import PhoneBook from './pages/PhoneBook/PhoneBook';

function App() {
    return (
        <Router>
            <Routes>
                {/* Login */}
                <Route path="/login" element={<Login />} />

                {/* Home page */}
                <Route exact path="/me.chat" element={<Home />} />

                {/* Register */}
                <Route path="/Register" element={<Register />} />
                {/* ConfirmOTP */}

                <Route exact path="/ConfirmOTP" element={<ConfirmOTP />} />
                {/* PhoneBook */}
                <Route exact path="/phonebook" element={<PhoneBook />} />
            </Routes>
        </Router>
    );
}

export default App;
