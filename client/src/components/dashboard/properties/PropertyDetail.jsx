import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeftIcon, 
  MapPinIcon, 
  BuildingOfficeIcon,
  WrenchScrewdriverIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`https://propertycare.onrender.com/api/properties/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        if (data.success) {
          setProperty(data.data);
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError('Failed to fetch property details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'maintenance', label: 'Maintenance' },
    { id: 'tenants', label: 'Tenants' },
    { id: 'finances', label: 'Finances' }
  ];

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
    <div className="min-h-screen bg-dark-dark p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate('/dashboard/properties')}
          className="flex items-center text-gray-400 hover:text-primary transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Properties
        </button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 bg-primary text-dark rounded-lg hover:bg-primary-light transition-colors"
        >
          Edit Property
        </motion.button>
      </div>

      {/* Property Header */}
      <div className="bg-dark rounded-lg border border-dark-lighter p-6 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">{property.name}</h1>
            <div className="flex items-center text-gray-400">
              <MapPinIcon className="h-5 w-5 mr-2" />
              <span>
                {property.address.street}, {property.address.city}, {property.address.state} {property.address.zipCode}
              </span>
            </div>
          </div>
          <div className="bg-dark-lighter px-4 py-2 rounded-lg">
            <span className="text-sm text-gray-400">Status</span>
            <p className="text-primary font-semibold">Active</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[
          { label: 'Property Type', value: property.type, icon: BuildingOfficeIcon },
          { label: 'Total Area', value: `${property.size} sq ft`, icon: ChartBarIcon },
          { label: 'Active Tenants', value: '3', icon: UserGroupIcon },
          { label: 'Open Tickets', value: '2', icon: WrenchScrewdriverIcon }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-dark rounded-lg border border-dark-lighter p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className="text-white font-semibold mt-1">{stat.value}</p>
              </div>
              <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-dark rounded-lg border border-dark-lighter">
        <div className="border-b border-dark-lighter">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 relative ${
                  activeTab === tab.id
                    ? 'text-primary'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Property Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-gray-400">Year Built</p>
                    <p className="text-white">2018</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-400">Last Renovation</p>
                    <p className="text-white">2022</p>
                  </div>
                  {/* Add more property details as needed */}
                </div>
              </div>
              {/* Amenities Section */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['Parking', 'Elevator', 'Security System', 'HVAC', 'Fire Alarm', 'Sprinkler System'].map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <div className="h-2 w-2 bg-primary rounded-full" />
                      <span className="text-gray-400">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documents Section */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['Property Deed', 'Insurance', 'Inspection Report'].map((doc) => (
                    <div key={doc} className="flex items-center justify-between p-3 bg-dark-lighter rounded-lg">
                      <span className="text-gray-400">{doc}</span>
                      <button className="text-primary hover:text-primary-light">
                        View
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'maintenance' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">Maintenance History</h3>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 bg-primary text-dark rounded-lg hover:bg-primary-light"
                >
                  Create Ticket
                </motion.button>
              </div>

              {/* Maintenance Tickets */}
              <div className="space-y-4">
                {[
                  {
                    id: 1,
                    title: 'HVAC Maintenance',
                    status: 'In Progress',
                    priority: 'High',
                    date: '2024-02-15',
                    description: 'Regular maintenance check of HVAC system'
                  },
                  {
                    id: 2,
                    title: 'Plumbing Issue',
                    status: 'Completed',
                    priority: 'Medium',
                    date: '2024-02-10',
                    description: 'Fix leaking pipe in basement'
                  }
                ].map((ticket) => (
                  <div key={ticket.id} className="bg-dark-lighter p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-white font-medium">{ticket.title}</h4>
                        <p className="text-gray-400 text-sm mt-1">{ticket.description}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm ${
                        ticket.status === 'Completed' 
                          ? 'bg-green-500/20 text-green-500' 
                          : 'bg-yellow-500/20 text-yellow-500'
                      }`}>
                        {ticket.status}
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-gray-400 text-sm">{ticket.date}</span>
                      <button className="text-primary hover:text-primary-light text-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'tenants' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">Current Tenants</h3>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 bg-primary text-dark rounded-lg hover:bg-primary-light"
                >
                  Add Tenant
                </motion.button>
              </div>

              {/* Tenants List */}
              <div className="space-y-4">
                {[
                  {
                    id: 1,
                    name: 'John Doe',
                    unit: '101',
                    leaseEnd: '2024-12-31',
                    contact: 'john@example.com'
                  },
                  {
                    id: 2,
                    name: 'Jane Smith',
                    unit: '102',
                    leaseEnd: '2024-10-15',
                    contact: 'jane@example.com'
                  }
                ].map((tenant) => (
                  <div key={tenant.id} className="bg-dark-lighter p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-white font-medium">{tenant.name}</h4>
                        <p className="text-gray-400 text-sm mt-1">Unit {tenant.unit}</p>
                      </div>
                      <button className="text-primary hover:text-primary-light">
                        View Profile
                      </button>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Lease Ends</span>
                        <p className="text-white">{tenant.leaseEnd}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Contact</span>
                        <p className="text-white">{tenant.contact}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'finances' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-dark-lighter p-4 rounded-lg">
                  <h4 className="text-gray-400 text-sm">Monthly Revenue</h4>
                  <p className="text-2xl font-semibold text-white mt-2">$12,500</p>
                  <span className="text-green-500 text-sm">+5.2% from last month</span>
                </div>
                <div className="bg-dark-lighter p-4 rounded-lg">
                  <h4 className="text-gray-400 text-sm">Maintenance Costs</h4>
                  <p className="text-2xl font-semibold text-white mt-2">$2,300</p>
                  <span className="text-red-500 text-sm">+12% from last month</span>
                </div>
                <div className="bg-dark-lighter p-4 rounded-lg">
                  <h4 className="text-gray-400 text-sm">Net Income</h4>
                  <p className="text-2xl font-semibold text-white mt-2">$10,200</p>
                  <span className="text-green-500 text-sm">+3.8% from last month</span>
                </div>
              </div>

              {/* Recent Transactions */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Recent Transactions</h3>
                <div className="space-y-4">
                  {[
                    { id: 1, type: 'Rent Payment', amount: 2500, date: '2024-02-15', unit: '101' },
                    { id: 2, type: 'Maintenance', amount: -450, date: '2024-02-12', unit: '102' },
                    { id: 3, type: 'Rent Payment', amount: 2300, date: '2024-02-10', unit: '103' }
                  ].map((transaction) => (
                    <div key={transaction.id} className="bg-dark-lighter p-4 rounded-lg flex justify-between items-center">
                      <div>
                        <h4 className="text-white font-medium">{transaction.type}</h4>
                        <p className="text-gray-400 text-sm">Unit {transaction.unit}</p>
                      </div>
                      <div>
                        <p className={`text-right font-medium ${
                          transaction.amount > 0 ? 'text-green-500' : 'text-red-500'
                        }`}>
                          ${Math.abs(transaction.amount)}
                        </p>
                        <p className="text-gray-400 text-sm">{transaction.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;