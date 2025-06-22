//frontend/App.jsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import NewPlant from './pages/NewPlant';
import EditPlant from './pages/EditPlant';

function App() {
  return (
        <BrowserRouter>
    <AuthProvider>
      <ThemeProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/plants/new" element={<PrivateRoute><NewPlant /></PrivateRoute>} />
            <Route path="/plants/edit/:id" element={<PrivateRoute><EditPlant /></PrivateRoute>} />
          </Routes>
      </ThemeProvider>
    </AuthProvider>
        </BrowserRouter>
  );
}

export default App;