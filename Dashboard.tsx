import React from 'react';
import { BarChart3, Package, Truck, Users, AlertTriangle, ThermometerSun } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { label: 'Total Products', value: '156', icon: Package, color: 'bg-blue-500' },
    { label: 'Pending Orders', value: '23', icon: Truck, color: 'bg-green-500' },
    { label: 'Active Customers', value: '1,204', icon: Users, color: 'bg-purple-500' },
    { label: 'Low Stock Alerts', value: '8', icon: AlertTriangle, color: 'bg-red-500' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-full`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Temperature Monitoring</h2>
          <div className="space-y-4">
            {['Cold Storage 1', 'Cold Storage 2', 'Transport Unit 1'].map((unit) => (
              <div key={unit} className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">{unit}</p>
                  <div className="flex items-center mt-1">
                    <ThermometerSun className="w-4 h-4 text-blue-500 mr-1" />
                    <span className="text-sm">4°C</span>
                  </div>
                </div>
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Expiring Soon</h2>
          <div className="space-y-3">
            {[
              { product: 'Fresh Milk', batch: 'BT1234', days: 2 },
              { product: 'Yogurt', batch: 'BT1235', days: 3 },
              { product: 'Butter', batch: 'BT1236', days: 5 },
            ].map((item) => (
              <div key={item.batch} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{item.product}</p>
                  <p className="text-sm text-gray-500">Batch: {item.batch}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  item.days <= 2 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.days} days left
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;