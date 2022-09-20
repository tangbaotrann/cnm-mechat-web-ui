// libs
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// me
import Home from './pages/Home';
import Directory from './pages/Directory';
//me too
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

                {/* Directory page */}
                <Route path="/directory" element={<Directory />} />

                {/* Register */}
                <Route path="/Register" element={<Register />} />
                {/* ConfirmOTP */}

                <Route exact path='/ConfirmOTP' element={<ConfirmOTP/>} />  
                {/* PhoneBook */} 
                <Route exact path='/PhoneBook' element={<PhoneBook/>} /> 

            </Routes>
        </Router>
    );
}

export default App;
