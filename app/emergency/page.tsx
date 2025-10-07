import Link from "next/link";
import {
  Search,
  MapPin,
  AlertTriangle,
  Phone,
  Clock,
  ArrowLeft,
} from "lucide-react";

const mockUrgentCareCenters = [
  {
    id: 1,
    name: "RapidCare Urgent Center",
    address: "555 Health Plaza, Wellness City, 90210",
    phone: "555-123-4567",
    hours: "8:00 AM - 8:00 PM Daily",
    waitTime: "Approx. 15 min wait",
  },
  {
    id: 2,
    name: "City Urgent Care",
    address: "800 Medical Rd, Clear Town, 90211",
    phone: "555-987-6543",
    hours: "9:00 AM - 9:00 PM Daily",
    waitTime: "Approx. 25 min wait",
  },
  {
    id: 3,
    name: "Metro Health Urgent Care",
    address: "101 First Aid Ave, Kinderville, 90212",
    phone: "555-555-5555",
    hours: "24/7",
    waitTime: "Approx. 10 min wait",
  },
];

export default function EmergencyPage() {
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
          <Link href="/" className="flex items-center text-blue-600 hover:underline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Emergency Triage Info */}
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-lg mb-8" role="alert">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 mr-4" />
            <div>
              <p className="font-bold text-xl">For Life-Threatening Emergencies, Call 911</p>
              <p>This includes symptoms like chest pain, difficulty breathing, severe bleeding, or loss of consciousness.</p>
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Find Urgent Care</h1>
        <p className="text-lg text-gray-600 mb-8">For non-life-threatening conditions that require immediate attention.</p>

        {/* Results */}
        <div className="space-y-6">
          {mockUrgentCareCenters.map((center) => (
            <div key={center.id} className="bg-white rounded-lg shadow-md p-6 transition-shadow hover:shadow-xl">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{center.name}</h2>
                  <p className="text-gray-600">{center.address}</p>
                </div>
                <div className="mt-4 sm:mt-0 text-left sm:text-right">
                  <p className="text-green-600 font-semibold text-lg">{center.waitTime}</p>
                </div>
              </div>
              <div className="border-t my-4"></div>
              <div className="flex flex-col sm:flex-row justify-between text-gray-700">
                <div className="flex items-center mb-2 sm:mb-0">
                  <Clock className="h-5 w-5 mr-2 text-blue-600" />
                  <span>{center.hours}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-blue-600" />
                  <a href={`tel:${center.phone}`} className="hover:underline">{center.phone}</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}