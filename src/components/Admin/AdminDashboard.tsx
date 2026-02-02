import React, { useState } from 'react';
import { 
  Users, 
  Shield, 
  AlertTriangle, 
  TrendingUp, 
  Gift,
  CheckCircle,
  Clock,
  XCircle,
  Upload,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  BarChart3,
  FileText,
  Settings,
  Bell,
  Activity,
  DollarSign,
  Package,
  MessageSquare
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [pendingVerifications, setPendingVerifications] = useState(12);
  const [activeDisputes, setActiveDisputes] = useState(3);
  const [totalUsers, setTotalUsers] = useState(1247);
  const [totalTransactions, setTotalTransactions] = useState(856);

  const stats = [
    {
      title: 'Total Users',
      value: totalUsers.toLocaleString(),
      change: '+12%',
      icon: Users,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Pending Verifications',
      value: pendingVerifications,
      change: '+5',
      icon: Clock,
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      title: 'Active Disputes',
      value: activeDisputes,
      change: '-2',
      icon: AlertTriangle,
      color: 'bg-red-100 text-red-600'
    },
    {
      title: 'Total Transactions',
      value: totalTransactions.toLocaleString(),
      change: '+8%',
      icon: DollarSign,
      color: 'bg-green-100 text-green-600'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'verification',
      message: 'New trader verification request from Mumbai APMC',
      time: '2 minutes ago',
      icon: Shield,
      color: 'text-blue-600'
    },
    {
      id: 2,
      type: 'dispute',
      message: 'Quality dispute raised for Transaction #TX123456',
      time: '15 minutes ago',
      icon: AlertTriangle,
      color: 'text-red-600'
    },
    {
      id: 3,
      type: 'price',
      message: 'Market price updated for Wheat in Pune APMC',
      time: '1 hour ago',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      id: 4,
      type: 'scheme',
      message: 'New government scheme added: PM Kisan Credit Card',
      time: '2 hours ago',
      icon: Gift,
      color: 'text-purple-600'
    }
  ];

  const quickActions = [
    {
      title: 'Verify Traders',
      description: 'Review pending trader verifications',
      icon: Shield,
      color: 'bg-blue-600',
      count: pendingVerifications,
      action: () => setActiveSection('verification')
    },
    {
      title: 'Resolve Disputes',
      description: 'Handle active transaction disputes',
      icon: AlertTriangle,
      color: 'bg-red-600',
      count: activeDisputes,
      action: () => setActiveSection('disputes')
    },
    {
      title: 'Update Prices',
      description: 'Upload latest market price data',
      icon: TrendingUp,
      color: 'bg-green-600',
      count: 0,
      action: () => setActiveSection('prices')
    },
    {
      title: 'Manage Schemes',
      description: 'Add or update government schemes',
      icon: Gift,
      color: 'bg-purple-600',
      count: 0,
      action: () => setActiveSection('schemes')
    }
  ];

  if (activeSection !== 'overview') {
    return (
      <div className="p-4">
        <button
          onClick={() => setActiveSection('overview')}
          className="mb-4 flex items-center space-x-2 text-blue-600 hover:text-blue-700"
        >
          <span>←</span>
          <span>Back to Dashboard</span>
        </button>
        
        {activeSection === 'verification' && <TraderVerificationPanel />}
        {activeSection === 'disputes' && <DisputeResolutionPanel />}
        {activeSection === 'prices' && <PriceManagementPanel />}
        {activeSection === 'schemes' && <SchemeManagementPanel />}
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-1">Admin Dashboard</h2>
            <p className="text-purple-100 text-sm">Platform Management & Control</p>
            <p className="text-purple-200 text-xs mt-1">Last updated: {new Date().toLocaleString()}</p>
          </div>
          <div className="relative">
            <Bell size={24} />
            {(pendingVerifications + activeDisputes) > 0 && (
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">{pendingVerifications + activeDisputes}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
                  <p className={`text-xs mt-1 ${
                    stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change} this week
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.color}`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={action.action}
                className={`${action.color} text-white p-4 rounded-xl hover:opacity-90 transition-opacity`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <Icon size={24} />
                  </div>
                  <div className="text-left flex-1">
                    <div className="flex items-center space-x-2">
                      <p className="font-semibold text-lg">{action.title}</p>
                      {action.count > 0 && (
                        <span className="bg-white bg-opacity-30 px-2 py-1 rounded-full text-sm font-bold">
                          {action.count}
                        </span>
                      )}
                    </div>
                    <p className="text-sm opacity-90">{action.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
          <button className="text-purple-600 text-sm font-medium hover:text-purple-700">
            View All
          </button>
        </div>
        
        <div className="space-y-4">
          {recentActivities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
                <div className={`w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center`}>
                  <Icon size={16} className={activity.color} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* System Health */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">System Health</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Database Status</span>
            </div>
            <span className="text-sm font-medium text-green-600">Healthy</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">API Response Time</span>
            </div>
            <span className="text-sm font-medium text-green-600">125ms</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Storage Usage</span>
            </div>
            <span className="text-sm font-medium text-yellow-600">78%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Trader Verification Panel Component
const TraderVerificationPanel: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('pending');

  const pendingVerifications = [
    {
      id: 1,
      name: 'Mumbai Agro Traders',
      email: 'contact@mumbaiagro.com',
      phone: '+91 98765 43210',
      location: 'Mumbai APMC',
      documents: ['GST Certificate', 'APMC License', 'Bank Statement'],
      submittedAt: '2024-01-15T10:30:00Z',
      status: 'pending'
    },
    {
      id: 2,
      name: 'Pune Grain Merchants',
      email: 'info@punegrain.com',
      phone: '+91 98765 43211',
      location: 'Pune APMC',
      documents: ['GST Certificate', 'Trade License'],
      submittedAt: '2024-01-14T15:45:00Z',
      status: 'pending'
    }
  ];

  const handleApprove = (id: number) => {
    console.log('Approving trader:', id);
    // Implementation for approval
  };

  const handleReject = (id: number) => {
    console.log('Rejecting trader:', id);
    // Implementation for rejection
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Trader Verification</h2>
        
        {/* Search and Filter */}
        <div className="flex space-x-4 mb-6">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search traders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Verification List */}
        <div className="space-y-4">
          {pendingVerifications.map((trader) => (
            <div key={trader.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{trader.name}</h3>
                  <p className="text-sm text-gray-600">{trader.email}</p>
                  <p className="text-sm text-gray-600">{trader.phone}</p>
                  <p className="text-sm text-gray-600">{trader.location}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                    Pending Review
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Submitted Documents:</h4>
                <div className="flex flex-wrap gap-2">
                  {trader.documents.map((doc, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      {doc}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  Submitted: {new Date(trader.submittedAt).toLocaleDateString()}
                </p>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleReject(trader.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleApprove(trader.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    Approve
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Dispute Resolution Panel Component
const DisputeResolutionPanel: React.FC = () => {
  const activeDisputes = [
    {
      id: 'D001',
      transactionId: 'TX123456',
      type: 'Quality Issue',
      farmer: 'Ram Kumar',
      trader: 'Mumbai Agro Traders',
      amount: 115000,
      description: 'Wheat quality not as described in listing',
      status: 'open',
      createdAt: '2024-01-15T10:30:00Z',
      priority: 'high'
    },
    {
      id: 'D002',
      transactionId: 'TX123457',
      type: 'Payment Delay',
      farmer: 'Shyam Patel',
      trader: 'Pune Grain Merchants',
      amount: 85000,
      description: 'Payment not received after delivery confirmation',
      status: 'investigating',
      createdAt: '2024-01-14T15:45:00Z',
      priority: 'medium'
    }
  ];

  const handleResolveDispute = (disputeId: string, resolution: string) => {
    console.log('Resolving dispute:', disputeId, resolution);
    // Implementation for dispute resolution
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Dispute Resolution</h2>
        
        <div className="space-y-4">
          {activeDisputes.map((dispute) => (
            <div key={dispute.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">Dispute #{dispute.id}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      dispute.priority === 'high' ? 'bg-red-100 text-red-800' :
                      dispute.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {dispute.priority} priority
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Transaction: {dispute.transactionId}</p>
                  <p className="text-sm text-gray-600 mb-1">Type: {dispute.type}</p>
                  <p className="text-sm text-gray-600 mb-1">Amount: ₹{dispute.amount.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">
                    {dispute.farmer} vs {dispute.trader}
                  </p>
                </div>
                
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  dispute.status === 'open' ? 'bg-red-100 text-red-800' :
                  dispute.status === 'investigating' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {dispute.status}
                </span>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Description:</h4>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{dispute.description}</p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  Created: {new Date(dispute.createdAt).toLocaleDateString()}
                </p>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleResolveDispute(dispute.id, 'favor_farmer')}
                    className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                  >
                    Favor Farmer
                  </button>
                  <button
                    onClick={() => handleResolveDispute(dispute.id, 'favor_trader')}
                    className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                  >
                    Favor Trader
                  </button>
                  <button
                    onClick={() => handleResolveDispute(dispute.id, 'mediate')}
                    className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700 transition-colors"
                  >
                    Mediate
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Price Management Panel Component
const PriceManagementPanel: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    setIsUploading(false);
    setSelectedFile(null);
    setUploadProgress(0);
  };

  const recentUploads = [
    {
      id: 1,
      filename: 'market_prices_2024_01_15.csv',
      uploadedAt: '2024-01-15T10:30:00Z',
      recordsCount: 245,
      status: 'success'
    },
    {
      id: 2,
      filename: 'market_prices_2024_01_14.csv',
      uploadedAt: '2024-01-14T15:45:00Z',
      recordsCount: 238,
      status: 'success'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Price Data Management</h2>
        
        {/* Upload Section */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-6">
          <div className="text-center">
            <Upload size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">Upload Market Price Data</h3>
            <p className="text-sm text-gray-600 mb-4">
              Upload CSV file with market prices. Format: Produce, Mandi, Price, Date
            </p>
            
            <input
              type="file"
              accept=".csv"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              className="hidden"
              id="price-file-upload"
            />
            <label
              htmlFor="price-file-upload"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Choose CSV File
            </label>
            
            {selectedFile && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Selected: {selectedFile.name}</p>
                <button
                  onClick={handleFileUpload}
                  disabled={isUploading}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
                >
                  {isUploading ? 'Uploading...' : 'Upload File'}
                </button>
                
                {isUploading && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{uploadProgress}% complete</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Recent Uploads */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Recent Uploads</h3>
          <div className="space-y-3">
            {recentUploads.map((upload) => (
              <div key={upload.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{upload.filename}</p>
                  <p className="text-sm text-gray-600">
                    {upload.recordsCount} records • {new Date(upload.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                    Success
                  </span>
                  <button className="p-1 text-gray-500 hover:text-gray-700">
                    <Download size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Scheme Management Panel Component
const SchemeManagementPanel: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newScheme, setNewScheme] = useState({
    title: '',
    description: '',
    category: 'subsidy',
    eligibility: '',
    benefits: '',
    applicationLink: '',
    image: ''
  });

  const existingSchemes = [
    {
      id: 1,
      title: 'PM Kisan Samman Nidhi',
      category: 'subsidy',
      status: 'active',
      applicationsCount: 1247,
      lastUpdated: '2024-01-15T10:30:00Z'
    },
    {
      id: 2,
      title: 'Crop Insurance Scheme',
      category: 'insurance',
      status: 'active',
      applicationsCount: 856,
      lastUpdated: '2024-01-14T15:45:00Z'
    }
  ];

  const handleAddScheme = () => {
    console.log('Adding new scheme:', newScheme);
    setShowAddForm(false);
    setNewScheme({
      title: '',
      description: '',
      category: 'subsidy',
      eligibility: '',
      benefits: '',
      applicationLink: '',
      image: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Government Schemes Management</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus size={16} className="inline mr-2" />
            Add New Scheme
          </button>
        </div>

        {/* Add Scheme Form */}
        {showAddForm && (
          <div className="border border-gray-200 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Add New Government Scheme</h3>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newScheme.title}
                  onChange={(e) => setNewScheme({ ...newScheme, title: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Scheme title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={newScheme.category}
                  onChange={(e) => setNewScheme({ ...newScheme, category: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="subsidy">Subsidy</option>
                  <option value="loan">Loan</option>
                  <option value="insurance">Insurance</option>
                  <option value="training">Training</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newScheme.description}
                  onChange={(e) => setNewScheme({ ...newScheme, description: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent h-20 resize-none"
                  placeholder="Scheme description"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Eligibility Criteria</label>
                <textarea
                  value={newScheme.eligibility}
                  onChange={(e) => setNewScheme({ ...newScheme, eligibility: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent h-16 resize-none"
                  placeholder="Enter eligibility criteria (one per line)"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Benefits</label>
                <input
                  type="text"
                  value={newScheme.benefits}
                  onChange={(e) => setNewScheme({ ...newScheme, benefits: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Benefits description"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Application Link</label>
                <input
                  type="url"
                  value={newScheme.applicationLink}
                  onChange={(e) => setNewScheme({ ...newScheme, applicationLink: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="https://..."
                />
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddScheme}
                  className="flex-1 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Add Scheme
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Existing Schemes */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Existing Schemes</h3>
          <div className="space-y-3">
            {existingSchemes.map((scheme) => (
              <div key={scheme.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-800">{scheme.title}</h4>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      scheme.category === 'subsidy' ? 'bg-green-100 text-green-800' :
                      scheme.category === 'insurance' ? 'bg-blue-100 text-blue-800' :
                      scheme.category === 'loan' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {scheme.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {scheme.applicationsCount} applications
                    </span>
                    <span className="text-xs text-gray-500">
                      Updated: {new Date(scheme.lastUpdated).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                    Active
                  </span>
                  <button className="p-1 text-gray-500 hover:text-gray-700">
                    <Edit size={16} />
                  </button>
                  <button className="p-1 text-red-500 hover:text-red-700">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;