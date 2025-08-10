import React, { useState } from 'react';
import { Package, Clock, CheckCircle, XCircle, Download, Plus, Trash2, Pencil } from 'lucide-react';
import { Order, Product } from '../types';
import { format } from 'date-fns';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      customerId: 'CUST001',
      products: [
        { productId: '1', quantity: 10, price: 45 },
        { productId: '2', quantity: 5, price: 30 }
      ],
      totalAmount: 600,
      status: 'pending',
      orderDate: new Date('2024-03-10'),
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [newOrder, setNewOrder] = useState<Partial<Order>>({
    products: [],
    status: 'pending',
    orderDate: new Date()
  });

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'dispatched': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending': return Clock;
      case 'processing': return Package;
      case 'dispatched': return Package;
      case 'delivered': return CheckCircle;
      default: return XCircle;
    }
  };

  const handleAddOrder = () => {
    if (editingOrder) {
      setOrders(orders.map(order => order.id === editingOrder.id ? { ...newOrder as Order } : order));
    } else {
      const orderId = `ORD${Math.random().toString().slice(2, 6)}`;
      setOrders([...orders, { ...newOrder as Order, id: orderId }]);
    }
    setIsModalOpen(false);
    setNewOrder({ products: [], status: 'pending', orderDate: new Date() });
    setEditingOrder(null);
  };

  const handleEdit = (order: Order) => {
    setEditingOrder(order);
    setNewOrder(order);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  const downloadOrdersPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(18);
    doc.text('Orders Report', 14, 20);
    
    // Add date
    doc.setFontSize(11);
    doc.text(`Generated on: ${format(new Date(), 'MMM dd, yyyy')}`, 14, 30);

    const tableColumn = ["Order ID", "Customer", "Amount", "Status", "Date"];
    const tableRows = orders.map(order => [
      order.id,
      order.customerId,
      `₹${order.totalAmount}`,
      order.status,
      format(order.orderDate, 'MMM dd, yyyy')
    ]);

    (doc as any).autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [41, 128, 185] }
    });

    doc.save('orders-report.pdf');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Order Management</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Order
          </button>
          <button
            onClick={downloadOrdersPDF}
            className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {(['pending', 'processing', 'dispatched', 'delivered'] as Order['status'][]).map((status) => (
          <div key={status} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm capitalize">{status} Orders</p>
                <p className="text-2xl font-semibold mt-1">
                  {orders.filter(order => order.status === status).length}
                </p>
              </div>
              <div className={`${getStatusColor(status)} p-3 rounded-full`}>
                {React.createElement(getStatusIcon(status), { className: 'w-6 h-6' })}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{order.customerId}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">₹{order.totalAmount}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {format(order.orderDate, 'MMM dd, yyyy')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(order)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Order Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingOrder ? 'Edit Order' : 'Add New Order'}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Customer ID</label>
                <input
                  type="text"
                  value={newOrder.customerId || ''}
                  onChange={(e) => setNewOrder({ ...newOrder, customerId: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Total Amount</label>
                <input
                  type="number"
                  value={newOrder.totalAmount || ''}
                  onChange={(e) => setNewOrder({ ...newOrder, totalAmount: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  value={newOrder.status}
                  onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value as Order['status'] })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="dispatched">Dispatched</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingOrder(null);
                  setNewOrder({ products: [], status: 'pending', orderDate: new Date() });
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddOrder}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                {editingOrder ? 'Update' : 'Add'} Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;