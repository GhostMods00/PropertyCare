import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ClockIcon, 
  WrenchScrewdriverIcon,
  BuildingOfficeIcon,
  ChatBubbleLeftIcon
} from '@heroicons/react/24/outline';

const TicketCard = ({ ticket }) => {
  const navigate = useNavigate();

  // Add console log for debugging
  console.log('Ticket data:', ticket);

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return 'bg-blue-500/20 text-blue-500';
      case 'inProgress':
        return 'bg-yellow-500/20 text-yellow-500';
      case 'completed':
        return 'bg-green-500/20 text-green-500';
      default:
        return 'bg-gray-500/20 text-gray-500';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 text-red-500';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-500';
      case 'low':
        return 'bg-green-500/20 text-green-500';
      default:
        return 'bg-gray-500/20 text-gray-500';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <motion.div
      onClick={() => navigate(`/dashboard/tickets/${ticket._id}`)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-dark rounded-lg border border-dark-lighter p-4 cursor-pointer hover:border-primary/50 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{ticket.title}</h3>
          <p className="text-gray-400 text-sm mt-1">Ticket #{ticket._id.slice(-6)}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs ${getStatusColor(ticket.status)}`}>
          {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
        </div>
      </div>

      {/* Image Section */}
      {ticket.imageUrl && (
        <div className="relative w-full h-48 mb-4">
          <img 
            src={ticket.imageUrl}
            alt={ticket.title}
            className="w-full h-full object-cover rounded-lg"
            onError={(e) => {
              console.error('Image failed to load:', ticket.imageUrl);
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Property Info */}
      <div className="flex items-center text-gray-400 mb-4">
        <BuildingOfficeIcon className="h-4 w-4 mr-2" />
        <span className="text-sm">{ticket.property?.name || 'Property Name'}</span>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
        {ticket.description}
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center space-x-2">
          <ClockIcon className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-400">
            {formatDate(ticket.createdAt)}
          </span>
        </div>
        <div className="flex items-center justify-end">
          <div className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(ticket.priority)}`}>
            {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)} Priority
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-dark-lighter">
        <div className="flex items-center text-gray-400">
          <WrenchScrewdriverIcon className="h-4 w-4 mr-1" />
          <span className="text-sm">{ticket.assignedTo?.name || 'Unassigned'}</span>
        </div>
        <div className="flex items-center text-gray-400">
          <ChatBubbleLeftIcon className="h-4 w-4 mr-1" />
          <span className="text-sm">{ticket.comments?.length || 0} comments</span>
        </div>
      </div>
    </motion.div>
  );
};

export default TicketCard;