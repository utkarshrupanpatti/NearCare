"use client";

import { useState } from "react";
import { Pill, Clock, CheckCircle, AlertCircle, Plus } from "lucide-react";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  nextDose: string;
  taken: boolean;
}

const mockMedications: Medication[] = [
  { id: '1', name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', nextDose: '08:00 AM', taken: false },
  { id: '2', name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', nextDose: '09:00 AM', taken: true },
  { id: '3', name: 'Vitamin D', dosage: '1000 IU', frequency: 'Once daily', nextDose: '10:00 AM', taken: false },
];

export default function MedicationReminder() {
  const [medications, setMedications] = useState<Medication[]>(mockMedications);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    frequency: '',
    nextDose: '',
  });

  const markAsTaken = (id: string) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...med, taken: !med.taken } : med
    ));
  };

  const addMedication = () => {
    if (newMedication.name && newMedication.dosage && newMedication.frequency && newMedication.nextDose) {
      const medication: Medication = {
        id: Date.now().toString(),
        name: newMedication.name,
        dosage: newMedication.dosage,
        frequency: newMedication.frequency,
        nextDose: newMedication.nextDose,
        taken: false,
      };
      setMedications([...medications, medication]);
      setNewMedication({ name: '', dosage: '', frequency: '', nextDose: '' });
      setShowAddForm(false);
    }
  };

  const pendingMedications = medications.filter(med => !med.taken);
  const takenMedications = medications.filter(med => med.taken);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Pill className="mr-3 h-6 w-6 text-green-600" />
          Medication Reminder
        </h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Medication
        </button>
      </div>

      {/* Add Medication Form */}
      {showAddForm && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Add New Medication</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Medication Name"
              value={newMedication.name}
              onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="Dosage"
              value={newMedication.dosage}
              onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })}
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="Frequency"
              value={newMedication.frequency}
              onChange={(e) => setNewMedication({ ...newMedication, frequency: e.target.value })}
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="time"
              placeholder="Next Dose Time"
              value={newMedication.nextDose}
              onChange={(e) => setNewMedication({ ...newMedication, nextDose: e.target.value })}
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex gap-2 mt-3">
            <button
              onClick={addMedication}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Add Medication
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Pending Medications */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
          <AlertCircle className="mr-2 h-5 w-5 text-orange-500" />
          Pending ({pendingMedications.length})
        </h3>
        <div className="space-y-3">
          {pendingMedications.map((medication) => (
            <div key={medication.id} className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center">
                <Pill className="h-5 w-5 text-orange-600 mr-3" />
                <div>
                  <p className="font-semibold text-gray-800">{medication.name}</p>
                  <p className="text-sm text-gray-600">{medication.dosage} - {medication.frequency}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Next dose:</p>
                  <p className="font-semibold text-orange-600">{medication.nextDose}</p>
                </div>
                <button
                  onClick={() => markAsTaken(medication.id)}
                  className="bg-orange-600 text-white px-3 py-1 rounded-lg hover:bg-orange-700 transition-colors text-sm"
                >
                  Mark Taken
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Taken Medications */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
          <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
          Taken Today ({takenMedications.length})
        </h3>
        <div className="space-y-3">
          {takenMedications.map((medication) => (
            <div key={medication.id} className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                <div>
                  <p className="font-semibold text-gray-800">{medication.name}</p>
                  <p className="text-sm text-gray-600">{medication.dosage} - {medication.frequency}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Taken at:</p>
                <p className="font-semibold text-green-600">{medication.nextDose}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
