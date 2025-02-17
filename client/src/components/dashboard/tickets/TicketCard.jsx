import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { 
  ClockIcon, 
  WrenchScrewdriverIcon,
  BuildingOfficeIcon,
  ChatBubbleLeftIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';

const TicketCard = ({ ticket, onUpdate }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

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

  const getTimeAgo = (date) => {
    const now = new Date();
    const createdAt = new Date(date);
    const diffInHours = Math.floor((now - createdAt) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - createdAt) / (1000 * 60));
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} days ago`;
    }
  };

  const getPriorityIcon = (priority) => {
    if (priority === 'high') {
      return <ExclamationCircleIcon className="h-4 w-4 text-red-500 mr-1" />;
    }
    return null;
  };

  const getStatusIcon = (status) => {
    if (status === 'completed') {
      return <CheckCircleIcon className="h-4 w-4 text-green-500 mr-1" />;
    }
    return null;
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
          <div className="flex items-center space-x-2">
            {getPriorityIcon(ticket.priority)}
            <h3 className="text-lg font-semibold text-white">{ticket.title}</h3>
          </div>
          <div className="flex items-center mt-1 space-x-2">
            <p className="text-gray-400 text-sm">#{ticket._id.slice(-6)}</p>
            <span className="text-gray-500">•</span>
            <p className="text-gray-400 text-sm">{getTimeAgo(ticket.createdAt)}</p>
          </div>
        </div>
        <div className={`flex items-center px-3 py-1 rounded-full text-xs ${getStatusColor(ticket.status)}`}>
          {getStatusIcon(ticket.status)}
          <span>{ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}</span>
        </div>
      </div>

      {/* Image Section */}
      {ticket.imageUrl && (
        <div className="relative w-full h-48 mb-4 group">
          <img 
            src={ticket.imageUrl}
            alt={ticket.title}
            className="w-full h-full object-cover rounded-lg transition-transform group-hover:scale-[1.02]"
            onError={(e) => {
              console.error('Image failed to load:', ticket.imageUrl);
              e.target.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
        </div>
      )}

      {/* Property Info */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center text-gray-400">
          <BuildingOfficeIcon className="h-4 w-4 mr-2" />
          <span className="text-sm">{ticket.property?.name || 'Property Name'}</span>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(ticket.priority)}`}>
          {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)} Priority
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
        {ticket.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-dark-lighter">
        <div className="flex items-center text-gray-400">
          <div className="flex items-center">
            <UserCircleIcon className="h-4 w-4 mr-1" />
            <span className="text-sm">{ticket.assignedTo?.name || 'Unassigned'}</span>
          </div>
        </div>
        {ticket.comments?.length > 0 && (
          <div className="flex items-center text-gray-400">
            <ChatBubbleLeftIcon className="h-4 w-4 mr-1" />
            <span className="text-sm">{ticket.comments.length} comments</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TicketCard;