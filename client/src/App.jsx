import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PropertyList from './components/dashboard/properties/PropertyList';
import PropertyDetail from './components/dashboard/properties/PropertyDetail';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Dashboard Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<div>Dashboard Home</div>} />
            <Route path="properties" element={<PropertyList />} />
            <Route path="properties/:id" element={<PropertyDetail />} />
            <Route path="maintenance" element={<div>Maintenance</div>} />
            <Route path="tenants" element={<div>Tenants</div>} />
            <Route path="settings" element={<div>Settings</div>} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;