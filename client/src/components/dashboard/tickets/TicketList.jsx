import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../../context/AuthContext';
import { 
  PlusIcon, 
  FunnelIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';
import TicketCard from './TicketCard';
import CreateTicketModal from './CreateTicketModal';

const TicketList = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filters
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyFilter, setPropertyFilter] = useState('all');
  const [properties, setProperties] = useState([]);
  const [isFiltersVisible, setIsFiltersVisible] = useState(true);

  useEffect(() => {
    Promise.all([fetchTickets(), fetchProperties()]);
  }, [user.role]);

  const fetchTickets = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('https://propertycare.onrender.com/api/tickets', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setTickets(data.data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to fetch tickets');
      console.error('Error fetching tickets:', err);
    } finally {
      setIsLoading(false);
    }
  };

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
      }
    } catch (err) {
      console.error('Failed to fetch properties:', err);
    }
  };

  const handleCreateSuccess = (newTicket) => {
    setTickets(prevTickets => [newTicket, ...prevTickets]);
    setIsCreateModalOpen(false);
  };

  const handleTicketUpdate = async (ticketId) => {
    await fetchTickets();
  };

  const getStatusCount = (status) => {
    return tickets.filter(ticket => ticket.status === status).length;
  };

  // Memoized filtered tickets
  const filteredTickets = useMemo(() => {
    return tickets.filter(ticket => {
      // Staff should only see their assigned tickets
      if (user.role === 'staff' && ticket.assignedTo?._id !== user._id) {
        return false;
      }

      // Status filter
      if (filter !== 'all' && ticket.status !== filter) return false;
      
      // Property filter
      if (propertyFilter !== 'all' && ticket.property._id !== propertyFilter) return false;
      
      // Search query
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        return (
          ticket.title.toLowerCase().includes(searchLower) ||
          ticket.description.toLowerCase().includes(searchLower) ||
          ticket.property.name.toLowerCase().includes(searchLower) ||
          (ticket.assignedTo?.name || '').toLowerCase().includes(searchLower)
        );
      }
      
      return true;
    });
  }, [tickets, filter, propertyFilter, searchQuery, user]);

  const statusOptions = [
    { value: 'all', label: 'All Tickets' },
    { value: 'new', label: 'New' },
    { value: 'inProgress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' }
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-white">Maintenance Tickets</h2>
          <p className="text-gray-400">
            {user.role === 'manager' 
              ? 'Manage and track maintenance requests' 
              : 'View and manage your assigned tickets'}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsFiltersVisible(!isFiltersVisible)}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <AdjustmentsHorizontalIcon className="h-6 w-6" />
          </button>
          {user.role === 'manager' && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center px-4 py-2 bg-primary text-dark rounded-lg hover:bg-primary-light transition-colors"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Create Ticket
            </motion.button>
          )}
        </div>
      </div>

      {/* Filters and Search */}
      {isFiltersVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark rounded-lg p-4 mb-6"
        >
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tickets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-dark-lighter border border-dark-lighter rounded-lg text-white focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
              {statusOptions.map((status) => (
                <button
                  key={status.value}
                  onClick={() => setFilter(status.value)}
                  className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                    filter === status.value
                      ? 'bg-primary text-dark'
                      : 'bg-dark-lighter text-gray-400 hover:text-white'
                  }`}
                >
                  {status.label}
                  {status.value !== 'all' && (
                    <span className="ml-2 text-xs">
                      ({getStatusCount(status.value)})
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Property Filter */}
            {properties.length > 0 && (
              <select
                value={propertyFilter}
                onChange={(e) => setPropertyFilter(e.target.value)}
                className="px-4 py-2 bg-dark-lighter border border-dark-lighter rounded-lg text-white focus:outline-none focus:border-primary min-w-[200px]"
              >
                <option value="all">All Properties</option>
                {properties.map((property) => (
                  <option key={property._id} value={property._id}>
                    {property.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </motion.div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-500 rounded-lg p-4 mb-6">
          {error}
        </div>
      )}

      {/* Tickets Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : filteredTickets.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No tickets found</p>
          <p className="text-gray-500 mt-2">
            {searchQuery || filter !== 'all' || propertyFilter !== 'all'
              ? 'Try adjusting your filters'
              : user.role === 'manager'
              ? 'Create your first ticket to get started'
              : 'No tickets have been assigned to you yet'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTickets.map((ticket) => (
            <TicketCard
              key={ticket._id}
              ticket={ticket}
              onUpdate={() => handleTicketUpdate(ticket._id)}
            />
          ))}
        </div>
      )}

      {/* Create Ticket Modal */}
      <CreateTicketModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleCreateSuccess}
      />
    </div>
  );
};

export default TicketList;