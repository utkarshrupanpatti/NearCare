import Link from "next/link";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";

// In a real app, you would fetch this data based on the providerId
const mockProvider = {
  id: 1,
  name: "Dr. Evelyn Reed",
  specialty: "Cardiologist",
  imageUrl: "https://i.pravatar.cc/150?img=1",
  bio: "Dr. Evelyn Reed is a board-certified cardiologist with over 15 years of experience in treating cardiovascular diseases. She is dedicated to providing compassionate and comprehensive care to her patients.",
};

const availableTimeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
];

export default function BookingPage({
  params,
}: {
  params: { providerId: string };
}) {
  // You can use params.providerId to fetch specific provider data
  const provider = mockProvider;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="w-full bg-white shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            NearCare
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Log In
            </button>
            <button className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-colors font-medium shadow-sm">
              Sign Up
            </button>
          </div>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-6 py-8">
        <div className="mb-6">
          <Link href="/search" className="flex items-center text-blue-600 hover:underline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Search Results
          </Link>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
          {/* Provider Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b pb-6 mb-6">
            <img
              src={provider.imageUrl}
              alt={provider.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{provider.name}</h1>
              <p className="text-xl text-blue-600 font-medium">{provider.specialty}</p>
              <p className="text-gray-600 mt-2">{provider.bio}</p>
            </div>
          </div>

          {/* Booking Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Calendar className="mr-3 h-6 w-6 text-blue-600" />
              Book an Appointment
            </h2>

            <div className="mb-6">
              <label htmlFor="booking-date" className="block text-gray-700 font-semibold mb-2">Select a Date</label>
              <input type="date" id="booking-date" defaultValue={new Date().toISOString().split('T')[0]} className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Available Times
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {availableTimeSlots.map(time => (
                  <button key={time} className="p-3 border rounded-lg text-center text-blue-600 font-semibold hover:bg-blue-100 hover:border-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 text-center">
              <button className="w-full md:w-auto bg-blue-600 text-white font-bold px-12 py-4 rounded-lg hover:bg-blue-700 transition-all text-lg shadow-md">
                Confirm Appointment
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}