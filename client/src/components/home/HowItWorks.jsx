import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const HowItWorks = () => {
  const steps = [
    {
      title: "Sign Up",
      description: "Create your account and set up your property portfolio in minutes.",
      icon: "🏠"
    },
    {
      title: "Add Properties",
      description: "Add your properties with detailed information and maintenance history.",
      icon: "📝"
    },
    {
      title: "Manage Maintenance",
      description: "Track and manage maintenance requests efficiently.",
      icon: "🔧"
    },
    {
      title: "Monitor Progress",
      description: "Get real-time updates and analytics on your property maintenance.",
      icon: "📊"
    }
  ];

  return (
    <section className="py-20 bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent mb-4">
            How It Works
          </h2>
          <p className="text-gray-400 text-lg">
            Get started with PropertyCare in four simple steps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-dark-lighter rounded-lg p-6 h-full border border-dark-lighter hover:border-primary/50 transition-colors">
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-400">
                  {step.description}
                </p>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-full transform -translate-y-1/2 translate-x-4">
                    <motion.div
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-primary text-2xl"
                    >
                      →
                    </motion.div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center space-x-2 bg-dark-lighter rounded-lg px-6 py-3 text-gray-300">
            <CheckCircleIcon className="h-5 w-5 text-primary" />
            <span>No credit card required to get started</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;