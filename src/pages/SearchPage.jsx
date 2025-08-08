import React, { useState, useEffect } from "react";
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
import { auth, db } from '../firebase/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { toast } from 'react-toastify';

const countries = [
  "All Countries",
  "Afghanistan",
  "Albania",
  "Algeria",
  "Azerbaijan",
  "Bahrain",
  "Bangladesh",
  "Brunei",
  "Burkina Faso",
  "Chad",
  "Comoros",
  "Djibouti",
  "Egypt",
  "Gambia",
  "Guinea",
  "Indonesia",
  "Iran",
  "Iraq",
  "Jordan",
  "Kazakhstan",
  "Kuwait",
  "Kyrgyzstan",
  "Lebanon",
  "Libya",
  "Malaysia",
  "Maldives",
  "Mali",
  "Mauritania",
  "Morocco",
  "Niger",
  "Oman",
  "Pakistan",
  "Palestine",
  "Qatar",
  "Saudi Arabia",
  "Senegal",
  "Sierra Leone",
  "Somalia",
  "Sudan",
  "Syria",
  "Tajikistan",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "United Arab Emirates",
  "Uzbekistan",
  "Western Sahara",
  "Yemen",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "France",
  "Germany",
  "Italy",
  "Spain",
  "Japan",
  "China",
  "Russia",
  "Brazil",
  "South Africa",
  "South Korea",
  "New Zealand"
];


const maritalStatuses = ["All Status", "Never Married", "Divorced", "Widowed"];
const educationLevels = [
  "All Education Levels",
  "High School",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
  "Diploma",
  "Other"
];
const professions = [
  "All Professions",
  "Engineer",
  "Doctor",
  "Teacher",
  "Manager",
  "Nurse",
  "Architect",
  "Software Engineer",
  "Business Analyst",
  "Consultant",
];

