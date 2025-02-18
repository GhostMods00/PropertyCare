import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  BuildingOfficeIcon, 
  CurrencyDollarIcon,
  WrenchScrewdriverIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const Reports = () => {
  const [timeFrame, setTimeFrame] = useState('month');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reportData, setReportData] = useState({
    revenue: [],
    occupancy: [],
    maintenance: [],
    expenses: []
  });

  useEffect(() => {
    fetchReportData();
  }, [timeFrame]);

  const fetchReportData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://propertycare.onrender.com/api/reports?timeFrame=${timeFrame}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setReportData(data.data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to fetch report data');
    } finally {
      setIsLoading(false);
    }
  };

  const COLORS = ['#00DC82', '#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Reports & Analytics</h2>
          <p className="text-gray-400">View detailed insights about your properties</p>
        </div>
        <select
          value={timeFrame}
          onChange={(e) => setTimeFrame(e.target.value)}
          className="px-4 py-2 bg-dark-lighter border border-dark-lighter rounded-lg text-white focus:outline-none focus:border-primary"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Revenue',
            value: '$24,500',
            change: '+12.5%',
            icon: CurrencyDollarIcon
          },
          {
            title: 'Occupancy Rate',
            value: '92%',
            change: '+3.2%',
            icon: BuildingOfficeIcon
          },
          {
            title: 'Maintenance Costs',
            value: '$3,200',
            change: '-5.1%',
            icon: WrenchScrewdriverIcon
          },
          {
            title: 'Average Response Time',
            value: '4.2 hours',
            change: '-12.5%',
            icon: ChartBarIcon
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-dark p-6 rounded-lg border border-dark-lighter"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{stat.title}</p>
                <p className="text-2xl font-semibold text-white mt-1">{stat.value}</p>
                <span className={`text-sm ${
                  stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stat.change} from last period
                </span>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-dark p-6 rounded-lg border border-dark-lighter">
          <h3 className="text-lg font-semibold text-white mb-4">Revenue Trend</h3>
          <div className="h-80">
            <LineChart
              width={500}
              height={300}
              data={reportData.revenue}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                labelStyle={{ color: '#F9FAFB' }}
              />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke="#00DC82" />
            </LineChart>
          </div>
        </div>

        {/* Occupancy Rate */}
        <div className="bg-dark p-6 rounded-lg border border-dark-lighter">
          <h3 className="text-lg font-semibold text-white mb-4">Occupancy Rate</h3>
          <div className="h-80">
            <BarChart
              width={500}
              height={300}
              data={reportData.occupancy}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                labelStyle={{ color: '#F9FAFB' }}
              />
              <Legend />
              <Bar dataKey="rate" fill="#00DC82" />
            </BarChart>
          </div>
        </div>

        {/* Maintenance Distribution */}
        <div className="bg-dark p-6 rounded-lg border border-dark-lighter">
          <h3 className="text-lg font-semibold text-white mb-4">Maintenance Distribution</h3>
          <div className="h-80">
            <PieChart width={400} height={300}>
              <Pie
                data={reportData.maintenance}
                cx={200}
                cy={150}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {reportData.maintenance.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                labelStyle={{ color: '#F9FAFB' }}
              />
              <Legend />
            </PieChart>
          </div>
        </div>

        {/* Expense Breakdown */}
        <div className="bg-dark p-6 rounded-lg border border-dark-lighter">
          <h3 className="text-lg font-semibold text-white mb-4">Expense Breakdown</h3>
          <div className="h-80">
            <BarChart
              width={500}
              height={300}
              data={reportData.expenses}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                labelStyle={{ color: '#F9FAFB' }}
              />
              <Legend />
              <Bar dataKey="amount" fill="#00DC82" />
            </BarChart>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="flex justify-end space-x-4">
        <button
          className="px-4 py-2 bg-dark-lighter text-gray-400 rounded-lg hover:text-white transition-colors"
        >
          Export PDF
        </button>
        <button
          className="px-4 py-2 bg-primary text-dark rounded-lg hover:bg-primary-light transition-colors"
        >
          Export Excel
        </button>
      </div>
    </div>
  );
};

export default Reports;