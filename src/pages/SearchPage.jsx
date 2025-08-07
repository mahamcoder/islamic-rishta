import React, { useState } from "react";
import { Link } from 'react-router-dom';
import {
  Search,
  Grid,
  List,
  ChevronDown,
  Camera,
  MapPin,
  GraduationCap,
  Heart,
  User,
  Bell,
} from "lucide-react";

const mockProfiles = [
  {
    id: "1",
    name: "Ehhe Jrir",
    age: 18,
    maritalStatus: "never-married",
    location: "Hgh",
    education: "bachelors",
    profession: "engineer",
    isOnline: false,
  },
  {
    id: "2",
    name: "hus tile",
    age: 18,
    maritalStatus: "never-married",
    location: "sika",
    education: "masters",
    profession: "doctor",
    isOnline: false,
  },
  {
    id: "3",
    name: "asad ali",
    age: 18,
    maritalStatus: "divorced",
    location: "sika",
    education: "high-school",
    profession: "teacher",
    isOnline: false,
  },
  {
    id: "4",
    name: "Abdul Salam",
    age: 24,
    maritalStatus: "divorced",
    location: "sales person",
    education: "bachelors",
    profession: "manager",
    isOnline: false,
  },
  {
    id: "5",
    name: "skyskey athnat",
    age: 27,
    maritalStatus: "divorced",
    location: "ti",
    education: "bachelors",
    profession: "nurse",
    isOnline: false,
  },
  {
    id: "6",
    name: "gfdgdf Three",
    age: 23,
    maritalStatus: "divorced",
    location: "fgfgf",
    education: "bachelors",
    profession: "architect",
    isOnline: false,
  },
  {
    id: "7",
    name: "Aqib Ali",
    age: 20,
    maritalStatus: "never-married",
    location: "Software",
    education: "high-school",
    profession: "engineer",
    isOnline: false,
  },
  {
    id: "8",
    name: "gfdgdf Three",
    age: 26,
    maritalStatus: "never-married",
    location: "cghgcf",
    education: "high-school",
    profession: "doctor",
    isOnline: false,
  },
  {
    id: "9",
    name: "Aqib Ali",
    age: 22,
    maritalStatus: "divorced",
    location: "Software",
    education: "bachelors",
    profession: "teacher",
    isOnline: false,
  },
  {
    id: "10",
    name: "Aqib Ali",
    age: 22,
    maritalStatus: "divorced",
    location: "Software",
    education: "bachelors",
    profession: "manager",
    isOnline: false,
  },
  {
    id: "11",
    name: "gfhgf fgh",
    age: 30,
    maritalStatus: "divorced",
    location: "fgh",
    education: "bachelors",
    profession: "nurse",
    isOnline: false,
  },
  {
    id: "12",
    name: "sfs sdf",
    age: 18,
    maritalStatus: "divorced",
    location: "ds",
    education: "high-school",
    profession: "architect",
    isOnline: false,
  },
];

const countries = [
  "All Countries",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Italy",
  "Spain",
  "Netherlands",
  "India",
  "Pakistan",
  "Bangladesh",
  "Saudi Arabia",
  "UAE",
  "Turkey",
  "Egypt",
  "Morocco",
  "Nigeria",
  "South Africa",
  "China",
  "Japan",
  "South Korea",
  "Singapore",
  "Malaysia",
  "Indonesia",
  "Thailand",
  "Philippines",
  "Brazil",
  "Mexico",
];

const maritalStatuses = ["All Status", "never married", "divorced", "widowed"];
const educationLevels = [
  "All Education Levels",
  "bachelor degree",
  "masters degree",
  "diploma",
  "phd",
  "high-school",
];
const professions = [
  "All Professions",
  "engineer",
  "doctor",
  "teacher",
  "manager",
  "nurse",
  "architect",
];

