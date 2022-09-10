// libs
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// me
import Home from './pages/Home';
import Directory from './pages/Directory';

function App() {
    return (
        <Router>
            <Routes>
                {/* Home page */}
                <Route exact path="/" element={<Home />} />

                {/* Directory page */}
                <Route path="/directory" element={<Directory />} />
            </Routes>
        </Router>
    );
}

export default App;
