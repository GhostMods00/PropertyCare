import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/home/Navbar';
import Footer from '../components/home/Footer';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      price: "29",
      description: "Perfect for small property managers",
      features: [
        "Up to 5 properties",
        "Basic maintenance tracking",
        "Email support",
        "Mobile app access",
        "Basic reporting",
      ],
      notIncluded: [
        "Advanced analytics",
        "Priority support",
        "Tenant portal",
        "Custom branding"
      ]
    },
    {
      name: "Professional",
      price: "79",
      description: "Ideal for growing property portfolios",
      features: [
        "Up to 20 properties",
        "Advanced maintenance tracking",
        "Priority email support",
        "Mobile app access",
        "Advanced reporting",
        "Tenant portal",
        "Basic analytics",
        "Custom branding"
      ],
      notIncluded: [
        "24/7 phone support",
        "White-label solution"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "199",
      description: "For large-scale property management",
      features: [
        "Unlimited properties",
        "Full maintenance management",
        "24/7 phone support",
        "Mobile app access",
        "Custom reporting",
        "Tenant portal",
        "Advanced analytics",
        "Custom branding",
        "White-label solution",
        "API access"
      ],
      notIncluded: []
    }
  ];

  return (
    <div className="min-h-screen bg-dark-dark">
      <Navbar />

      {/* Header Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Simple, Transparent{" "}
              <span className="bg-gradient-to-r from-primary to-primary-light text-transparent bg-clip-text">
                Pricing
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
              Choose the plan that best fits your property management needs.
              All plans include our core features to streamline your maintenance operations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-dark rounded-lg border ${
                  plan.popular 
                    ? 'border-primary shadow-lg shadow-primary/20' 
                    : 'border-dark-lighter'
                } p-8`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-dark px-3 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 mb-4">{plan.description}</p>
                  <div className="flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">${plan.price}</span>
                    <span className="text-gray-400 ml-2">/month</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center text-gray-400">
                      <CheckIcon className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  {plan.notIncluded.map((feature) => (
                    <div key={feature} className="flex items-center text-gray-500">
                      <XMarkIcon className="h-5 w-5 text-gray-600 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/register"
                  className={`block text-center py-3 px-6 rounded-lg font-medium transition-colors ${
                    plan.popular
                      ? 'bg-primary text-dark hover:bg-primary-light'
                      : 'bg-dark-lighter text-white hover:bg-dark-light'
                  }`}
                >
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-dark">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400">
              Have questions? We have answers.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "Can I change plans anytime?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
              },
              {
                question: "Is there a free trial?",
                answer: "Yes, we offer a 14-day free trial on all our plans. No credit card required."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans."
              },
              {
                question: "Can I cancel my subscription?",
                answer: "Yes, you can cancel your subscription at any time. No long-term contracts required."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-dark-lighter p-6 rounded-lg"
              >
                <h3 className="text-xl font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-dark-lighter to-dark p-12 rounded-lg text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Still have questions?
            </h2>
            <p className="text-gray-400 mb-8">
              Contact our team for a personalized demo and consultation.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-3 rounded-lg border border-primary text-primary hover:bg-primary/10 font-semibold transition-colors"
            >
              Contact Sales
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;