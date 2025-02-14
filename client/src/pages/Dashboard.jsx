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

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    { name: 'Total Properties', value: '12', icon: BuildingOfficeIcon },
    { name: 'Active Tickets', value: '5', icon: WrenchScrewdriverIcon },
    { name: 'Total Tenants', value: '24', icon: UserGroupIcon },
    { name: 'Monthly Revenue', value: '$24,000', icon: CurrencyDollarIcon },
  ];

  return (
    <div className="min-h-screen bg-dark-dark">
      <Sidebar />
      <div className="ml-64">
        <Header />
        <main className="p-6 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
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
            <div className="mt-8 bg-dark rounded-lg border border-dark-lighter p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
              {/* Add your recent activity content here */}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;