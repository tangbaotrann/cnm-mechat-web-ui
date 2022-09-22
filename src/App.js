// libs
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// me
import Home from './pages/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';


import PhoneBook from './pages/PhoneBook/PhoneBook';

function App() {
    return (
        <Router>
            <Routes>
                {/* Login */}
             
        {/* Home page */}
        <Route exact path="/Login" element={<Login />} />
                {/* Home page */}
                <Route exact path="/me.chat" element={<Home />} />

                {/* Register */}
                <Route exact path="/register" element={<Register />} />
                {/* PhoneBook */}
                <Route exact path="/phonebook" element={<PhoneBook />} />
            </Routes>
        </Router>
    );
}

export default App;
