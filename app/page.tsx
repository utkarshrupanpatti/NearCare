import Link from "next/link";
import { Search, Stethoscope, User, Calendar, AlertTriangle } from "lucide-react";

export default function Home() {
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
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#features"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Features
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Contact
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Log In
            </button>
            <button className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-colors font-medium shadow-sm">
              Sign Up
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-white text-center py-20 md:py-32">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-4 leading-tight">
              Find Quality Healthcare, Near You.
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Easily locate and book appointments with trusted doctors, clinics,
              and hospitals in your area.
            </p>
            <div className="mt-8 flex justify-center">
              <button className="flex items-center bg-blue-600 text-white text-lg font-semibold px-8 py-4 rounded-full hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <Search className="mr-3 h-6 w-6" />
                Find Care Now
              </button>
            </div>
          </div>
        </section>

        {/* Urgent Care Triage Section */}
        <section className="bg-red-50 border-y border-red-200 py-16">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                Need Care Urgently?
              </h2>
              <p className="text-gray-600 mb-8">
                For a life-threatening emergency, call 911 immediately. For
                urgent, non-life-threatening issues, we can help you find the
                right care center quickly.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="tel:911" className="w-full sm:w-auto flex items-center justify-center bg-red-600 text-white text-lg font-semibold px-8 py-4 rounded-full hover:bg-red-700 transition-all shadow-lg">
                  Call 911
                </a>
                <button className="w-full sm:w-auto flex items-center justify-center bg-white text-blue-600 border-2 border-blue-600 text-lg font-semibold px-8 py-4 rounded-full hover:bg-blue-50 transition-all shadow-lg">
                  Find Urgent Care
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gray-50">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              How It Works
            </h2>
            <p className="text-gray-600 mb-12">
              Accessing healthcare has never been easier.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <Stethoscope className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Search for Providers
                </h3>
                <p className="text-gray-600">
                  Find doctors, dentists, and specialists based on your needs
                  and location.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <User className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  View Profiles & Reviews
                </h3>
                <p className="text-gray-600">
                  Check credentials, specialties, and real patient reviews to
                  make an informed choice.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Book Appointments
                </h3>
                <p className="text-gray-600">
                  Schedule your visit online instantly without the hassle of a
                  phone call.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600">
              &copy; {new Date().getFullYear()} NearCare. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/privacy"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
