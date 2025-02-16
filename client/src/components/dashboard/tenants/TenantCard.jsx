import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  BuildingOfficeIcon,
  PhoneIcon,
  EnvelopeIcon,
  PencilIcon,
  TrashIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

const TenantCard = ({ tenant, onUpdate }) => {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-500';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-500';
      case 'inactive':
        return 'bg-red-500/20 text-red-500';
      default:
        return 'bg-gray-500/20 text-gray-500';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this tenant?')) {
      setIsDeleting(true);
      try {
        const response = await fetch(`http://localhost:5000/api/tenants/${tenant._id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        if (data.success) {
          onUpdate();
        }
      } catch (err) {
        console.error('Failed to delete tenant');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <motion.div
      onClick={() => navigate(`/dashboard/tenants/${tenant._id}`)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-dark rounded-lg border border-dark-lighter p-4 cursor-pointer hover:border-primary/50 transition-all duration-300"
    >
      {/* Header Section */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-semibold">
              {tenant.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h3 className="text-white font-medium">{tenant.name}</h3>
            <p className="text-gray-400 text-sm">Unit {tenant.unit}</p>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs ${getStatusColor(tenant.status)}`}>
          {tenant.status.charAt(0).toUpperCase() + tenant.status.slice(1)}
        </div>
      </div>

      {/* Property Info */}
      <div className="flex items-center text-gray-400 mb-3">
        <BuildingOfficeIcon className="h-4 w-4 mr-2" />
        <span className="text-sm">{tenant.property?.name}</span>
      </div>

      {/* Contact Info */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-gray-400">
          <EnvelopeIcon className="h-4 w-4 mr-2" />
          <span className="text-sm">{tenant.email}</span>
        </div>
        <div className="flex items-center text-gray-400">
          <PhoneIcon className="h-4 w-4 mr-2" />
          <span className="text-sm">{tenant.phone}</span>
        </div>
      </div>

      {/* Lease Info */}
      <div className="border-t border-dark-lighter pt-4">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center text-gray-400">
            <CalendarIcon className="h-4 w-4 mr-2" />
            <span>Lease ends: {formatDate(tenant.leaseEnd)}</span>
          </div>
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/dashboard/tenants/${tenant._id}/edit`);
              }}
              className="p-2 bg-dark-lighter rounded-full hover:bg-primary/20 transition-colors"
            >
              <PencilIcon className="h-4 w-4 text-primary" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-2 bg-dark-lighter rounded-full hover:bg-red-500/20 transition-colors"
            >
              <TrashIcon className="h-4 w-4 text-red-500" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TenantCard;