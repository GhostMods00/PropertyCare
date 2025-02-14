import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, BuildingOfficeIcon, WrenchScrewdriverIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const Home = () => {
  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
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
                to="/about"
                className="text-gray-300 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                About
              </Link>
              <Link 
                to="/features"
                className="text-gray-300 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Features
              </Link>
              <Link 
                to="/pricing"
                className="text-gray-300 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Pricing
              </Link>
              <Link 
                to="/contact"
                className="text-gray-300 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Contact
              </Link>
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
      <div className="relative overflow-hidden pt-[120px] pb-[110px] bg-dark-dark">
        {/* Animated background elements */}
        <div className="absolute inset-0 w-full h-full">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.2, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 1,
            }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-dark/20 rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="text-center"
          >
            {/* Main heading */}
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight"
            >
              <span className="block text-white">Streamline Your</span>
              <span className="block mt-2 bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
                Property Management
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-400"
            >
              Take control of your properties with our comprehensive maintenance 
              management system. Streamline operations, reduce costs, and improve tenant satisfaction.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/register"
                  className="group flex items-center justify-center px-8 py-4 border-0 rounded-lg bg-gradient-to-r from-primary to-primary-light text-dark font-semibold text-lg transition-all hover:shadow-lg hover:shadow-primary/50"
                >
                  Get Started Free
                  <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/demo"
                  className="flex items-center justify-center px-8 py-4 border border-primary/20 rounded-lg text-primary hover:bg-primary/10 font-semibold text-lg transition-all"
                >
                  Watch Demo
                </Link>
              </motion.div>
            </motion.div>

            {/* Feature Cards */}
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
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;