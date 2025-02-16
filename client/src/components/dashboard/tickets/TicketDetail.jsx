import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../../context/AuthContext';
import { 
  ArrowLeftIcon,
  ChatBubbleLeftIcon,
  ClockIcon,
  BuildingOfficeIcon,
  UserCircleIcon,
  PaperClipIcon
} from '@heroicons/react/24/outline';

const TicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [ticket, setTicket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchTicket();
  }, [id]);

  const fetchTicket = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/tickets/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setTicket(data.data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to fetch ticket details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    setIsUpdating(true);
    try {
      const response = await fetch(`http://localhost:5000/api/tickets/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await response.json();
      if (data.success) {
        setTicket(data.data);
      }
    } catch (err) {
      setError('Failed to update ticket status');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      const response = await fetch(`http://localhost:5000/api/tickets/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ text: comment })
      });
      const data = await response.json();
      if (data.success) {
        setTicket(data.data);
        setComment('');
      }
    } catch (err) {
      setError('Failed to add comment');
    }
  };

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

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-500/10 border border-red-500/50 text-red-500 rounded-lg p-4">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate('/dashboard/tickets')}
          className="flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Tickets
        </button>
        <div className={`px-3 py-1 rounded-full text-sm ${getStatusColor(ticket.status)}`}>
          {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
        </div>
      </div>

      {/* Ticket Details */}
      <div className="bg-dark rounded-lg border border-dark-lighter p-6 mb-6">
        <h1 className="text-2xl font-bold text-white mb-4">{ticket.title}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <div className="flex items-center text-gray-400 mb-4">
              <BuildingOfficeIcon className="h-5 w-5 mr-2" />
              <span>{ticket.property?.name}</span>
            </div>
            <div className="flex items-center text-gray-400">
              <UserCircleIcon className="h-5 w-5 mr-2" />
              <span>Assigned to: {ticket.assignedTo?.name || 'Unassigned'}</span>
            </div>
          </div>
          <div>
            <div className="flex items-center text-gray-400 mb-4">
              <ClockIcon className="h-5 w-5 mr-2" />
              <span>Created: {formatDate(ticket.createdAt)}</span>
            </div>
            <div className="flex items-center text-gray-400">
              <PaperClipIcon className="h-5 w-5 mr-2" />
              <span>Priority: {ticket.priority}</span>
            </div>
          </div>
        </div>

        <div className="border-t border-dark-lighter pt-4">
          <h3 className="text-white font-semibold mb-2">Description</h3>
          <p className="text-gray-400">{ticket.description}</p>
        </div>
      </div>

      {/* Status Actions */}
      {user.role === 'manager' && (
        <div className="bg-dark rounded-lg border border-dark-lighter p-6 mb-6">
          <h3 className="text-white font-semibold mb-4">Update Status</h3>
          <div className="flex space-x-4">
            {['new', 'inProgress', 'completed'].map((status) => (
              <button
                key={status}
                onClick={() => handleStatusChange(status)}
                disabled={ticket.status === status || isUpdating}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  ticket.status === status
                    ? 'bg-primary text-dark'
                    : 'bg-dark-lighter text-gray-400 hover:text-white'
                } disabled:opacity-50`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Comments Section */}
      <div className="bg-dark rounded-lg border border-dark-lighter p-6">
        <h3 className="text-white font-semibold mb-4">Comments</h3>
        
        {/* Comment Form */}
        <form onSubmit={handleAddComment} className="mb-6">
          <div className="flex space-x-4">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 px-4 py-2 bg-dark-lighter border border-dark-lighter rounded-lg text-white focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              disabled={!comment.trim()}
              className="px-4 py-2 bg-primary text-dark rounded-lg hover:bg-primary-light transition-colors disabled:opacity-50"
            >
              Add Comment
            </button>
          </div>
        </form>

        {/* Comments List */}
        <div className="space-y-4">
          {ticket.comments?.map((comment, index) => (
            <motion.div
              key={comment._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-dark-lighter rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                    <span className="text-primary font-semibold">
                      {comment.createdBy?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-medium">{comment.createdBy?.name}</p>
                    <p className="text-gray-400 text-sm">{formatDate(comment.createdAt)}</p>
                  </div>
                </div>
              </div>
              <p className="text-gray-300">{comment.text}</p>
            </motion.div>
          ))}

          {ticket.comments?.length === 0 && (
            <p className="text-center text-gray-400">No comments yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;