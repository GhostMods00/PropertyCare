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
            {/* Dashboard child routes */}
            <Route path="properties" element={<PropertyList />} />
            <Route path="properties/:id" element={<PropertyDetail />} />
            {/* Add more dashboard routes as needed */}
            <Route path="maintenance" element={<div>Maintenance</div>} />
            <Route path="tenants" element={<div>Tenants</div>} />
            <Route path="settings" element={<div>Settings</div>} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;