const SearchPage = () => {
  const [isGridView, setIsGridView] = useState(true);
  const [sortBy, setSortBy] = useState("Newest First");
  const [searchQuery, setSearchQuery] = useState("");
  const [ageRange, setAgeRange] = useState([18, 50]);
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState("All Status");
  const [selectedEducation, setSelectedEducation] = useState("All Education Levels");
  const [selectedProfession, setSelectedProfession] = useState("All Professions");
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const sortOptions = [
    "Newest First",
    "Age: Low to High",
    "Age: High to Low",
    "Name: A to Z",
    "Online First",
  ];

  // Fetch all user profiles from Firestore
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        
        console.log('Fetching profiles from userProfileData collection...');
        
        const profilesCollection = collection(db, 'userProfileData');
        const profilesSnapshot = await getDocs(profilesCollection);
        const profilesData = [];
        
        console.log('Total documents found in userProfileData:', profilesSnapshot.size);
        
        if (profilesSnapshot.size === 0) {
          console.log('No documents found in userProfileData collection');
          console.log('Checking if there are other collections...');
          
          // Let's also check if there are users in the 'users' collection (Realtime Database equivalent)
          // For now, we'll show a message
          toast.info('No profiles found in userProfileData collection. Users might not have completed their profiles yet.');
        }
        
        profilesSnapshot.forEach((doc) => {
          const data = doc.data();
          console.log('Document ID:', doc.id);
          console.log('Document data:', data);
          console.log('Has personalInfo:', !!data.personalInfo);
          console.log('Has profileCompleted:', data.profileCompleted);
          
          // Show ALL profiles without any filtering conditions
          // Calculate age from date of birth
          let age = 25; // default age
          if (data.personalInfo?.dateOfBirth) {
            try {
              const birthDate = new Date(data.personalInfo.dateOfBirth);
              const today = new Date();
              
              // Check if the date is valid
              if (!isNaN(birthDate.getTime()) && birthDate < today) {
                age = today.getFullYear() - birthDate.getFullYear();
                const monthDiff = today.getMonth() - birthDate.getMonth();
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                  age--;
                }
                // Ensure age is reasonable
                if (age < 18 || age > 100) {
                  age = 25; // fallback to default
                }
              }
            } catch (error) {
              console.log('Error calculating age for profile:', doc.id, error);
              age = 25; // fallback to default
            }
          }

          const profileData = {
            id: doc.id,
            name: data.personalInfo ? `${data.personalInfo.firstName || ''} ${data.personalInfo.lastName || ''}`.trim() || 'Anonymous' : 'Anonymous',
            age: age,
            maritalStatus: data.familyBackground?.maritalStatus || 'Not specified',
            location: data.familyBackground ? `${data.familyBackground.city || ''}, ${data.familyBackground.country || ''}`.trim() || 'Location not specified' : 'Location not specified',
            education: data.careerEducation?.education || 'Not specified',
            profession: data.careerEducation?.occupation || 'Not specified',
            aboutMe: data.personalInfo?.aboutMe || '',
            gender: data.personalInfo?.gender || 'Not specified',
            expectations: data.personalInfo?.expectations || '',
            healthConditions: data.personalInfo?.healthConditions || '',
            isOnline: false, // You can implement online status later
            createdAt: data.profileCompletedAt || data.createdAt || new Date().toISOString(),
            personalInfo: data.personalInfo || {},
            familyBackground: data.familyBackground || {},
            careerEducation: data.careerEducation || {},
            religiousInfo: data.religiousInfo || {}
          };
          
          console.log('Processed profile data:', profileData);
          profilesData.push(profileData);
        });
        
        console.log('Final profiles to display:', profilesData.length);
        console.log('All profiles:', profilesData);
        
        setProfiles(profilesData);
        setFilteredProfiles(profilesData);
      } catch (error) {
        console.error('Error fetching profiles:', error);
        toast.error('Failed to load profiles: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  // Debug function to check all collections
  const debugCollections = async () => {
    try {
      console.log('=== DEBUGGING COLLECTIONS ===');
      
      // Check userProfileData collection
      const userProfileCollection = collection(db, 'userProfileData');
      const userProfileSnapshot = await getDocs(userProfileCollection);
      console.log('userProfileData collection size:', userProfileSnapshot.size);
      
      // Check if there's a 'users' collection
      try {
        const usersCollection = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCollection);
        console.log('users collection size:', usersSnapshot.size);
      } catch (e) {
        console.log('users collection does not exist or is not accessible');
      }
      
      // Check if there's a 'profiles' collection
      try {
        const profilesCollection = collection(db, 'profiles');
        const profilesSnapshot = await getDocs(profilesCollection);
        console.log('profiles collection size:', profilesSnapshot.size);
      } catch (e) {
        console.log('profiles collection does not exist or is not accessible');
      }
      
      console.log('=== END DEBUGGING ===');
    } catch (error) {
      console.error('Error debugging collections:', error);
    }
  };

  // Call debug function on mount
  useEffect(() => {
    debugCollections();
  }, []);

  // Filter profiles based on search criteria
  useEffect(() => {
    let filtered = [...profiles];
    console.log('Starting with profiles:', filtered.length);

    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(profile => 
        profile.name.toLowerCase().includes(query) ||
        profile.location.toLowerCase().includes(query) ||
        profile.profession.toLowerCase().includes(query) ||
        profile.education.toLowerCase().includes(query)
      );
      console.log('After search query filter:', filtered.length);
    }

    // Age range filter
    filtered = filtered.filter(profile => 
      profile.age >= ageRange[0] && profile.age <= ageRange[1]
    );
    console.log('After age range filter:', filtered.length);

    // Country filter
    if (selectedCountry !== "All Countries") {
      filtered = filtered.filter(profile => 
        profile.location.toLowerCase().includes(selectedCountry.toLowerCase())
      );
      console.log('After country filter:', filtered.length);
    }

    // Marital status filter
    if (selectedMaritalStatus !== "All Status") {
      filtered = filtered.filter(profile => 
        profile.maritalStatus.toLowerCase() === selectedMaritalStatus.toLowerCase()
      );
      console.log('After marital status filter:', filtered.length);
    }

    // Education filter
    if (selectedEducation !== "All Education Levels") {
      filtered = filtered.filter(profile => 
        profile.education.toLowerCase().includes(selectedEducation.toLowerCase())
      );
      console.log('After education filter:', filtered.length);
    }

    // Profession filter
    if (selectedProfession !== "All Professions") {
      filtered = filtered.filter(profile => 
        profile.profession.toLowerCase().includes(selectedProfession.toLowerCase())
      );
      console.log('After profession filter:', filtered.length);
    }

    // Sort profiles
    switch (sortBy) {
      case "Age: Low to High":
        filtered.sort((a, b) => a.age - b.age);
        break;
      case "Age: High to Low":
        filtered.sort((a, b) => b.age - a.age);
        break;
      case "Name: A to Z":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Online First":
        filtered.sort((a, b) => (b.isOnline ? 1 : 0) - (a.isOnline ? 1 : 0));
        break;
      case "Newest First":
      default:
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    console.log('Final filtered profiles:', filtered.length);
    console.log('Filtered profiles:', filtered);
    setFilteredProfiles(filtered);
  }, [profiles, searchQuery, ageRange, selectedCountry, selectedMaritalStatus, selectedEducation, selectedProfession, sortBy]);

  const clearAllFilters = () => {
    setSearchQuery("");
    setAgeRange([18, 50]);
    setSelectedCountry("All Countries");
    setSelectedMaritalStatus("All Status");
    setSelectedEducation("All Education Levels");
    setSelectedProfession("All Professions");
  };

  const getMaritalStatusDisplay = (status) => {
    switch (status.toLowerCase()) {
      case "never married":
        return "Never Married";
      case "divorced":
        return "Divorced";
      case "widowed":
        return "Widowed";
      default:
        return status;
    }
  };

  const getEducationDisplay = (education) => {
    switch (education.toLowerCase()) {
      case "bachelor's degree":
        return "Bachelor's Degree";
      case "master's degree":
        return "Master's Degree";
      case "high school":
        return "High School";
      case "diploma":
        return "Diploma";
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
          {profile.isOnline ? 'Online' : 'Offline'}
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
          {profile.isOnline ? 'Online' : 'Offline'}
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profiles...</p>
        </div>
      </div>
    );
  }

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
                <button 
                  onClick={clearAllFilters}
                  className="text-red-500 text-sm hover:text-red-600" 
                  type="button"
                >
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
                  Found {filteredProfiles.length} profiles matching your criteria
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
            {filteredProfiles.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No profiles found</h3>
                <p className="text-gray-600">Try adjusting your search criteria</p>
              </div>
            ) : isGridView ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProfiles.map((profile) => (
                  <ProfileCard key={profile.id} profile={profile} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProfiles.map((profile) => (
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