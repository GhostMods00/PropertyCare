import { motion } from 'framer-motion';
import { PencilIcon, TrashIcon, MapPinIcon } from '@heroicons/react/24/outline';

const PropertyCard = ({ property, onUpdate, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-dark rounded-lg border border-dark-lighter p-4 hover:border-primary/50 transition-colors"
    >
      <div className="relative">
        <img
          src={property.imageUrl || '/property-placeholder.jpg'}
          alt={property.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <div className="absolute top-2 right-2 flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onUpdate(property)}
            className="p-2 bg-dark/80 rounded-full hover:bg-primary/80 transition-colors"
          >
            <PencilIcon className="h-4 w-4 text-white" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(property._id)}
            className="p-2 bg-dark/80 rounded-full hover:bg-red-500/80 transition-colors"
          >
            <TrashIcon className="h-4 w-4 text-white" />
          </motion.button>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-white mb-2">{property.name}</h3>
      
      <div className="flex items-center text-gray-400 mb-2">
        <MapPinIcon className="h-4 w-4 mr-1" />
        <span className="text-sm">{property.address.street}, {property.address.city}</span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="bg-dark-lighter rounded-lg p-2">
          <span className="text-gray-400">Type</span>
          <p className="text-white capitalize">{property.type}</p>
        </div>
        <div className="bg-dark-lighter rounded-lg p-2">
          <span className="text-gray-400">Size</span>
          <p className="text-white">{property.size} sq ft</p>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;