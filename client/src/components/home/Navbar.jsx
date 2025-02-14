import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-dark/95 backdrop-blur-md border-b border-dark-lighter fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="bg-gradient-to-r from-primary to-primary-light text-transparent bg-clip-text text-xl font-bold">
                PropertyCare
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link 
              to="/about"
              className="text-gray-300 hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
            >
              About
            </Link>
            <Link 
              to="/features"
              className="text-gray-300 hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
            >
              Features
            </Link>
            <Link 
              to="/pricing"
              className="text-gray-300 hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
            >
              Pricing
            </Link>
            <Link 
              to="/contact"
              className="text-gray-300 hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
            >
              Contact
            </Link>
            <Link 
              to="/login"
              className="text-gray-300 hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
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

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-primary p-2"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
        transition={{ duration: 0.2 }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-dark border-b border-dark-lighter">
          <Link
            to="/about"
            className="text-gray-300 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
          >
            About
          </Link>
          <Link
            to="/features"
            className="text-gray-300 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
          >
            Features
          </Link>
          <Link
            to="/pricing"
            className="text-gray-300 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
          >
            Pricing
          </Link>
          <Link
            to="/contact"
            className="text-gray-300 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
          >
            Contact
          </Link>
          <Link
            to="/login"
            className="text-gray-300 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-gradient-to-r from-primary to-primary-light text-dark block px-3 py-2 rounded-md text-base font-medium"
          >
            Get Started
          </Link>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;