import { CheckCircle, Crown } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div>
      {/* Hero Section */}
      <main className=" mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 bg-[#FEF3F3]">
        <div className="text-center">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Find Your Ideal <span className="text-red-500">Life Partner</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Connect with compatible Muslims in a safe, respectful environment
            <br />
            designed for serious matrimonial intentions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              to="/signup"
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-md font-semibold text-lg transition-colors min-w-[180px]"
            >
              Sign Up Today
            </Link>
            <Link>
              <button
                to=""
                className="cursor-pointer border-2 border-red-500 text-red-500 hover:bg-red-50 px-8 py-4 rounded-md font-semibold text-lg transition-colors min-w-[180px]"
              >
                Browse Profiles
              </button>
            </Link>
          </div>

          {/* Features */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 border-2 border-red-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
              <span className="font-medium">100% Halal</span>
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-red-500" />
              <span className="font-medium">Verified Profiles</span>
            </div>

            <div className="flex items-center gap-2">
              <Crown className="w-6 h-6 text-red-500" />
              <span className="font-medium">Online Nikah Service</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HeroSection;
