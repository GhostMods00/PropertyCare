import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlusIcon } from '@heroicons/react/24/outline';
import PropertyCard from './PropertyCard';
import AddPropertyModal from './AddPropertyModal';
import EditPropertyModal from './EditPropertyModal';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch('https://propertycare.onrender.com/api/properties', {
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

  const handleEditSuccess = (updatedProperty) => {
    setProperties(properties.map(property => 
      property._id === updatedProperty._id ? updatedProperty : property
    ));
    setIsEditModalOpen(false);
    setEditingProperty(null);
  };

  const handleEdit = (property) => {
    setEditingProperty(property);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (propertyId) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        const response = await fetch(`https://propertycare.onrender.com/api/properties/${propertyId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        const data = await response.json();
        if (data.success) {
          setProperties(properties.filter(property => property._id !== propertyId));
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError('Failed to delete property');
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Properties</h2>
          <p className="text-gray-400">Manage your property portfolio</p>
        </div>
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
      ) : properties.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No properties found</p>
          <p className="text-gray-500 mt-2">Add your first property to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard
              key={property._id}
              property={property}
              onUpdate={() => handleEdit(property)}
              onDelete={() => handleDelete(property._id)}
            />
          ))}
        </div>
      )}

      {/* Add Property Modal */}
      <AddPropertyModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={handleAddSuccess}
      />

      {/* Edit Property Modal */}
      <EditPropertyModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingProperty(null);
        }}
        onSuccess={handleEditSuccess}
        property={editingProperty}
      />
    </div>
  );
};

export default PropertyList;