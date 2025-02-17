import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../../context/AuthContext';

const CreateTicketModal = ({ isOpen, onClose, onSuccess }) => {
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);
  const [maintenanceStaff, setMaintenanceStaff] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    property: '',
    priority: 'medium',
    status: 'new',
    assignedTo: ''
  });

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
    return () => {
      // Cleanup on modal close
      resetForm();
    };
  }, [isOpen]);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [propertiesResponse, staffResponse] = await Promise.all([
        // Fetch properties
        fetch('http://localhost:5000/api/properties', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }),
        // Fetch maintenance staff if user is a manager
        user.role === 'manager' ? fetch('http://localhost:5000/api/users/maintenance-staff', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }) : Promise.resolve(null)
      ]);

      const propertiesData = await propertiesResponse.json();
      if (propertiesData.success) {
        setProperties(propertiesData.data);
        if (propertiesData.data.length > 0) {
          setFormData(prev => ({ ...prev, property: propertiesData.data[0]._id }));
        }
      }

      if (staffResponse) {
        const staffData = await staffResponse.json();
        if (staffData.success) {
          setMaintenanceStaff(staffData.data);
        }
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch required data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        setError('Image size should be less than 2MB');
        return;
      }
      setSelectedImage(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear any previous errors when user makes changes
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);
    setError(null);

    // Validate form data
    if (!formData.property) {
      setError('Please select a property');
      setIsLoading(false);
      return;
    }

    if (user.role === 'manager' && !formData.assignedTo) {
      setError('Please assign the ticket to a staff member');
      setIsLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      
      // Append ticket data
      Object.keys(formData).forEach(key => {
        if (formData[key]) { // Only append if value exists
          formDataToSend.append(key, formData[key]);
        }
      });

      // Append image if exists
      if (selectedImage) {
        formDataToSend.append('image', selectedImage);
      }

      const response = await fetch('http://localhost:5000/api/tickets', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formDataToSend
      });

      const data = await response.json();
      
      if (data.success) {
        onSuccess(data.data);
        resetForm();
        onClose();
      } else {
        throw new Error(data.error || 'Failed to create ticket');
      }
    } catch (err) {
      console.error('Error creating ticket:', err);
      setError(err.message || 'Failed to create ticket');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      property: '',
      priority: 'medium',
      status: 'new',
      assignedTo: ''
    });
    setSelectedImage(null);
    setImagePreview(null);
    setError(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 transition-opacity bg-black/50"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  onClose();
                }
              }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-dark border border-dark-lighter rounded-lg shadow-xl relative z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-white">
                  Create New Ticket
                </h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
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
                {/* Image Upload */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-400">
                    Add Image (Optional)
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer border-dark-lighter hover:border-primary/50">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="h-32 object-cover rounded-lg"
                          />
                        ) : (
                          <>
                            <PhotoIcon className="w-10 h-10 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-400">
                              Click to upload image
                            </p>
                          </>
                        )}
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </label>
                  </div>
                </div>

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
                    <option value="">Select Property</option>
                    {properties.map((property) => (
                      <option key={property._id} value={property._id}>
                        {property.name}
                      </option>
                    ))}
                  </select>
                </div>

                {user.role === 'manager' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Assign To
                    </label>
                    <select
                      name="assignedTo"
                      value={formData.assignedTo}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-dark-lighter border border-dark-lighter rounded-lg text-white focus:outline-none focus:border-primary"
                      required
                    >
                      <option value="">Select Staff Member</option>
                      {maintenanceStaff.map((staff) => (
                        <option key={staff._id} value={staff._id}>
                          {staff.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

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
                    className="w-full px-3 py-2 bg-dark-lighter border border-dark-lighter rounded-lg text-white focus:outline-none focus:border-primary resize-none"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onClose();
                    }}
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