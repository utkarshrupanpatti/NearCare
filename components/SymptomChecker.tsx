"use client";

import { useState } from "react";
import { Search, AlertTriangle, CheckCircle, XCircle, Stethoscope } from "lucide-react";

interface Symptom {
  id: string;
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
  duration: string;
}

interface Condition {
  name: string;
  probability: number;
  description: string;
  urgency: 'low' | 'medium' | 'high';
}

const mockConditions: Condition[] = [
  { name: 'Common Cold', probability: 75, description: 'Viral infection affecting the upper respiratory tract', urgency: 'low' },
  { name: 'Allergic Reaction', probability: 60, description: 'Immune system response to allergens', urgency: 'medium' },
  { name: 'Sinusitis', probability: 45, description: 'Inflammation of the sinuses', urgency: 'low' },
];

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [currentSymptom, setCurrentSymptom] = useState({
    name: '',
    severity: 'mild' as const,
    duration: '',
  });
  const [analysisResults, setAnalysisResults] = useState<Condition[] | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const addSymptom = () => {
    if (currentSymptom.name.trim()) {
      const symptom: Symptom = {
        id: Date.now().toString(),
        name: currentSymptom.name,
        severity: currentSymptom.severity,
        duration: currentSymptom.duration,
      };
      setSymptoms([...symptoms, symptom]);
      setCurrentSymptom({ name: '', severity: 'mild', duration: '' });
    }
  };

  const removeSymptom = (id: string) => {
    setSymptoms(symptoms.filter(s => s.id !== id));
  };

  const analyzeSymptoms = () => {
    if (symptoms.length === 0) return;
    
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setAnalysisResults(mockConditions);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild': return 'text-green-600 bg-green-100';
      case 'moderate': return 'text-yellow-600 bg-yellow-100';
      case 'severe': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Stethoscope className="mr-3 h-6 w-6 text-purple-600" />
          Symptom Checker
        </h2>
        <Search className="h-5 w-5 text-gray-400" />
      </div>

      {/* Add Symptom Form */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Add Your Symptoms</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="Symptom (e.g., headache, fever)"
            value={currentSymptom.name}
            onChange={(e) => setCurrentSymptom({ ...currentSymptom, name: e.target.value })}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <select
            value={currentSymptom.severity}
            onChange={(e) => setCurrentSymptom({ ...currentSymptom, severity: e.target.value as any })}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="mild">Mild</option>
            <option value="moderate">Moderate</option>
            <option value="severe">Severe</option>
          </select>
          <input
            type="text"
            placeholder="Duration (e.g., 2 days)"
            value={currentSymptom.duration}
            onChange={(e) => setCurrentSymptom({ ...currentSymptom, duration: e.target.value })}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button
          onClick={addSymptom}
          className="mt-3 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Add Symptom
        </button>
      </div>

      {/* Symptoms List */}
      {symptoms.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Your Symptoms</h3>
          <div className="space-y-2">
            {symptoms.map((symptom) => (
              <div key={symptom.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className={`px-2 py-1 rounded-full text-xs font-semibold mr-3 ${getSeverityColor(symptom.severity)}`}>
                    {symptom.severity}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{symptom.name}</p>
                    <p className="text-sm text-gray-500">{symptom.duration}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeSymptom(symptom.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <XCircle className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={analyzeSymptoms}
            disabled={isAnalyzing}
            className="mt-4 w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Symptoms'}
          </button>
        </div>
      )}

      {/* Analysis Results */}
      {analysisResults && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
            <CheckCircle className="mr-2 h-5 w-5 text-blue-600" />
            Possible Conditions
          </h3>
          <div className="space-y-3">
            {analysisResults.map((condition, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-800">{condition.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-blue-600">{condition.probability}%</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getUrgencyColor(condition.urgency)}`}>
                      {condition.urgency} urgency
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{condition.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
              <p className="text-sm text-yellow-800">
                <strong>Disclaimer:</strong> This is for informational purposes only and should not replace professional medical advice. 
                Please consult with a healthcare provider for proper diagnosis and treatment.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
