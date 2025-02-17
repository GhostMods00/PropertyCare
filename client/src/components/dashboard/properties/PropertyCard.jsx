import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  PencilIcon, 
  TrashIcon, 
  MapPinIcon, 
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const PropertyCard = ({ property, onUpdate, onDelete }) => {
  const navigate = useNavigate();

  const handleCardClick = (e) => {
    // Prevent navigation when clicking delete or edit
    if (e.target.closest('button')) {
      return;
    }
    navigate(`/dashboard/properties/${property._id}`);
  };

  const formatAddress = (address) => {
    return `${address.street}, ${address.city}, ${address.state} ${address.zipCode}`;
  };

  return (
    <motion.div
      onClick={handleCardClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-dark rounded-lg border border-dark-lighter p-4 cursor-pointer hover:border-primary/50 transition-all duration-300"
    >
      {/* Image Section */}
      <div className="relative">
        <img
          src={property.imageUrl || '/property-placeholder.jpg'}
          alt={property.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
          onError={(e) => {
            e.target.src = '/property-placeholder.jpg';
          }}
        />
        <div className="absolute top-2 right-2 flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onUpdate();
            }}
            className="p-2 bg-dark/80 rounded-full hover:bg-primary/80 transition-colors"
          >
            <PencilIcon className="h-4 w-4 text-white" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-2 bg-dark/80 rounded-full hover:bg-red-500/80 transition-colors"
          >
            <TrashIcon className="h-4 w-4 text-white" />
          </motion.button>
        </div>
      </div>

      {/* Property Details */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">{property.name}</h3>
          <div className="flex items-center text-gray-400">
            <MapPinIcon className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="text-sm truncate">
              {formatAddress(property.address)}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-dark-lighter rounded-lg p-3">
            <div className="flex items-center text-gray-400 mb-1">
              <BuildingOfficeIcon className="h-4 w-4 mr-1" />
              <span className="text-xs">Type</span>
            </div>
            <p className="text-white capitalize text-sm">{property.type}</p>
          </div>

          <div className="bg-dark-lighter rounded-lg p-3">
            <div className="flex items-center text-gray-400 mb-1">
              <CurrencyDollarIcon className="h-4 w-4 mr-1" />
              <span className="text-xs">Revenue</span>
            </div>
            <p className="text-white text-sm">${property.revenue || '0'}/mo</p>
          </div>

          <div className="bg-dark-lighter rounded-lg p-3">
            <div className="flex items-center text-gray-400 mb-1">
              <UserGroupIcon className="h-4 w-4 mr-1" />
              <span className="text-xs">Units</span>
            </div>
            <p className="text-white text-sm">{property.units || 0} units</p>
          </div>

          <div className="bg-dark-lighter rounded-lg p-3">
            <div className="flex items-center text-gray-400 mb-1">
              <span className="text-xs mr-1">ft²</span>
              <span className="text-xs">Size</span>
            </div>
            <p className="text-white text-sm">{property.size} sq ft</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center">
          <div className="px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-500">
            Active
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/dashboard/properties/${property._id}`);
            }}
            className="text-primary text-sm hover:text-primary-light transition-colors"
          >
            View Details →
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;