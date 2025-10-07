import Link from "next/link";
import {
  Search,
  Stethoscope,
  MapPin,
  Star,
  Heart,
  SlidersHorizontal,
} from "lucide-react";

const mockProviders = [
  {
    id: 1,
    name: "Dr. Evelyn Reed",
    specialty: "Cardiologist",
    address: "123 Health St, Wellness City, 90210",
    distance: "2.5 miles away",
    rating: 4.9,
    reviewCount: 182,
    nextAvailable: "Tomorrow, 10:30 AM",
    imageUrl: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Dr. Marcus Thorne",
    specialty: "Dermatologist",
    address: "456 Skin Ave, Clear Town, 90211",
    distance: "3.1 miles away",
    rating: 4.8,
    reviewCount: 230,
    nextAvailable: "Tomorrow, 2:00 PM",
    imageUrl: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Dr. Lena Petrova",
    specialty: "Pediatrician",
    address: "789 Child Way, Kinderville, 90212",
    distance: "5.0 miles away",
    rating: 4.9,
    reviewCount: 315,
    nextAvailable: "Friday, 9:00 AM",
    imageUrl: "https://i.pravatar.cc/150?img=3",
  },
];

export default function SearchPage({
  searchParams,
}: {
  searchParams: { specialty?: string; location?: string };
}) {
  const { specialty, location } = searchParams;

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
        {/* Refined Search Bar */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-8">
          <form action="/search" method="GET" className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex items-center flex-grow w-full relative">
              <Stethoscope className="absolute left-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="specialty"
                defaultValue={specialty}
                placeholder="Specialty"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center flex-grow w-full relative">
              <MapPin className="absolute left-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="location"
                defaultValue={location}
                placeholder="Location"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button type="submit" className="w-full md:w-auto flex items-center justify-center bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-all">
              <Search className="mr-2 h-5 w-5" />
              Search
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
          <aside className="col-span-1 lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <SlidersHorizontal className="mr-2 h-5 w-5" /> Filters
              </h3>
              {/* Add filter options here */}
              <p className="text-gray-500">Filter controls will go here.</p>
            </div>
          </aside>

          {/* Search Results */}
          <div className="col-span-1 lg:col-span-3">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Showing results for "{specialty || "Any Specialty"}" in "{location || "Any Location"}"
            </h2>
            <div className="space-y-6">
              {mockProviders.map((provider) => (
                <div key={provider.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row transition-shadow hover:shadow-xl">
                  <img src={provider.imageUrl} alt={provider.name} className="w-full md:w-48 h-48 md:h-auto object-cover" />
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">{provider.name}</h3>
                        <p className="text-blue-600 font-medium">{provider.specialty}</p>
                      </div>
                      <button className="text-gray-400 hover:text-red-500">
                        <Heart className="h-6 w-6" />
                      </button>
                    </div>
                    <div className="flex items-center my-3">
                      <div className="flex items-center text-yellow-500">
                        <Star className="w-5 h-5 fill-current" />
                        <span className="text-gray-700 font-bold ml-1">{provider.rating}</span>
                      </div>
                      <p className="text-gray-500 ml-2">({provider.reviewCount} reviews)</p>
                    </div>
                    <p className="text-gray-600">{provider.address}</p>
                    <p className="text-gray-500 font-light">{provider.distance}</p>

                    <div className="mt-auto pt-4 flex flex-col sm:flex-row gap-4 items-center">
                      <div className="w-full sm:w-auto flex-grow">
                        <p className="text-green-600 font-semibold">Next available: {provider.nextAvailable}</p>
                      </div>
                      <Link
                        href={`/booking/${provider.id}`}
                        className="w-full sm:w-auto text-center bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-all"
                      >
                        Book Appointment
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-6 py-8">
          <p className="text-center text-gray-600">
            &copy; {new Date().getFullYear()} NearCare. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}