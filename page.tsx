import Link from "next/link";
import {
  ArrowLeft,
  Star,
  MapPin,
  Phone,
  Mail,
  Clock,
  Calendar,
  Heart,
} from "lucide-react";

// In a real app, you would fetch this data based on the providerId
const mockProviderDetails = {
  id: 1,
  name: "Dr. Evelyn Reed",
  specialty: "Cardiologist",
  imageUrl: "https://i.pravatar.cc/150?img=1",
  rating: 4.9,
  reviewCount: 182,
  bio: "Dr. Evelyn Reed is a board-certified cardiologist with over 15 years of experience in treating cardiovascular diseases. She is dedicated to providing compassionate and comprehensive care to her patients, focusing on preventive cardiology and advanced heart failure management. Dr. Reed is known for her empathetic approach and clear communication.",
  address: "123 Health St, Suite 400, Wellness City, CA 90210",
  phone: "(555) 123-4567",
  email: "evelyn.reed@nearcare.com",
  hours: "Mon-Fri: 9:00 AM - 5:00 PM",
  education: [
    "MD, Harvard Medical School",
    "Residency in Internal Medicine, Massachusetts General Hospital",
    "Fellowship in Cardiology, Cleveland Clinic",
  ],
  certifications: ["American Board of Internal Medicine (Cardiology)"],
  languages: ["English", "Spanish"],
  nextAvailable: "Tomorrow, 10:30 AM",
};

export default function ProviderProfilePage({
  params,
}: {
  params: { providerId: string };
}) {
  // In a real application, you'd fetch provider details using params.providerId
  const provider = mockProviderDetails; // Using mock data for now

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
          <Link
            href="/search"
            className="flex items-center text-blue-600 hover:underline"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Search Results
          </Link>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
          {/* Provider Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b pb-6 mb-6">
            <img
              src={provider.imageUrl}
              alt={provider.name}
              className="w-36 h-36 rounded-full object-cover border-4 border-blue-100"
            />
            <div className="text-center sm:text-left">
              <h1 className="text-4xl font-bold text-gray-800">
                {provider.name}
              </h1>
              <p className="text-xl text-blue-600 font-medium">
                {provider.specialty}
              </p>
              <div className="flex items-center justify-center sm:justify-start my-2">
                <div className="flex items-center text-yellow-500">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="text-gray-700 font-bold ml-1">
                    {provider.rating}
                  </span>
                </div>
                <p className="text-gray-500 ml-2">
                  ({provider.reviewCount} reviews)
                </p>
              </div>
              <button className="mt-2 flex items-center justify-center sm:justify-start text-red-500 hover:text-red-600 font-medium">
                <Heart className="h-5 w-5 mr-1" /> Add to Favorites
              </button>
            </div>
          </div>

          {/* Provider Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">About</h2>
              <p className="text-gray-700 leading-relaxed">{provider.bio}</p>

              <h3 className="text-xl font-bold text-gray-800 mt-6 mb-2">
                Education & Certifications
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {provider.education.map((item, index) => (
                  <li key={`edu-${index}`}>{item}</li>
                ))}
                {provider.certifications.map((item, index) => (
                  <li key={`cert-${index}`}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-bold text-gray-800 mt-6 mb-2">
                Languages
              </h3>
              <p className="text-gray-700">{provider.languages.join(", ")}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Contact & Location
              </h2>
              <p className="flex items-center text-gray-700 mb-2">
                <MapPin className="h-5 w-5 mr-2 text-blue-600" />{" "}
                {provider.address}
              </p>
              <p className="flex items-center text-gray-700 mb-2">
                <Phone className="h-5 w-5 mr-2 text-blue-600" />{" "}
                <a href={`tel:${provider.phone}`} className="hover:underline">
                  {provider.phone}
                </a>
              </p>
              <p className="flex items-center text-gray-700 mb-2">
                <Mail className="h-5 w-5 mr-2 text-blue-600" />{" "}
                <a href={`mailto:${provider.email}`} className="hover:underline">
                  {provider.email}
                </a>
              </p>
              <p className="flex items-center text-gray-700 mb-4">
                <Clock className="h-5 w-5 mr-2 text-blue-600" />{" "}
                {provider.hours}
              </p>

              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-blue-800 font-semibold mb-2">
                  Next available: {provider.nextAvailable}
                </p>
                <Link
                  href={`/booking/${provider.id}`}
                  className="w-full bg-blue-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-700 transition-all text-lg shadow-md"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}