const SearchPage = () => {
  const [isGridView, setIsGridView] = useState(true);
  const [sortBy, setSortBy] = useState("Newest First");
  const [searchQuery, setSearchQuery] = useState("");
  const [ageRange, setAgeRange] = useState([18, 50]);
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [selectedMaritalStatus, setSelectedMaritalStatus] =
    useState("All Status");
  const [selectedEducation, setSelectedEducation] = useState(
    "All Education Levels"
  );
  const [selectedProfession, setSelectedProfession] =
    useState("All Professions");

  const sortOptions = [
    "Newest First",
    "Age: Low to High",
    "Age: High to Low",
    "Name: A to Z",
    "Online First",
  ];

  const getMaritalStatusDisplay = (status) => {
    switch (status) {
      case "never-married":
        return "never married";
      case "divorced":
        return "divorced";
      case "widowed":
        return "widowed";
      default:
        return status;
    }
  };

  const getEducationDisplay = (education) => {
    switch (education) {
      case "bachelors":
        return "bachelors";
      case "masters":
        return "masters";
      case "high-school":
        return "high school";
      case "diploma":
        return "diploma";
      case "phd":
        return "PhD";
      default:
        return education;
    }
  };

  const ProfileCard = ({ profile }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="relative">
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <Camera className="w-8 h-8 text-gray-400" />
        </div>
        <div className="absolute top-3 left-3 bg-gray-500 text-white text-xs px-2 py-1 rounded">
          Offline
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-semibold text-gray-900">{profile.name}</h3>
            <p className="text-sm text-gray-600">{profile.age} years old</p>
          </div>
          <button className="text-gray-400 hover:text-red-500">
            <Heart className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <User className="w-4 h-4 mr-2 text-gray-400" />
            <span>{getMaritalStatusDisplay(profile.maritalStatus)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
            <span>{profile.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <GraduationCap className="w-4 h-4 mr-2 text-gray-400" />
            <span>{getEducationDisplay(profile.education)}</span>
          </div>
        </div>

        <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded font-medium transition-colors">
          <User className="w-4 h-4 inline mr-2" />
          View Profile
        </button>
      </div>
    </div>
  );

  const ProfileListItem = ({ profile }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center space-x-4">
      <div className="relative flex-shrink-0">
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
          <Camera className="w-6 h-6 text-gray-400" />
        </div>
        <div className="absolute -top-1 -right-1 bg-gray-500 text-white text-xs px-2 py-1 rounded">
          Offline
        </div>
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-gray-900">{profile.name}</h3>
            <p className="text-sm text-gray-600">{profile.age} years old</p>
          </div>
          <button className="text-gray-400 hover:text-red-500">
            <Heart className="w-5 h-5" />
          </button>
        </div>

        <div className="flex space-x-4 mb-3">
          <div className="flex items-center text-sm text-gray-600">
            <User className="w-4 h-4 mr-1 text-gray-400" />
            <span>{getMaritalStatusDisplay(profile.maritalStatus)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-1 text-gray-400" />
            <span>{profile.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <GraduationCap className="w-4 h-4 mr-1 text-gray-400" />
            <span>{getEducationDisplay(profile.education)}</span>
          </div>
        </div>

        <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded font-medium transition-colors">
          <User className="w-4 h-4 inline mr-2" />
          View Profile
        </button>
      </div>
    </div>
  );

  const Dropdown = ({
    value,
    options,
    onChange,
    placeholder,
  }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 flex items-center justify-between"
        >
          <span className="text-sm text-gray-700">{value}</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">WIFE4LIFE</h1>
              </div>
            </div>
            <nav className="flex space-x-8">
              <Link
                to="/"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Dashboard
              </Link>
              <Link to="/search" className="text-red-500 font-medium">
                Search
              </Link>
              <Link
                to="/profile"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Profile
              </Link>
            </nav>
            <div className="flex items-center">
              <Bell className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Search Filters
                </h2>
                <button className="text-red-500 text-sm hover:text-red-600" type="button">
                  Clear All
                </button>
              </div>

              <div className="space-y-6">
                {/* Search Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search by name, location, or profession
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search profiles..."
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                    />
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                  </div>
                </div>

                {/* Age Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age Range: {ageRange[0]} - {ageRange[1]} years
                  </label>
                  <input
                    type="range"
                    min="18"
                    max="50"
                    value={ageRange[1]}
                    onChange={(e) =>
                      setAgeRange([ageRange[0], parseInt(e.target.value, 10)])
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <Dropdown
                    value={selectedCountry}
                    options={countries}
                    onChange={setSelectedCountry}
                    placeholder="Select Country"
                  />
                </div>

                {/* Sect */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sect
                  </label>
                  <Dropdown
                    value="All Sects"
                    options={["All Sects", "Sunni", "Shia", "Other"]}
                    onChange={() => {}}
                    placeholder="Select Sect"
                  />
                </div>

                {/* Marital Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Marital Status
                  </label>
                  <Dropdown
                    value={selectedMaritalStatus}
                    options={maritalStatuses}
                    onChange={setSelectedMaritalStatus}
                    placeholder="Select Marital Status"
                  />
                </div>

                {/* Education */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Education
                  </label>
                  <Dropdown
                    value={selectedEducation}
                    options={educationLevels}
                    onChange={setSelectedEducation}
                    placeholder="Select Education"
                  />
                </div>

                {/* Profession */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profession
                  </label>
                  <Dropdown
                    value={selectedProfession}
                    options={professions}
                    onChange={setSelectedProfession}
                    placeholder="Select Profession"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Search Profiles
                </h2>
                <p className="text-gray-600">
                  Found {mockProfiles.length} profiles matching your criteria
                </p>
              </div>

              <div className="flex items-center space-x-4">
                {/* Layout Toggle */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() => setIsGridView(true)}
                    className={`p-2 rounded ${
                      isGridView
                        ? "bg-red-500 text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsGridView(false)}
                    className={`p-2 rounded ${
                      !isGridView
                        ? "bg-red-500 text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                {/* Sort Dropdown */}
                <Dropdown
                  value={sortBy}
                  options={sortOptions}
                  onChange={setSortBy}
                  placeholder="Sort by"
                />
              </div>
            </div>

            {/* Profiles Grid/List */}
            {isGridView ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockProfiles.map((profile) => (
                  <ProfileCard key={profile.id} profile={profile} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {mockProfiles.map((profile) => (
                  <ProfileListItem key={profile.id} profile={profile} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;