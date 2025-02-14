import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, BuildingOfficeIcon, WrenchScrewdriverIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const Home = () => {
  return (
    <div className="min-h-screen bg-dark-dark">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-dark/95 backdrop-blur-md border-b border-dark-lighter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <h1 className="bg-gradient-to-r from-primary to-primary-light text-transparent bg-clip-text text-xl font-bold">
                PropertyCare
              </h1>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-4">
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
                className="bg-gradient-to-r from-primary to-primary-light hover:opacity-90 text-dark font-medium px-4 py-2 rounded-md text-sm transition-all"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-32 pb-20 bg-dark-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                <span className="block text-white">Streamline Your</span>
                <span className="block mt-2 bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
                  Property Management
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-xl">
                Take control of your properties with our comprehensive maintenance 
                management system. Streamline operations, reduce costs, and improve tenant satisfaction.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/register"
                    className="inline-flex items-center px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-primary-light text-dark font-semibold transition-all hover:shadow-lg hover:shadow-primary/50"
                  >
                    Get Started Free
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/demo"
                    className="inline-flex items-center px-8 py-3 border border-primary/20 rounded-lg text-primary hover:bg-primary/10 font-semibold transition-all"
                  >
                    Watch Demo
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Right side - Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <img
                src="/building-management.png"
                alt="Property Management"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-dark-darker py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
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
      </div>

      {/* Info Section with White Background */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
              Why Choose <span className="text-primary">PropertyCare</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Our comprehensive property management solution helps you streamline operations,
              reduce costs, and improve tenant satisfaction.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Efficient Management",
                description: "Streamline your property management tasks with our intuitive dashboard and automated workflows."
              },
              {
                title: "Real-time Updates",
                description: "Stay informed with instant notifications and real-time status updates on maintenance requests."
              },
              {
                title: "Cost Effective",
                description: "Reduce operational costs with our automated systems and preventive maintenance schedules."
              },
              {
                title: "Data Security",
                description: "Your data is protected with enterprise-grade security and regular backups."
              },
              {
                title: "24/7 Support",
                description: "Our dedicated support team is available around the clock to help you succeed."
              },
              {
                title: "Mobile First",
                description: "Access your property management system anywhere, anytime with our mobile-friendly platform."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-dark mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-darker py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link to="/features" className="text-gray-400 hover:text-primary">Features</Link></li>
                <li><Link to="/pricing" className="text-gray-400 hover:text-primary">Pricing</Link></li>
                <li><Link to="/demo" className="text-gray-400 hover:text-primary">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-primary">About Us</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-primary">Contact</Link></li>
                <li><Link to="/careers" className="text-gray-400 hover:text-primary">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link to="/blog" className="text-gray-400 hover:text-primary">Blog</Link></li>
                <li><Link to="/help" className="text-gray-400 hover:text-primary">Help Center</Link></li>
                <li><Link to="/guides" className="text-gray-400 hover:text-primary">Guides</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/privacy" className="text-gray-400 hover:text-primary">Privacy</Link></li>
                <li><Link to="/terms" className="text-gray-400 hover:text-primary">Terms</Link></li>
                <li><Link to="/security" className="text-gray-400 hover:text-primary">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-dark-lighter">
            <p className="text-center text-gray-400">
              © 2024 PropertyCare. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;