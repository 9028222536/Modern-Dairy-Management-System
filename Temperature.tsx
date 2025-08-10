import React, { useState, useEffect } from 'react';
import { ThermometerSun, AlertTriangle } from 'lucide-react';

interface StorageUnit {
  id: string;
  name: string;
  currentTemp: number;
  optimalTemp: number;
  humidity: number;
  lastUpdated: Date;
  status: 'normal' | 'warning' | 'critical';
}

const Temperature = () => {
  const [storageUnits, setStorageUnits] = useState<StorageUnit[]>([
    {
      id: '1',
      name: 'Cold Storage 1',
      currentTemp: 4,
      optimalTemp: 4,
      humidity: 85,
      lastUpdated: new Date(),
      status: 'normal'
    },
    {
      id: '2',
      name: 'Cold Storage 2',
      currentTemp: 5,
      optimalTemp: 4,
      humidity: 82,
      lastUpdated: new Date(),
      status: 'warning'
    },
    {
      id: '3',
      name: 'Transport Unit 1',
      currentTemp: 3.8,
      optimalTemp: 4,
      humidity: 80,
      lastUpdated: new Date(),
      status: 'normal'
    }
  ]);

  // Simulate temperature updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStorageUnits(units =>
        units.map(unit => ({
          ...unit,
          currentTemp: unit.currentTemp + (Math.random() - 0.5) * 0.2,
          humidity: Math.max(75, Math.min(90, unit.humidity + (Math.random() - 0.5) * 2)),
          lastUpdated: new Date(),
          status: Math.abs(unit.currentTemp - unit.optimalTemp) > 1.5 
            ? 'critical' 
            : Math.abs(unit.currentTemp - unit.optimalTemp) > 0.8 
            ? 'warning' 
            : 'normal'
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: StorageUnit['status']) => {
    switch (status) {
      case 'normal': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Temperature Monitoring</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {storageUnits.map((unit) => (
          <div key={unit.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{unit.name}</h3>
                <p className="text-sm text-gray-500">
                  Last updated: {unit.lastUpdated.toLocaleTimeString()}
                </p>
              </div>
              {unit.status !== 'normal' && (
                <AlertTriangle className="w-6 h-6 text-yellow-500" />
              )}
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <ThermometerSun className="w-5 h-5 text-blue-500 mr-2" />
                  <span className="text-2xl font-bold">
                    {unit.currentTemp.toFixed(1)}°C
                  </span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(unit.status)}`}>
                  {unit.status}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Optimal Temperature</span>
                    <span>{unit.optimalTemp}°C</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{
                        width: `${Math.min(100, Math.max(0, (unit.currentTemp / unit.optimalTemp) * 100))}%`
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Humidity</span>
                    <span>{unit.humidity.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${unit.humidity}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Temperature History</h2>
        <div className="h-64 flex items-center justify-center text-gray-500">
          Temperature graph will be implemented here
        </div>
      </div>
    </div>
  );
};

export default Temperature;