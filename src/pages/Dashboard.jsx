import React, { useState, useEffect } from "react";
import { User, Search, TrendingUp } from 'lucide-react';
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { auth, db } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

const Dashboard = () => {
  const [username, setUsername] = useState('User');

  useEffect(() => {
    const fetchUsername = async () => {
      // Try to get username from Firestore profile
      try {
        const user = auth.currentUser;
        if (user) {
          const profileDoc = await getDoc(doc(db, 'userProfileData', user.uid));
          if (profileDoc.exists()) {
            const profileData = profileDoc.data();
            if (profileData.personalInfo && profileData.personalInfo.firstName) {
              setUsername(profileData.personalInfo.firstName);
              return;
            } else if (profileData.username) {
              setUsername(profileData.username);
              return;
            }
          }
        }
      } catch (e) {
        // Ignore and fallback to localStorage
      }
      // Fallback: get from localStorage
      const loggedInUser = localStorage.getItem('loggedInUser');
      if (loggedInUser) {
        try {
          const user = JSON.parse(loggedInUser);
          setUsername(user.username || 'User');
        } catch {
          setUsername('User');
        }
      }
    };
    fetchUsername();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
        <Header />

      {/* Main Content */}
      <main className="mx-auto px-22 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {username}!
          </h1>
          <p className="text-gray-600">
            Your profile is complete. Start exploring matches!
          </p>
        </div>

        {/* Stats Card */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-700 font-medium">Profile Views</h3>
              <User className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-gray-900">24</div>
              <div className="flex items-center text-sm text-gray-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12% from last week
              </div>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {/* Find Matches Card */}
          <Link to="/search">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-start space-x-4">
                <Search className="w-6 h-6 text-red-500" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Find Matches
                </h3>
                <p className="text-gray-600">
                  Discover profiles that match your preferences
                </p>
              </div>
            </div>
          </div>
          </Link>
          <Link to="/profile">
          {/* My Profile Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-start space-x-4">
                <User className="w-6 h-6 text-red-500" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  My Profile
                </h3>
                <p className="text-gray-600">
                  View and edit your profile information
                </p>
              </div>
            </div>
          </div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
