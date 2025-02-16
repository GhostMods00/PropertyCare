import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

const CreateTicketModal = ({ isOpen, onClose, onSuccess }) => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    property: '',
    priority: 'medium',
    status: 'new'
  });

  // Fetch properties for the dropdown
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/properties', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        if (data.success) {
          setProperties(data.data);
          if (data.data.length > 0) {
            setFormData(prev => ({ ...prev, property: data.data[0]._id }));
          }
        }
      } catch (err) {
        setError('Failed to fetch properties');
      }
    };

    if (isOpen) {
      fetchProperties();
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (data.success) {
        onSuccess();
        onClose();
        // Reset form
        setFormData({
          title: '',
          description: '',
          property: '',
          priority: 'medium',
          status: 'new'
        });
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to create ticket');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 transition-opacity bg-black/50"
              onClick={onClose}
            />

            {/* Modal panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-dark border border-dark-lighter rounded-lg shadow-xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-white">
                  Create New Ticket
                </h3>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-500">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-dark-lighter border border-dark-lighter rounded-lg text-white focus:outline-none focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Property
                  </label>
                  <select
                    name="property"
                    value={formData.property}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-dark-lighter border border-dark-lighter rounded-lg text-white focus:outline-none focus:border-primary"
                    required
                  >
                    {properties.map((property) => (
                      <option key={property._id} value={property._id}>
                        {property.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Priority
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-dark-lighter border border-dark-lighter rounded-lg text-white focus:outline-none focus:border-primary"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-3 py-2 bg-dark-lighter border border-dark-lighter rounded-lg text-white focus:outline-none focus:border-primary"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 bg-primary text-dark rounded-lg hover:bg-primary-light transition-colors disabled:opacity-50"
                  >
                    {isLoading ? 'Creating...' : 'Create Ticket'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CreateTicketModal;