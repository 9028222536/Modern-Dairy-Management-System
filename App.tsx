import React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory';
import Orders from './components/Orders';
import Suppliers from './components/Suppliers';
import Customers from './components/Customers';
import Temperature from './components/Temperature';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                {isAuthenticated && (
                  <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                  >
                    <Menu className="h-6 w-6" />
                  </button>
                )}
                <Link to="/" className="ml-4 text-xl font-bold text-gray-900">
                  Dairy Management System
                </Link>
              </div>
              <div className="flex items-center">
                {!isAuthenticated ? (
                  <>
                    <Link to="/login" className="text-gray-700 hover:text-gray-900 px-3 py-2">
                      Login
                    </Link>
                    <Link to="/register" className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-4">
                      Register
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-gray-900 px-3 py-2"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>

        <div className="flex">
          {/* Sidebar */}
          {isAuthenticated && (
            <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block bg-white w-64 min-h-screen shadow-lg`}>
              <div className="p-4">
                <nav className="space-y-2">
                  <Link to="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Dashboard</Link>
                  <Link to="/inventory" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Inventory</Link>
                  <Link to="/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Orders</Link>
                  <Link to="/suppliers" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Suppliers</Link>
                  <Link to="/customers" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Customers</Link>
                  <Link to="/temperature" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Temperature</Link>
                </nav>
              </div>
            </div>
          )}

          {/* Main content */}
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/register" element={<Register onRegister={handleLogin} />} />
                <Route
                  path="/dashboard"
                  element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
                />
                <Route
                  path="/inventory"
                  element={isAuthenticated ? <Inventory /> : <Navigate to="/login" />}
                />
                <Route
                  path="/orders"
                  element={isAuthenticated ? <Orders /> : <Navigate to="/login" />}
                />
                <Route
                  path="/suppliers"
                  element={isAuthenticated ? <Suppliers /> : <Navigate to="/login" />}
                />
                <Route
                  path="/customers"
                  element={isAuthenticated ? <Customers /> : <Navigate to="/login" />}
                />
                <Route
                  path="/temperature"
                  element={isAuthenticated ? <Temperature /> : <Navigate to="/login" />}
                />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;