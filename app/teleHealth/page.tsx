import Link from "next/link";
import { ArrowLeft, Video, CheckCircle, ShieldCheck, Search } from "lucide-react";

const benefits = [
  {
    icon: <Video className="h-8 w-8 text-blue-600" />,
    title: "Consult from Anywhere",
    description: "Access quality healthcare from the comfort of your home, office, or on the go.",
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-green-500" />,
    title: "Convenient & Time-Saving",
    description: "No travel time, no waiting rooms. Get the care you need without the hassle.",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-indigo-500" />,
    title: "Secure & Private",
    description: "Our telehealth platform is HIPAA-compliant, ensuring your consultation is confidential.",
  },
];

export default function TelehealthPage() {
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

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-blue-600 text-white text-center py-20">
          <div className="container mx-auto px-6">
            <Video className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Virtual Care with NearCare Telehealth
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
              Connect with top doctors and specialists through secure video
              consultations.
            </p>
            <Link
              href="/search?specialty=telehealth"
              className="flex items-center justify-center w-fit mx-auto bg-white text-blue-600 text-lg font-semibold px-8 py-4 rounded-full hover:bg-gray-100 transition-all shadow-lg"
            >
              <Search className="mr-3 h-6 w-6" />
              Find a Telehealth Provider
            </Link>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
              Why Choose Telehealth?
            </h2>
            <div className="grid md:grid-cols-3 gap-12">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center items-center mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="container mx-auto px-6 pb-12">
            <Link href="/" className="flex items-center text-blue-600 hover:underline w-fit mx-auto">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
            </Link>
        </div>
      </main>
    </div>
  );
}