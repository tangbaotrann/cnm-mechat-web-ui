// libs
  
import {Switch, BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// me
import Home from './pages/Home';
import Directory from './pages/Directory';
//me too
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ConfirmOTP from './pages/Register/ConfirmOTP/ConfirmOTP';
function App() {
    return (
      
        <Router>
              
            <Routes>
               {/* Home page
                <Route exact path="/" element={<Home />} />

                {/* Directory page *
                <Route path="/directory" element={<Directory />} />  */}
                {/* Login */}
                <Route exact path='/' element={<Login/>} />
                {/* Register */}
                <Route exact path='/Register' element={<Register/>} />
                {/* ConfirmOTP */}
             {/* <Route exact path='/ConfirmOTP' element={<ConfirmOTP/>} />  */}
            </Routes>
           
        </Router>
       
    
    );
}

export default App;
