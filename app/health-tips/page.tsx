import Link from "next/link";
import HealthTips from "../../components/HealthTips";

export default function HealthTipsPage() {
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
              href="/health-tracker"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Health Tracker
            </Link>
            <Link
              href="/medication-reminder"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Medications
            </Link>
            <Link
              href="/symptom-checker"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Symptom Checker
            </Link>
            <Link
              href="/appointments"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Appointments
            </Link>
            <Link
              href="/health-records"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Records
            </Link>
            <Link
              href="/emergency-contacts"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Emergency
            </Link>
            <Link
              href="/health-tips"
              className="text-blue-600 hover:text-blue-700 transition-colors font-medium"
            >
              Health Tips
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

      <main className="flex-grow container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Health Tips & Wellness</h1>
            <p className="text-gray-600">
              Discover evidence-based health tips, wellness advice, and practical guidance to improve your overall well-being.
            </p>
          </div>
          
          <HealthTips />
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
