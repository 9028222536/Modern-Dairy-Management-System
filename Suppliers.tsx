import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Star } from 'lucide-react';

interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
  address: string;
  products: string[];
  rating: number;
}

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    {
      id: '1',
      name: 'Local Dairy Farm',
      contact: '+91 9876543210',
      email: 'contact@localdairy.com',
      address: '123 Dairy Farm Road, Rural District',
      products: ['Fresh Milk', 'Cream'],
      rating: 4.5
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [newSupplier, setNewSupplier] = useState<Partial<Supplier>>({
    products: [],
    rating: 0
  });

  const handleAddSupplier = () => {
    if (!newSupplier.name || !newSupplier.email || !newSupplier.contact) {
      alert('Please fill in all required fields');
      return;
    }

    const supplierData = {
      ...newSupplier,
      id: editingSupplier ? editingSupplier.id : `SUP${Math.random().toString().slice(2, 6)}`,
      products: newSupplier.products || [],
      rating: newSupplier.rating || 0
    } as Supplier;

    if (editingSupplier) {
      setSuppliers(suppliers.map(s => s.id === editingSupplier.id ? supplierData : s));
    } else {
      setSuppliers([...suppliers, supplierData]);
    }
    setIsModalOpen(false);
    setNewSupplier({ products: [], rating: 0 });
    setEditingSupplier(null);
  };

  const handleEdit = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setNewSupplier(supplier);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      setSuppliers(suppliers.filter(s => s.id !== id));
    }
  };

  const handleProductsChange = (value: string) => {
    const products = value.split(',').map(p => p.trim()).filter(p => p !== '');
    setNewSupplier({ ...newSupplier, products });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Supplier Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Supplier
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suppliers.map((supplier) => (
          <div key={supplier.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{supplier.name}</h3>
                <p className="text-sm text-gray-500">{supplier.email}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(supplier)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(supplier.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-sm text-gray-600">{supplier.address}</p>
              <p className="text-sm text-gray-600">{supplier.contact}</p>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700">Products Supplied:</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {supplier.products.map((product, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {product}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`w-4 h-4 ${
                      index < supplier.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">{supplier.rating}/5</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Supplier Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingSupplier ? 'Edit Supplier' : 'Add New Supplier'}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name *</label>
                <input
                  type="text"
                  value={newSupplier.name || ''}
                  onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email *</label>
                <input
                  type="email"
                  value={newSupplier.email || ''}
                  onChange={(e) => setNewSupplier({ ...newSupplier, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact *</label>
                <input
                  type="text"
                  value={newSupplier.contact || ''}
                  onChange={(e) => setNewSupplier({ ...newSupplier, contact: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <textarea
                  value={newSupplier.address || ''}
                  onChange={(e) => setNewSupplier({ ...newSupplier, address: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Products (comma-separated)</label>
                <input
                  type="text"
                  value={newSupplier.products?.join(', ') || ''}
                  onChange={(e) => handleProductsChange(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Milk, Cream, Butter"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Rating</label>
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setNewSupplier({ ...newSupplier, rating: index + 1 })}
                      className="p-1"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          index < (newSupplier.rating || 0)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingSupplier(null);
                  setNewSupplier({ products: [], rating: 0 });
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSupplier}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                {editingSupplier ? 'Update' : 'Add'} Supplier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Suppliers;