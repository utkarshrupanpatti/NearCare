"use client";

import { useState } from "react";
import { Phone, MapPin, Clock, AlertTriangle, Heart, User, Plus, Edit, Trash2 } from "lucide-react";

interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  address?: string;
  isPrimary: boolean;
}

interface EmergencyService {
  id: string;
  name: string;
  phone: string;
  description: string;
  icon: string;
}

const mockEmergencyServices: EmergencyService[] = [
  { id: '1', name: 'Emergency Services', phone: '911', description: 'Police, Fire, Medical Emergency', icon: '🚨' },
  { id: '2', name: 'Poison Control', phone: '1-800-222-1222', description: '24/7 Poison Emergency Hotline', icon: '☠️' },
  { id: '3', name: 'Suicide Prevention', phone: '988', description: 'Crisis Support & Suicide Prevention', icon: '💙' },
  { id: '4', name: 'Domestic Violence', phone: '1-800-799-7233', description: 'National Domestic Violence Hotline', icon: '🛡️' },
];

const mockContacts: EmergencyContact[] = [
  { id: '1', name: 'John Smith', relationship: 'Spouse', phone: '(555) 123-4567', address: '123 Main St, City, State', isPrimary: true },
  { id: '2', name: 'Dr. Sarah Johnson', relationship: 'Primary Care Doctor', phone: '(555) 987-6543', address: '456 Health Ave, City, State', isPrimary: false },
  { id: '3', name: 'Mary Smith', relationship: 'Mother', phone: '(555) 456-7890', address: '789 Family Rd, City, State', isPrimary: false },
];

export default function EmergencyContacts() {
  const [contacts, setContacts] = useState<EmergencyContact[]>(mockContacts);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingContact, setEditingContact] = useState<EmergencyContact | null>(null);
  const [newContact, setNewContact] = useState({
    name: '',
    relationship: '',
    phone: '',
    address: '',
  });

  const addContact = () => {
    if (newContact.name && newContact.phone) {
      const contact: EmergencyContact = {
        id: Date.now().toString(),
        name: newContact.name,
        relationship: newContact.relationship,
        phone: newContact.phone,
        address: newContact.address,
        isPrimary: contacts.length === 0, // First contact is primary
      };
      setContacts([...contacts, contact]);
      setNewContact({ name: '', relationship: '', phone: '', address: '' });
      setShowAddForm(false);
    }
  };

  const updateContact = () => {
    if (editingContact && editingContact.name && editingContact.phone) {
      setContacts(contacts.map(contact => 
        contact.id === editingContact.id ? editingContact : contact
      ));
      setEditingContact(null);
    }
  };

  const deleteContact = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const setPrimaryContact = (id: string) => {
    setContacts(contacts.map(contact => ({
      ...contact,
      isPrimary: contact.id === id
    })));
  };

  const primaryContact = contacts.find(contact => contact.isPrimary);
  const otherContacts = contacts.filter(contact => !contact.isPrimary);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <AlertTriangle className="mr-3 h-6 w-6 text-red-600" />
          Emergency Contacts
        </h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Contact
        </button>
      </div>

      {/* Emergency Services */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Emergency Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {mockEmergencyServices.map((service) => (
            <div key={service.id} className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{service.icon}</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">{service.name}</h4>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </div>
                </div>
                <a
                  href={`tel:${service.phone}`}
                  className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition-colors flex items-center text-sm"
                >
                  <Phone className="h-4 w-4 mr-1" />
                  {service.phone}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Primary Contact */}
      {primaryContact && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
            <Heart className="mr-2 h-5 w-5 text-red-500" />
            Primary Emergency Contact
          </h3>
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <User className="h-8 w-8 text-red-600 mr-3" />
                <div>
                  <h4 className="font-bold text-gray-800 text-lg">{primaryContact.name}</h4>
                  <p className="text-gray-600">{primaryContact.relationship}</p>
                  {primaryContact.address && (
                    <p className="text-sm text-gray-500">{primaryContact.address}</p>
                  )}
                </div>
              </div>
              <a
                href={`tel:${primaryContact.phone}`}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Contact Form */}
      {(showAddForm || editingContact) && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            {editingContact ? 'Edit Contact' : 'Add New Contact'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Name"
              value={editingContact ? editingContact.name : newContact.name}
              onChange={(e) => editingContact 
                ? setEditingContact({ ...editingContact, name: e.target.value })
                : setNewContact({ ...newContact, name: e.target.value })
              }
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              type="text"
              placeholder="Relationship"
              value={editingContact ? editingContact.relationship : newContact.relationship}
              onChange={(e) => editingContact 
                ? setEditingContact({ ...editingContact, relationship: e.target.value })
                : setNewContact({ ...newContact, relationship: e.target.value })
              }
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={editingContact ? editingContact.phone : newContact.phone}
              onChange={(e) => editingContact 
                ? setEditingContact({ ...editingContact, phone: e.target.value })
                : setNewContact({ ...newContact, phone: e.target.value })
              }
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              type="text"
              placeholder="Address (optional)"
              value={editingContact ? editingContact.address || '' : newContact.address}
              onChange={(e) => editingContact 
                ? setEditingContact({ ...editingContact, address: e.target.value })
                : setNewContact({ ...newContact, address: e.target.value })
              }
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="flex gap-2 mt-3">
            <button
              onClick={editingContact ? updateContact : addContact}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              {editingContact ? 'Update Contact' : 'Add Contact'}
            </button>
            <button
              onClick={() => {
                setShowAddForm(false);
                setEditingContact(null);
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Other Contacts */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Other Contacts</h3>
        <div className="space-y-3">
          {otherContacts.map((contact) => (
            <div key={contact.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <User className="h-6 w-6 text-gray-600 mr-3" />
                  <div>
                    <h4 className="font-semibold text-gray-800">{contact.name}</h4>
                    <p className="text-sm text-gray-600">{contact.relationship}</p>
                    {contact.address && (
                      <p className="text-sm text-gray-500">{contact.address}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Phone className="h-5 w-5" />
                  </a>
                  <button
                    onClick={() => setPrimaryContact(contact.id)}
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    Set Primary
                  </button>
                  <button
                    onClick={() => setEditingContact(contact)}
                    className="text-gray-600 hover:text-gray-700"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteContact(contact.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
