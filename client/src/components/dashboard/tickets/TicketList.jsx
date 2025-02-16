import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlusIcon } from '@heroicons/react/24/outline';
import TicketCard from './TicketCard';
import CreateTicketModal from './CreateTicketModal';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tickets', {
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
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    if (filter === 'all') return true;
    return ticket.status === filter;
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-white">Maintenance Tickets</h2>
          <p className="text-gray-400">Manage and track maintenance requests</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center px-4 py-2 bg-primary text-dark rounded-lg hover:bg-primary-light transition-colors"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Create Ticket
        </motion.button>
      </div>

      {/* Filters */}
      <div className="flex space-x-4 mb-6">
        {['all', 'new', 'inProgress', 'completed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === status
                ? 'bg-primary text-dark'
                : 'bg-dark-lighter text-gray-400 hover:text-white'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
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
          {filteredTickets.map((ticket) => (
            <TicketCard
              key={ticket._id}
              ticket={ticket}
              onUpdate={fetchTickets}
            />
          ))}
        </div>
      )}

      <CreateTicketModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={fetchTickets}
      />
    </div>
  );
};

export default TicketList;