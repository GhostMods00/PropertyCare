import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import { 
  BuildingOfficeIcon, 
  WrenchScrewdriverIcon, 
  UserGroupIcon, 
  CurrencyDollarIcon 
} from '@heroicons/react/24/outline';

const DashboardHome = () => {
  const stats = [
    { 
      name: 'Total Properties', 
      value: '12', 
      icon: BuildingOfficeIcon,
      change: '+2.5%',
      changeType: 'increase'
    },
    { 
      name: 'Active Maintenance', 
      value: '5', 
      icon: WrenchScrewdriverIcon,
      change: '-1.5%',
      changeType: 'decrease'
    },
    { 
      name: 'Total Tenants', 
      value: '24', 
      icon: UserGroupIcon,
      change: '+4.3%',
      changeType: 'increase'
    },
    { 
      name: 'Monthly Revenue', 
      value: '$24,000', 
      icon: CurrencyDollarIcon,
      change: '+10.2%',
      changeType: 'increase'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Welcome Section */}
      <div className="bg-dark rounded-lg border border-dark-lighter p-6">
        <h2 className="text-2xl font-bold text-white mb-2">Welcome back!</h2>
        <p className="text-gray-400">Here's what's happening with your properties today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-dark p-6 rounded-lg border border-dark-lighter"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.name}</p>
                  <p className="text-2xl font-semibold text-white mt-1">{stat.value}</p>
                  <div className={`flex items-center mt-1 ${
                    stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    <span className="text-sm">{stat.change}</span>
                  </div>
                </div>
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-dark rounded-lg border border-dark-lighter p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            {
              title: 'New Maintenance Request',
              description: 'Unit 101 reported AC issues',
              time: '2 hours ago'
            },
            {
              title: 'Rent Payment Received',
              description: 'Unit 205 paid monthly rent',
              time: '5 hours ago'
            },
            {
              title: 'Maintenance Completed',
              description: 'Plumbing fixed in Unit 304',
              time: '1 day ago'
            }
          ].map((activity, index) => (
            <div 
              key={index}
              className="flex items-start space-x-4 p-4 bg-dark-lighter rounded-lg"
            >
              <div className="flex-1">
                <h4 className="text-white font-medium">{activity.title}</h4>
                <p className="text-gray-400 text-sm">{activity.description}</p>
              </div>
              <span className="text-gray-400 text-sm">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Dashboard = () => {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-dark-dark">
      <Sidebar />
      <div className="ml-64">
        <Header />
        <main className="p-6 mt-16">
          {location.pathname === '/dashboard' ? <DashboardHome /> : <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;