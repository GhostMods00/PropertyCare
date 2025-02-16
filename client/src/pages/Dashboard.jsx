import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-dark-dark">
      <Sidebar />
      <div className="ml-64">
        <Header />
        <main className="p-6 mt-16">
          <Outlet /> {/* This will render the nested routes */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;