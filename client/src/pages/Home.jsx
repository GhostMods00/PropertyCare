import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, BuildingOfficeIcon, WrenchScrewdriverIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const Home = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-dark-dark">
      {/* Navigation */}
      <nav className="bg-dark border-b border-dark-lighter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <h1 className="text-primary text-xl font-bold">PropertyCare</h1>
            </div>
            <div className="flex space-x-4">
              <Link 
                to="/login"
                className="text-gray-300 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-primary hover:bg-primary-dark text-dark font-medium px-4 py-2 rounded-md text-sm transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <motion.div 
            className="text-center"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
              <span className="block">Streamline Your</span>
              <span className="block text-primary">Property Maintenance</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Efficiently manage maintenance requests, track property issues, and keep your properties in perfect condition.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/register"
                  className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-dark bg-primary hover:bg-primary-dark md:py-4 md:text-lg md:px-10 transition-colors"
                >
                  Get Started
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Features Section */}
          <motion.div 
            className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <motion.div 
              className="bg-dark p-6 rounded-lg border border-dark-lighter"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <BuildingOfficeIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Property Management</h3>
              <p className="text-gray-400">Easily organize and track all your properties in one place.</p>
            </motion.div>

            <motion.div 
              className="bg-dark p-6 rounded-lg border border-dark-lighter"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <WrenchScrewdriverIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Maintenance Tracking</h3>
              <p className="text-gray-400">Track and manage maintenance requests efficiently.</p>
            </motion.div>

            <motion.div 
              className="bg-dark p-6 rounded-lg border border-dark-lighter"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <ChartBarIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Analytics</h3>
              <p className="text-gray-400">Get insights into your property maintenance patterns.</p>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Home;