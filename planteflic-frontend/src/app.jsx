import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NewPlant from './pages/NewPlant';
import EditPlant from './pages/EditPlant';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { LoadingProvider } from './context/LoadingContext';
import PrivateRoute from './routes/PrivateRoute';
import Navbar from './components/Navbar';
import Loader from './components/Loader';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <LoadingProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/plants/new" element={<PrivateRoute><NewPlant /></PrivateRoute>} />
              <Route path="/plants/edit/:id" element={<PrivateRoute><EditPlant /></PrivateRoute>} />
            </Routes>
            <Loader />
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  fontSize: '14px',
                  fontFamily: 'Arial, sans-serif'
                }
              }}
            />
          </LoadingProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;