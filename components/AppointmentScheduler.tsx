"use client";

import { useState } from "react";
import { Calendar, Clock, User, MapPin, Phone, Mail, CheckCircle } from "lucide-react";

interface TimeSlot {
  time: string;
  available: boolean;
}

interface Appointment {
  id: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  type: 'in-person' | 'telehealth';
  status: 'confirmed' | 'pending' | 'cancelled';
}

const mockTimeSlots: TimeSlot[] = [
  { time: '09:00 AM', available: true },
  { time: '09:30 AM', available: false },
  { time: '10:00 AM', available: true },
  { time: '10:30 AM', available: true },
  { time: '11:00 AM', available: false },
  { time: '02:00 PM', available: true },
  { time: '02:30 PM', available: true },
  { time: '03:00 PM', available: false },
  { time: '03:30 PM', available: true },
];

const mockAppointments: Appointment[] = [
  { id: '1', doctor: 'Dr. Sarah Johnson', specialty: 'Cardiologist', date: '2024-01-20', time: '10:00 AM', type: 'in-person', status: 'confirmed' },
  { id: '2', doctor: 'Dr. Michael Chen', specialty: 'Dermatologist', date: '2024-01-22', time: '02:30 PM', type: 'telehealth', status: 'pending' },
];

export default function AppointmentScheduler() {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointmentType, setAppointmentType] = useState<'in-person' | 'telehealth'>('in-person');
  const [showBookingForm, setShowBookingForm] = useState(false);

  const availableTimeSlots = mockTimeSlots.filter(slot => slot.available);

  const bookAppointment = () => {
    if (selectedTime && selectedDoctor) {
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        doctor: selectedDoctor,
        specialty: 'General Practice',
        date: selectedDate,
        time: selectedTime,
        type: appointmentType,
        status: 'pending',
      };
      setAppointments([...appointments, newAppointment]);
      setSelectedTime('');
      setSelectedDoctor('');
      setShowBookingForm(false);
    }
  };

  const cancelAppointment = (id: string) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status: 'cancelled' } : apt
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const upcomingAppointments = appointments.filter(apt => 
    apt.status !== 'cancelled' && new Date(apt.date) >= new Date()
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Calendar className="mr-3 h-6 w-6 text-blue-600" />
          Appointment Scheduler
        </h2>
        <button
          onClick={() => setShowBookingForm(!showBookingForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Book New Appointment
        </button>
      </div>

      {/* Booking Form */}
      {showBookingForm && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Book New Appointment</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
              <select
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Doctor</option>
                <option value="Dr. Sarah Johnson">Dr. Sarah Johnson</option>
                <option value="Dr. Michael Chen">Dr. Michael Chen</option>
                <option value="Dr. Emily Davis">Dr. Emily Davis</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Type</label>
              <select
                value={appointmentType}
                onChange={(e) => setAppointmentType(e.target.value as any)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="in-person">In-Person</option>
                <option value="telehealth">Telehealth</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Available Times</label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Time</option>
                {availableTimeSlots.map(slot => (
                  <option key={slot.time} value={slot.time}>{slot.time}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={bookAppointment}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Book Appointment
            </button>
            <button
              onClick={() => setShowBookingForm(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Upcoming Appointments */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
          <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
          Upcoming Appointments ({upcomingAppointments.length})
        </h3>
        <div className="space-y-3">
          {upcomingAppointments.map((appointment) => (
            <div key={appointment.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex items-start">
                  <User className="h-5 w-5 text-blue-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800">{appointment.doctor}</h4>
                    <p className="text-sm text-gray-600">{appointment.specialty}</p>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{appointment.date}</span>
                      <Clock className="h-4 w-4 ml-3 mr-1" />
                      <span>{appointment.time}</span>
                      <span className={`ml-3 px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    appointment.type === 'telehealth' ? 'text-purple-600 bg-purple-100' : 'text-blue-600 bg-blue-100'
                  }`}>
                    {appointment.type}
                  </span>
                  {appointment.status === 'pending' && (
                    <button
                      onClick={() => cancelAppointment(appointment.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button className="flex items-center justify-center p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors">
            <Phone className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-sm font-medium">Call Doctor</span>
          </button>
          <button className="flex items-center justify-center p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors">
            <Mail className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-sm font-medium">Send Message</span>
          </button>
          <button className="flex items-center justify-center p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors">
            <MapPin className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-sm font-medium">Get Directions</span>
          </button>
        </div>
      </div>
    </div>
  );
}
