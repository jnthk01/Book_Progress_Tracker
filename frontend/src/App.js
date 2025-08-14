import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Login />} /> {/* Default route */}
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
