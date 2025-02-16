import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { 
  BuildingOfficeIcon, 
  WrenchScrewdriverIcon,
  UserGroupIcon, 
  CurrencyDollarIcon,
  ChartBarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const DashboardHome = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    properties: 0,
    activeTickets: 0,
    tenants: 0,
    revenue: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/dashboard/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setStats(data.stats);
        setRecentActivities(data.recentActivities);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to fetch dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-dark rounded-lg border border-dark-lighter p-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          Welcome back, {user?.name}!
        </h2>
        <p className="text-gray-400">
          Here's what's happening with your properties today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Properties',
            value: stats.properties,
            icon: BuildingOfficeIcon,
            color: 'primary'
          },
          {
            title: 'Active Tickets',
            value: stats.activeTickets,
            icon: WrenchScrewdriverIcon,
            color: 'yellow'
          },
          {
            title: 'Total Tenants',
            value: stats.tenants,
            icon: UserGroupIcon,
            color: 'blue'
          },
          {
            title: 'Monthly Revenue',
            value: formatCurrency(stats.revenue),
            icon: CurrencyDollarIcon,
            color: 'green'
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-dark p-6 rounded-lg border border-dark-lighter"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{stat.title}</p>
                <p className="text-2xl font-semibold text-white mt-1">{stat.value}</p>
              </div>
              <div className={`h-12 w-12 bg-${stat.color}/10 rounded-lg flex items-center justify-center`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-dark rounded-lg border border-dark-lighter p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-4 p-4 bg-dark-lighter rounded-lg"
            >
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <ClockIcon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-white">{activity.description}</p>
                <p className="text-gray-400 text-sm mt-1">{activity.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Upcoming Maintenance */}
      {user.role === 'manager' && (
        <div className="bg-dark rounded-lg border border-dark-lighter p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Upcoming Maintenance</h3>
          <div className="space-y-4">
            {/* Add upcoming maintenance items here */}
            <div className="text-gray-400">No upcoming maintenance scheduled.</div>
          </div>
        </div>
      )}

      {/* Performance Overview - Managers Only */}
      {user.role === 'manager' && (
        <div className="bg-dark rounded-lg border border-dark-lighter p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Performance Overview</h3>
            <select 
              className="bg-dark-lighter text-gray-400 border border-dark-lighter rounded-lg px-3 py-1"
              defaultValue="month"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
          <div className="h-64 flex items-center justify-center">
            <div className="text-gray-400">Chart will be displayed here</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;