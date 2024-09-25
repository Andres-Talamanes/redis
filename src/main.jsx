import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route 
          path="/*" 
          element={
            <PrivateRoute>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                
              </Routes>
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
};

createRoot(document.getElementById('root')).render(<App />);