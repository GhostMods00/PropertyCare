import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/home/Navbar';
import Footer from '../components/home/Footer';
import { 
  BuildingOfficeIcon,
  WrenchScrewdriverIcon,
  UserGroupIcon,
  ChartBarIcon,
  BellAlertIcon,
  DocumentChartBarIcon
} from '@heroicons/react/24/outline';

const Features = () => {
  const features = [
    {
      title: "Property Management",
      description: "Easily manage multiple properties, units, and tenant information in one centralized platform.",
      icon: BuildingOfficeIcon,
      color: "primary"
    },
    {
      title: "Maintenance Tracking",
      description: "Track and manage maintenance requests efficiently with real-time status updates and task assignments.",
      icon: WrenchScrewdriverIcon,
      color: "blue"
    },
    {
      title: "Tenant Portal",
      description: "Provide tenants with a dedicated portal to submit and track maintenance requests.",
      icon: UserGroupIcon,
      color: "purple"
    },
    {
      title: "Analytics & Reports",
      description: "Generate detailed reports and insights on maintenance performance and property status.",
      icon: ChartBarIcon,
      color: "green"
    },
    {
      title: "Real-time Notifications",
      description: "Stay informed with instant notifications about maintenance requests and updates.",
      icon: BellAlertIcon,
      color: "yellow"
    },
    {
      title: "Tickets Assignment",
      description: "Assign tickets to maintenance staff efficiently.",
      icon: DocumentChartBarIcon,
      color: "pink"
    }
  ];

  return (
    <div className="min-h-screen bg-dark-dark">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Powerful Features for 
              <span className="bg-gradient-to-r from-primary to-primary-light text-transparent bg-clip-text"> Property Management</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-8">
              Everything you need to efficiently manage property maintenance and keep your properties running smoothly.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-primary-light text-dark font-semibold hover:opacity-90 transition-all"
            >
              Get Started Free
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-dark">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-dark-lighter p-6 rounded-lg hover:border-primary/50 border border-dark-lighter transition-all"
              >
                <div className={`h-12 w-12 rounded-lg bg-${feature.color}/10 flex items-center justify-center mb-4`}>
                  <feature.icon className={`h-6 w-6 text-${feature.color}-500`} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlight Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-dark p-8 rounded-lg border border-dark-lighter"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Streamlined Maintenance Management
                </h2>
                <p className="text-gray-400 mb-6">
                  Our platform provides a comprehensive solution for property maintenance management, 
                  helping you save time and reduce costs while improving service quality.
                </p>
                <ul className="space-y-4">
                  {[
                    "Centralized maintenance request tracking",
                    "Automated task assignments",
                    "Real-time status updates",
                    "Document and photo attachments",
                    "Mobile-friendly interface"
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center text-gray-400"
                    >
                      <span className="h-2 w-2 bg-primary rounded-full mr-2" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <img 
                  src="/maintenance.png" 
                  alt="Maintenance Management Dashboard"
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-dark">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-dark-lighter to-dark p-12 rounded-lg"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Property Management?
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of property managers who have streamlined their maintenance operations with PropertyCare.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-3 rounded-lg bg-primary text-dark font-semibold hover:bg-primary-light transition-colors"
              >
                Get Started Free
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-3 rounded-lg border border-primary text-primary hover:bg-primary/10 font-semibold transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Features;