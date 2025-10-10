"use client";

import { useState } from "react";
import { FileText, Download, Eye, Calendar, User, Stethoscope, AlertCircle } from "lucide-react";

interface HealthRecord {
  id: string;
  type: 'lab-result' | 'prescription' | 'vaccination' | 'visit-summary' | 'imaging';
  title: string;
  date: string;
  doctor: string;
  status: 'completed' | 'pending' | 'reviewed';
  description: string;
}

const mockHealthRecords: HealthRecord[] = [
  { 
    id: '1', 
    type: 'lab-result', 
    title: 'Blood Test Results', 
    date: '2024-01-15', 
    doctor: 'Dr. Sarah Johnson', 
    status: 'completed',
    description: 'Complete blood count and metabolic panel'
  },
  { 
    id: '2', 
    type: 'prescription', 
    title: 'Metformin Prescription', 
    date: '2024-01-10', 
    doctor: 'Dr. Michael Chen', 
    status: 'reviewed',
    description: '500mg twice daily for diabetes management'
  },
  { 
    id: '3', 
    type: 'vaccination', 
    title: 'Flu Vaccination', 
    date: '2024-01-05', 
    doctor: 'Dr. Emily Davis', 
    status: 'completed',
    description: 'Annual influenza vaccination'
  },
  { 
    id: '4', 
    type: 'visit-summary', 
    title: 'Annual Checkup', 
    date: '2024-01-08', 
    doctor: 'Dr. Sarah Johnson', 
    status: 'reviewed',
    description: 'Comprehensive annual health examination'
  },
  { 
    id: '5', 
    type: 'imaging', 
    title: 'Chest X-Ray', 
    date: '2024-01-12', 
    doctor: 'Dr. Robert Wilson', 
    status: 'pending',
    description: 'Routine chest imaging'
  },
];

export default function HealthRecords() {
  const [records, setRecords] = useState<HealthRecord[]>(mockHealthRecords);
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedRecord, setSelectedRecord] = useState<HealthRecord | null>(null);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lab-result': return <Stethoscope className="h-5 w-5" />;
      case 'prescription': return <FileText className="h-5 w-5" />;
      case 'vaccination': return <AlertCircle className="h-5 w-5" />;
      case 'visit-summary': return <User className="h-5 w-5" />;
      case 'imaging': return <Eye className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lab-result': return 'text-blue-600 bg-blue-100';
      case 'prescription': return 'text-green-600 bg-green-100';
      case 'vaccination': return 'text-purple-600 bg-purple-100';
      case 'visit-summary': return 'text-orange-600 bg-orange-100';
      case 'imaging': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'reviewed': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'lab-result': return 'Lab Results';
      case 'prescription': return 'Prescriptions';
      case 'vaccination': return 'Vaccinations';
      case 'visit-summary': return 'Visit Summaries';
      case 'imaging': return 'Imaging';
      default: return type;
    }
  };

  const filteredRecords = filterType === 'all' 
    ? records 
    : records.filter(record => record.type === filterType);

  const recordTypes = ['all', 'lab-result', 'prescription', 'vaccination', 'visit-summary', 'imaging'];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <FileText className="mr-3 h-6 w-6 text-indigo-600" />
          Health Records
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">{records.length} records</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {recordTypes.map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterType === type
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {type === 'all' ? 'All Records' : getTypeLabel(type)}
          </button>
        ))}
      </div>

      {/* Records List */}
      <div className="space-y-3">
        {filteredRecords.map((record) => (
          <div 
            key={record.id} 
            className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedRecord(record)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start">
                <div className={`p-2 rounded-lg mr-3 ${getTypeColor(record.type)}`}>
                  {getTypeIcon(record.type)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{record.title}</h3>
                  <p className="text-sm text-gray-600">{record.description}</p>
                  <div className="flex items-center mt-1 text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{record.date}</span>
                    <User className="h-4 w-4 ml-3 mr-1" />
                    <span>{record.doctor}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(record.status)}`}>
                  {record.status}
                </span>
                <button className="text-gray-400 hover:text-gray-600">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Record Detail Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-800">{selectedRecord.title}</h3>
              <button
                onClick={() => setSelectedRecord(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg ${getTypeColor(selectedRecord.type)}`}>
                  {getTypeIcon(selectedRecord.type)}
                </div>
                <span className="font-medium">{getTypeLabel(selectedRecord.type)}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Date</label>
                  <p className="text-gray-800">{selectedRecord.date}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Doctor</label>
                  <p className="text-gray-800">{selectedRecord.doctor}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Description</label>
                <p className="text-gray-800">{selectedRecord.description}</p>
              </div>
              
              <div className="flex gap-2 pt-4">
                <button className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </button>
                <button className="flex items-center bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
