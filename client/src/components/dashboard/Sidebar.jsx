import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HomeIcon, 
  BuildingOfficeIcon, 
  WrenchScrewdriverIcon,
  UserGroupIcon,
  ChartBarIcon,
  Cog6ToothIcon 
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: HomeIcon, path: '/dashboard' },
    { name: 'Properties', icon: BuildingOfficeIcon, path: '/dashboard/properties' },
    { name: 'Maintenance', icon: WrenchScrewdriverIcon, path: '/dashboard/maintenance' },
    { name: 'Tenants', icon: UserGroupIcon, path: '/dashboard/tenants' },
    { name: 'Reports', icon: ChartBarIcon, path: '/dashboard/reports' },
    { name: 'Settings', icon: Cog6ToothIcon, path: '/dashboard/settings' },
  ];

  return (
    <div className="w-64 bg-dark border-r border-dark-lighter h-screen fixed left-0 top-0">
      <div className="p-4">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-light text-transparent bg-clip-text">
            PropertyCare
          </span>
        </Link>
      </div>

      <nav className="mt-8">
        <div className="px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-gray-400 hover:bg-dark-lighter hover:text-gray-200'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active-indicator"
                    className="absolute left-0 w-1 h-8 bg-primary rounded-r-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;