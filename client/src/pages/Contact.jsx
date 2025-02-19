import { motion } from 'framer-motion';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';
import Navbar from '../components/home/Navbar';
import Footer from '../components/home/Footer';

const Contact = () => {
  const contactInfo = [
    {
      icon: PhoneIcon,
      title: "Phone",
      content: "+614123456",
      description: "Monday - Friday, 9AM to 6PM "
    },
    {
      icon: EnvelopeIcon,
      title: "Email",
      content: "support@propertycare.com",
      description: "We'll respond within 24 hours"
    },
    {
      icon: MapPinIcon,
      title: "Office",
      content: "123 Business Street",
      description: "Sydney, NSW 2000"
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
              Get in{" "}
              <span className="bg-gradient-to-r from-primary to-primary-light text-transparent bg-clip-text">
                Touch
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
              Have questions about our property management solution? We're here to help.
              Fill out the form below and we'll get back to you shortly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-dark rounded-lg border border-dark-lighter p-8 text-center"
              >
                <info.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{info.title}</h3>
                <p className="text-primary font-medium mb-2">{info.content}</p>
                <p className="text-gray-400">{info.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-dark rounded-lg border border-dark-lighter p-8"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-white mb-2">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full bg-dark-lighter border border-dark-light rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-white mb-2">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full bg-dark-lighter border border-dark-light rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-white mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-dark-lighter border border-dark-light rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-white mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  className="w-full bg-dark-lighter border border-dark-light rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white mb-2">Message</label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full bg-dark-lighter border border-dark-light rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                  placeholder="Tell us more about your needs..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-dark font-medium py-3 px-6 rounded-lg hover:bg-primary-light transition-colors"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-dark-lighter to-dark p-12 rounded-lg text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Looking for quick answers?
            </h2>
            <p className="text-gray-400 mb-8">
              Check out our comprehensive FAQ section for immediate assistance.
            </p>
            <button
              className="inline-flex items-center px-8 py-3 rounded-lg border border-primary text-primary hover:bg-primary/10 font-semibold transition-colors"
            >
              View FAQ
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;