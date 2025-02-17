import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import PropertyCard from './PropertyCard';
import AddPropertyModal from './AddPropertyModal';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch properties
  useEffect(() => {
    fetchProperties();
  }, []);

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
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to fetch properties');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddSuccess = (newProperty) => {
    setProperties(prevProperties => [...prevProperties, newProperty]);
    setIsAddModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Properties</h2>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center px-4 py-2 bg-primary text-dark rounded-lg hover:bg-primary-light transition-colors"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Property
        </motion.button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-500 rounded-lg p-4 mb-6">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard
              key={property._id}
              property={property}
              onUpdate={() => {/* Handle update */}}
              onDelete={() => {/* Handle delete */}}
            />
          ))}
        </div>
      )}

      <AddPropertyModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={handleAddSuccess}  // Changed from onAdd to onSuccess
      />
    </div>
  );
};

export default PropertyList;