import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Star } from 'lucide-react';
import { Customer } from '../types';

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 'CUST001',
      name: 'John Doe',
      email: 'john@example.com',
      type: 'retail',
      address: '456 Main St, City',
      phone: '+91 9876543210',
      loyaltyPoints: 150
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [newCustomer, setNewCustomer] = useState<Partial<Customer>>({
    type: 'retail',
    loyaltyPoints: 0
  });

  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.email || !newCustomer.phone) {
      alert('Please fill in all required fields');
      return;
    }

    const customerData = {
      ...newCustomer,
      id: editingCustomer ? editingCustomer.id : `CUST${Math.random().toString().slice(2, 6)}`,
      loyaltyPoints: newCustomer.loyaltyPoints || 0
    } as Customer;

    if (editingCustomer) {
      setCustomers(customers.map(c => c.id === editingCustomer.id ? customerData : c));
    } else {
      setCustomers([...customers, customerData]);
    }
    setIsModalOpen(false);
    setNewCustomer({ type: 'retail', loyaltyPoints: 0 });
    setEditingCustomer(null);
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setNewCustomer(customer);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter(c => c.id !== id));
    }
  };

  const getCustomerTypeColor = (type: Customer['type']) => {
    switch (type) {
      case 'retail': return 'bg-green-100 text-green-800';
      case 'wholesale': return 'bg-blue-100 text-blue-800';
      case 'distributor': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Customer Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Customer
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map((customer) => (
          <div key={customer.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{customer.name}</h3>
                <p className="text-sm text-gray-500">{customer.email}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(customer)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(customer.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mt-4">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCustomerTypeColor(customer.type)}`}>
                {customer.type}
              </span>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-600">{customer.address}</p>
              <p className="text-sm text-gray-600">{customer.phone}</p>
            </div>

            <div className="mt-4 flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="ml-2 text-sm text-gray-600">
                {customer.loyaltyPoints} loyalty points
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Customer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingCustomer ? 'Edit Customer' : 'Add New Customer'}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name *</label>
                <input
                  type="text"
                  value={newCustomer.name || ''}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email *</label>
                <input
                  type="email"
                  value={newCustomer.email || ''}
                  onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  value={newCustomer.type}
                  onChange={(e) => setNewCustomer({ ...newCustomer, type: e.target.value as Customer['type'] })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="retail">Retail</option>
                  <option value="wholesale">Wholesale</option>
                  <option value="distributor">Distributor</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone *</label>
                <input
                  type="text"
                  value={newCustomer.phone || ''}
                  onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <textarea
                  value={newCustomer.address || ''}
                  onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Loyalty Points</label>
                <input
                  type="number"
                  value={newCustomer.loyaltyPoints || 0}
                  onChange={(e) => setNewCustomer({ ...newCustomer, loyaltyPoints: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingCustomer(null);
                  setNewCustomer({ type: 'retail', loyaltyPoints: 0 });
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCustomer}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                {editingCustomer ? 'Update' : 'Add'} Customer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;