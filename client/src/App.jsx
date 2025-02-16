import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import RoleRoute from './components/RoleRoute';

// Dashboard Components
import PropertyList from './components/dashboard/properties/PropertyList';
import PropertyDetail from './components/dashboard/properties/PropertyDetail';
import TicketList from './components/dashboard/tickets/TicketList';
import TicketDetail from './components/dashboard/tickets/TicketDetail';
import TenantList from './components/dashboard/tenants/TenantList';
import Reports from './components/dashboard/reports/Reports';
import Settings from './components/dashboard/settings/Settings';
import DashboardHome from './components/dashboard/DashboardHome';

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
            {/* Dashboard Home */}
            <Route index element={<DashboardHome />} />

            {/* Properties Routes - Accessible by both roles */}
            <Route path="properties" element={<PropertyList />} />
            <Route path="properties/:id" element={<PropertyDetail />} />

            {/* Tickets Routes - Different views based on role */}
            <Route path="tickets" element={<TicketList />} />
            <Route path="tickets/:id" element={<TicketDetail />} />

            {/* Manager-only Routes */}
            <Route
              path="tenants"
              element={
                <RoleRoute allowedRoles={['manager']}>
                  <TenantList />
                </RoleRoute>
              }
            />
            <Route
              path="reports"
              element={
                <RoleRoute allowedRoles={['manager']}>
                  <Reports />
                </RoleRoute>
              }
            />

            {/* Settings - Available to both roles but with different options */}
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* 404 Route */}
          <Route 
            path="*" 
            element={
              <div className="min-h-screen bg-dark-dark flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-white mb-4">404</h1>
                  <p className="text-gray-400 mb-6">Page not found</p>
                  <a 
                    href="/" 
                    className="text-primary hover:text-primary-light transition-colors"
                  >
                    Go back home
                  </a>
                </div>
              </div>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;