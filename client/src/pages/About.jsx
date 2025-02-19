import { motion } from 'framer-motion';
import Navbar from '../components/home/Navbar';
import Footer from '../components/home/Footer';
import { ChartBarIcon, ClockIcon, UserGroupIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

const About = () => {
  const achievements = [
    {
      icon: BuildingOfficeIcon,
      stat: "10,000+",
      label: "Properties Managed",
      description: "Trusted by property managers across the country"
    },
    {
      icon: UserGroupIcon,
      stat: "50,000+",
      label: "Active Users",
      description: "Growing community of satisfied customers"
    },
    {
      icon: ClockIcon,
      stat: "30%",
      label: "Time Saved",
      description: "Average efficiency improvement for our clients"
    },
    {
      icon: ChartBarIcon,
      stat: "95%",
      label: "Customer Satisfaction",
      description: "Consistently high service ratings"
    }
  ];

  return (
    <div className="min-h-screen bg-dark-dark">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About PropertyCare
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Streamlining property maintenance and management through innovative technology solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 px-4 bg-dark">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-gray-400 mb-4">
                At PropertyCare, we're committed to revolutionizing property maintenance management 
                through innovative technology solutions that enhance efficiency, transparency, and 
                communication between property managers, maintenance staff, and tenants.
              </p>
              <p className="text-gray-400">
                Our goal is to create a seamless experience that saves time, reduces costs, and 
                improves the quality of property maintenance services.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-dark-lighter p-8 rounded-lg"
            >
              <h3 className="text-white font-semibold mb-4">Key Objectives</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <p className="text-gray-400">Streamline maintenance request management</p>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <p className="text-gray-400">Enhance communication between stakeholders</p>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <p className="text-gray-400">Improve maintenance task tracking and completion</p>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <p className="text-gray-400">Provide data-driven insights for better decision making</p>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Our Impact</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Transforming property maintenance through innovation and technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-dark p-6 rounded-lg text-center"
              >
                <item.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-white mb-2">{item.stat}</h3>
                <h4 className="text-lg font-semibold text-primary mb-2">{item.label}</h4>
                <p className="text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 px-4 bg-dark">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <h2 className="text-3xl font-bold text-white mb-6">Powered by Innovation</h2>
              <p className="text-gray-400 mb-6">
                Our platform leverages cutting-edge technology to provide a seamless property 
                maintenance experience. From AI-powered scheduling to real-time analytics, 
                we're constantly innovating to make property management easier and more efficient.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <p className="text-gray-400">Cloud-based infrastructure for reliable access</p>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <p className="text-gray-400">AI-powered maintenance scheduling and optimization</p>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <p className="text-gray-400">Real-time analytics and reporting dashboard</p>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <p className="text-gray-400">Mobile-first design for on-the-go management</p>
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <div className="bg-dark-lighter p-8 rounded-lg">
                <img
                  src="/platform.png" 
                  alt="PropertyCare Platform"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;