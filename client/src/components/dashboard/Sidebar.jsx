import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../../context/AuthContext';
import { 
  HomeIcon, 
  BuildingOfficeIcon, 
  WrenchScrewdriverIcon,
  UserGroupIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    {
      name: 'Dashboard',
      icon: HomeIcon,
      path: '/dashboard',
      roles: ['manager', 'staff']
    },
    {
      name: 'Properties',
      icon: BuildingOfficeIcon,
      path: '/dashboard/properties',
      roles: ['manager', 'staff']
    },
    {
      name: 'Maintenance',
      icon: WrenchScrewdriverIcon,
      path: '/dashboard/tickets',
      roles: ['manager', 'staff']
    },
    // Manager-only menu items
    {
      name: 'Tenants',
      icon: UserGroupIcon,
      path: '/dashboard/tenants',
      roles: ['manager']
    },
    {
      name: 'Reports',
      icon: ChartBarIcon,
      path: '/dashboard/reports',
      roles: ['manager']
    },
    // Settings available to all roles
    {
      name: 'Settings',
      icon: Cog6ToothIcon,
      path: '/dashboard/settings',
      roles: ['manager', 'staff']
    }
  ];

  // Filter menu items based on user role
  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(user?.role)
  );

  return (
    <div className="w-64 bg-dark border-r border-dark-lighter h-screen fixed left-0 top-0 flex flex-col">
      {/* Logo Section */}
      <div className="p-4 border-b border-dark-lighter">
        <Link to="/dashboard" className="flex items-center">
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-light text-transparent bg-clip-text">
            PropertyCare
          </span>
        </Link>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-dark-lighter">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-semibold">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="text-white font-medium">{user?.name}</p>
            <p className="text-gray-400 text-sm capitalize">{user?.role}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {filteredMenuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-gray-400 hover:bg-dark-lighter hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 w-1 h-8 bg-primary rounded-r-full"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-dark-lighter">
        <button
          onClick={logout}
          className="flex items-center space-x-2 text-gray-400 hover:text-white w-full px-4 py-2 rounded-lg transition-colors hover:bg-dark-lighter"
        >
          <ArrowLeftOnRectangleIcon className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;