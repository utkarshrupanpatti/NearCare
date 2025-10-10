"use client";

import { useState } from "react";
import { Heart, Activity, Thermometer, Weight, Calendar, TrendingUp } from "lucide-react";

interface HealthMetric {
  id: string;
  type: 'blood-pressure' | 'heart-rate' | 'weight' | 'temperature';
  value: string;
  unit: string;
  date: string;
  time: string;
}

const mockHealthData: HealthMetric[] = [
  { id: '1', type: 'blood-pressure', value: '120/80', unit: 'mmHg', date: '2024-01-15', time: '08:00' },
  { id: '2', type: 'heart-rate', value: '72', unit: 'bpm', date: '2024-01-15', time: '08:05' },
  { id: '3', type: 'weight', value: '70', unit: 'kg', date: '2024-01-15', time: '08:10' },
  { id: '4', type: 'temperature', value: '36.5', unit: '°C', date: '2024-01-15', time: '08:15' },
];

export default function HealthTracker() {
  const [metrics, setMetrics] = useState<HealthMetric[]>(mockHealthData);
  const [newMetric, setNewMetric] = useState({
    type: 'blood-pressure' as const,
    value: '',
    unit: '',
  });

  const addMetric = () => {
    if (newMetric.value && newMetric.unit) {
      const metric: HealthMetric = {
        id: Date.now().toString(),
        type: newMetric.type,
        value: newMetric.value,
        unit: newMetric.unit,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toTimeString().split(' ')[0].slice(0, 5),
      };
      setMetrics([metric, ...metrics]);
      setNewMetric({ type: 'blood-pressure', value: '', unit: '' });
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'blood-pressure': return <Activity className="h-5 w-5" />;
      case 'heart-rate': return <Heart className="h-5 w-5" />;
      case 'weight': return <Weight className="h-5 w-5" />;
      case 'temperature': return <Thermometer className="h-5 w-5" />;
      default: return <Activity className="h-5 w-5" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'blood-pressure': return 'Blood Pressure';
      case 'heart-rate': return 'Heart Rate';
      case 'weight': return 'Weight';
      case 'temperature': return 'Temperature';
      default: return type;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <TrendingUp className="mr-3 h-6 w-6 text-blue-600" />
          Health Tracker
        </h2>
        <Calendar className="h-5 w-5 text-gray-400" />
      </div>

      {/* Add New Metric */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Add New Reading</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <select
            value={newMetric.type}
            onChange={(e) => setNewMetric({ ...newMetric, type: e.target.value as any })}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="blood-pressure">Blood Pressure</option>
            <option value="heart-rate">Heart Rate</option>
            <option value="weight">Weight</option>
            <option value="temperature">Temperature</option>
          </select>
          <input
            type="text"
            placeholder="Value"
            value={newMetric.value}
            onChange={(e) => setNewMetric({ ...newMetric, value: e.target.value })}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Unit"
            value={newMetric.unit}
            onChange={(e) => setNewMetric({ ...newMetric, unit: e.target.value })}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addMetric}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      {/* Metrics List */}
      <div className="space-y-3">
        {metrics.map((metric) => (
          <div key={metric.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="text-blue-600 mr-3">
                {getIcon(metric.type)}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{getTypeLabel(metric.type)}</p>
                <p className="text-sm text-gray-500">{metric.date} at {metric.time}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-gray-800">{metric.value}</p>
              <p className="text-sm text-gray-500">{metric.unit}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
