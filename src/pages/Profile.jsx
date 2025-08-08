import React, { useState, useEffect } from 'react';
import { MapPin, Briefcase, GraduationCap, Edit3, Eye, ChevronDown, Save, Check } from 'lucide-react';
import Header from "../components/Header";
import { auth, db } from '../firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const TAB_TYPES = ['Personal', 'Preferences', 'Career', 'Privacy'];


const Profile = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Personal');
    const [showVisibilityDropdown, setShowVisibilityDropdown] = useState(false);
    const [selectedVisibility, setSelectedVisibility] = useState('Public - Visible to all users');
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editFormData, setEditFormData] = useState({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
      const fetchProfileData = async () => {
        try {
          // Get logged in user from localStorage for basic info
          const loggedInUser = localStorage.getItem('loggedInUser');
          if (loggedInUser) {
            setUserInfo(JSON.parse(loggedInUser));
          }

          // Get current authenticated user
          const user = auth.currentUser;
          if (user) {
            // Fetch profile data from Firestore
            const profileDoc = await getDoc(doc(db, 'userProfileData', user.uid));
            if (profileDoc.exists()) {
              setProfileData(profileDoc.data());
            } else {
              console.log('No profile data found');
              toast.info('Please complete your profile first');
              navigate('/complete-profile');
              return;
            }
          }
        } catch (error) {
          console.error('Error fetching profile data:', error);
          toast.error('Failed to load profile data');
        } finally {
          setLoading(false);
        }
      };

      fetchProfileData();
    }, [navigate]);
  
    const renderTabContent = () => {
      if (loading) {
        return (
          <div className="p-6 text-center">
            <div className="animate-pulse">Loading...</div>
          </div>
        );
      }

      switch (activeTab) {
        case 'Personal':
          return (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">Personal Information</h2>
                  <p className="text-sm text-gray-500">Manage your basic profile information</p>
                </div>
                {!isEditing ? (
                  <button 
                    onClick={handleEdit}
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button 
                      onClick={handleCancel}
                      className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleSave}
                      disabled={saving}
                      className="px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded-md disabled:opacity-50"
                    >
                      {saving ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                )}
              </div>
  
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editFormData.firstName || ''}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  ) : (
                    <div className="text-gray-900">{profileData?.personalInfo?.firstName || 'Not provided'}</div>
                  )}
                </div>
  
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editFormData.lastName || ''}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  ) : (
                    <div className="text-gray-900">{profileData?.personalInfo?.lastName || 'Not provided'}</div>
                  )}
                </div>
  
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded border">
                    {userInfo?.email || 'Cannot be changed'}
                  </div>
                </div>
  
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={editFormData.dateOfBirth || ''}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  ) : (
                    <div className="text-gray-900">{profileData?.personalInfo?.dateOfBirth || 'Not provided'}</div>
                  )}
                </div>
  
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="text-gray-900">{userInfo?.phone || 'Not provided'}</div>
                </div>
  
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editFormData.country || ''}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  ) : (
                    <div className="text-gray-900">{profileData?.familyBackground?.country || 'Not provided'}</div>
                  )}
                </div>
  
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editFormData.city || ''}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  ) : (
                    <div className="text-gray-900">{profileData?.familyBackground?.city || 'Not provided'}</div>
                  )}
                </div>
  
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    About Yourself
                  </label>
                  {isEditing ? (
                    <textarea
                      value={editFormData.aboutMe || ''}
                      onChange={(e) => handleInputChange('aboutMe', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  ) : (
                    <div className="text-gray-900">{profileData?.personalInfo?.aboutMe || 'Not provided'}</div>
                  )}
                </div>
  
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Marital Status
                  </label>
                  {isEditing ? (
                    <select
                      value={editFormData.maritalStatus || ''}
                      onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="">Select status</option>
                      <option value="Never Married">Never Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                    </select>
                  ) : (
                    <div className="text-gray-900">{profileData?.familyBackground?.maritalStatus || 'Not provided'}</div>
                  )}
                </div>
  
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  {isEditing ? (
                    <select
                      value={editFormData.gender || ''}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  ) : (
                    <div className="text-gray-900">{profileData?.personalInfo?.gender || 'Not provided'}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Religious Practice
                  </label>
                  <div className="text-gray-900">{profileData?.religiousInfo?.sunniMuslim || 'Not specified'}</div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prayer Frequency
                  </label>
                  <div className="text-gray-900">{profileData?.religiousInfo?.prayerFrequency || 'Not specified'}</div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mother Tongue
                  </label>
                  <div className="text-gray-900">{profileData?.familyBackground?.motherTongue || 'Not provided'}</div>
                </div>
              </div>
            </div>
          );
  
        case 'Preferences':
          return (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">Partner Preferences</h2>
                  <p className="text-sm text-gray-500">Set your preferences for potential matches</p>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50">
                  <Edit3 className="w-4 h-4" />
                  <span>Edit</span>
                </button>
              </div>
  
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expectations
                  </label>
                  <div className="text-gray-900">{profileData?.personalInfo?.expectations || 'Not specified'}</div>
                </div>
  
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Marital Status Preference
                  </label>
                  <div className="text-gray-900">{profileData?.familyBackground?.maritalStatus || 'Any'}</div>
                </div>
  
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Want Children
                  </label>
                  <div className="text-gray-900">{profileData?.familyBackground?.wantChildren || 'Not specified'}</div>
                </div>
  
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nationality Preference
                  </label>
                  <div className="text-gray-900">{profileData?.familyBackground?.nationality || 'Any'}</div>
                </div>
  
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Languages Known
                  </label>
                  <div className="text-gray-900">{profileData?.familyBackground?.languagesKnown || 'Not specified'}</div>
                </div>
  
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Religious Practice
                  </label>
                  <div className="text-gray-900">{profileData?.religiousInfo?.prayerFrequency || 'Not specified'}</div>
                </div>
              </div>
            </div>
          );
  
        case 'Career':
          return (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">Career Information</h2>
                  <p className="text-sm text-gray-500">Your professional background and career details</p>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50">
                  <Edit3 className="w-4 h-4" />
                  <span>Edit</span>
                </button>
              </div>
  
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Education Level
                  </label>
                  <div className="text-gray-900">{profileData?.careerEducation?.education || 'Not provided'}</div>
                </div>
  
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profession
                  </label>
                  <div className="text-gray-900">{profileData?.careerEducation?.occupation || 'Not provided'}</div>
                </div>
  
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Annual Income Range
                  </label>
                  <div className="text-gray-900">{profileData?.careerEducation?.income || 'Not provided'}</div>
                </div>
  
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employment Status
                  </label>
                  <div className="text-gray-900">{profileData?.careerEducation?.employmentStatus || 'Not provided'}</div>
                </div>
              </div>
            </div>
          );
  
        case 'Privacy':
          return (
            <div className="p-6">
              <div className="flex items-center mb-6">
                <div className="w-6 h-6 mr-3 flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-red-500 rounded"></div>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">Privacy Settings</h2>
                  <p className="text-sm text-gray-500">Control who can see your information and how you appear to others</p>
                </div>
              </div>
  
              <div className="space-y-6">
                <div className="flex items-center justify-between py-4">
                  <div>
                    <h3 className="text-base font-medium text-gray-900">Show Last Seen</h3>
                    <p className="text-sm text-gray-500">Let others see when you were last active</p>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="sr-only"
                      id="lastSeen"
                    />
                    <label
                      htmlFor="lastSeen"
                      className="flex items-center cursor-pointer"
                    >
                      <div className="w-12 h-6 bg-gray-200 rounded-full relative transition-colors duration-200">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform duration-200 shadow-sm"></div>
                      </div>
                    </label>
                  </div>
                </div>
  
                <div className="flex items-center justify-between py-4">
                  <div>
                    <h3 className="text-base font-medium text-gray-900">Show Online Status</h3>
                    <p className="text-sm text-gray-500">Display when you're currently online</p>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="sr-only"
                      id="onlineStatus"
                    />
                    <label
                      htmlFor="onlineStatus"
                      className="flex items-center cursor-pointer"
                    >
                      <div className="w-12 h-6 bg-gray-200 rounded-full relative transition-colors duration-200">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform duration-200 shadow-sm"></div>
                      </div>
                    </label>
                  </div>
                </div>
  
                <div className="py-4">
                  <h3 className="text-base font-medium text-gray-900 mb-3">Profile Visibility</h3>
                  <div className="relative" onClick={(e) => e.stopPropagation()}>
                    <button 
                      onClick={() => setShowVisibilityDropdown(!showVisibilityDropdown)}
                      className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      <div className="flex items-center">
                        <Eye className="w-5 h-5 mr-3 text-gray-400" />
                        <span className="text-gray-900">{selectedVisibility}</span>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showVisibilityDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {showVisibilityDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                        <div 
                          onClick={() => {
                            setSelectedVisibility('Public - Visible to all users');
                            setShowVisibilityDropdown(false);
                          }}
                          className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer"
                        >
                          <Check className={`w-4 h-4 mr-3 ${selectedVisibility === 'Public - Visible to all users' ? 'text-red-500' : 'text-transparent'}`} />
                          <Eye className="w-5 h-5 mr-3 text-gray-400" />
                          <span className="text-gray-900">Public - Visible to all users</span>
                        </div>
                        <div 
                          onClick={() => {
                            setSelectedVisibility('Private - Only visible to matched users');
                            setShowVisibilityDropdown(false);
                          }}
                          className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer border-t border-gray-100"
                        >
                          <Check className={`w-4 h-4 mr-3 ${selectedVisibility === 'Private - Only visible to matched users' ? 'text-red-500' : 'text-transparent'}`} />
                          <Eye className="w-5 h-5 mr-3 text-gray-400" />
                          <span className="text-gray-900">Private - Only visible to matched users</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
  
                <div className="pt-4">
                  <button className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                    <Save className="w-4 h-4" />
                    <span>Save Privacy Settings</span>
                  </button>
                </div>
              </div>
            </div>
          );
  
        default:
          return null;
      }
    };

    const handleEdit = () => {
      setEditFormData({
        firstName: profileData?.personalInfo?.firstName || '',
        lastName: profileData?.personalInfo?.lastName || '',
        dateOfBirth: profileData?.personalInfo?.dateOfBirth || '',
        gender: profileData?.personalInfo?.gender || '',
        aboutMe: profileData?.personalInfo?.aboutMe || '',
        expectations: profileData?.personalInfo?.expectations || '',
        healthConditions: profileData?.personalInfo?.healthConditions || '',
        country: profileData?.familyBackground?.country || '',
        city: profileData?.familyBackground?.city || '',
        maritalStatus: profileData?.familyBackground?.maritalStatus || ''
      });
      setIsEditing(true);
    };

    const handleCancel = () => {
      setIsEditing(false);
      setEditFormData({});
    };

    const handleSave = async () => {
      setSaving(true);
      try {
        const user = auth.currentUser;
        if (!user) {
          toast.error('No authenticated user found.');
          return;
        }

        const updatedProfileData = {
          ...profileData,
          personalInfo: {
            ...profileData.personalInfo,
            firstName: editFormData.firstName,
            lastName: editFormData.lastName,
            dateOfBirth: editFormData.dateOfBirth,
            gender: editFormData.gender,
            aboutMe: editFormData.aboutMe,
            expectations: editFormData.expectations,
            healthConditions: editFormData.healthConditions
          },
          familyBackground: {
            ...profileData.familyBackground,
            country: editFormData.country,
            city: editFormData.city,
            maritalStatus: editFormData.maritalStatus
          }
        };

        await updateDoc(doc(db, 'userProfileData', user.uid), updatedProfileData);
        setProfileData(updatedProfileData);
        setIsEditing(false);
        setEditFormData({});
        toast.success('Profile updated successfully!');
      } catch (error) {
        console.error('Error updating profile:', error);
        toast.error('Failed to update profile');
      } finally {
        setSaving(false);
      }
    };

    const handleInputChange = (field, value) => {
      setEditFormData(prev => ({
        ...prev,
        [field]: value
      }));
    };
  
    return (
    <>
      <Header />
      <div 
      className="min-h-screen bg-gray-50 py-8 px-4"
      onClick={() => setShowVisibilityDropdown(false)}
    >
      <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header Card */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        {loading ? (
          <div className="animate-pulse">
            <div className="flex items-start space-x-6">
              <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
              <div className="flex-grow">
                <div className="h-6 bg-gray-300 rounded mb-2 w-48"></div>
                <div className="h-4 bg-gray-300 rounded mb-3 w-32"></div>
                <div className="h-4 bg-gray-300 rounded w-64"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-start space-x-6">
            {/* Profile Image */}
            <div className="w-24 h-24 bg-black rounded-full flex-shrink-0 relative overflow-hidden">
              <div className="absolute inset-0 bg-black">
                <svg viewBox="0 0 100 100" className="w-full h-full text-white">
                  <path d="M50 10 C35 10 25 25 25 40 C25 50 30 58 38 62 L38 70 C38 80 42 85 50 85 C58 85 62 80 62 70 L62 62 C70 58 75 50 75 40 C75 25 65 10 50 10 Z" fill="currentColor" opacity="0.6"/>
                </svg>
              </div>
            </div>
            
            {/* Profile Info */}
            <div className="flex-grow">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                    {profileData?.personalInfo?.firstName} {profileData?.personalInfo?.lastName || 'User'}
                  </h1>
                  <p className="text-gray-600 mb-3">
                    {profileData?.personalInfo?.dateOfBirth ? 
                      `${new Date().getFullYear() - new Date(profileData?.personalInfo?.dateOfBirth).getFullYear()} years old` : 
                      'Age not provided'
                    }
                  </p>
                  
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-2 text-red-500" />
                    <span>
                      {profileData?.familyBackground?.city && profileData?.familyBackground?.country 
                        ? `${profileData?.familyBackground?.city}, ${profileData?.familyBackground?.country}`
                        : 'Location not provided'
                      }
                    </span>
                  </div>
                </div>
                
                {/* Status Badges */}
                <div className="flex flex-col items-end space-y-2">
                  <div className="flex space-x-2">
                    <span className="px-3 py-1 text-xs border border-red-500 text-red-500 rounded-full">
                      {profileData?.personalInfo?.gender || 'Not specified'}
                    </span>
                    <span className="px-3 py-1 text-xs text-gray-700">
                      {profileData?.familyBackground?.maritalStatus || 'Not specified'}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Additional Info Icons */}
              <div className="flex space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Briefcase className="w-4 h-4 mr-2 text-red-500" />
                  <span>{profileData?.careerEducation?.occupation || 'Not provided'}</span>
                </div>
                <div className="flex items-center">
                  <GraduationCap className="w-4 h-4 mr-2 text-red-500" />
                  <span>{profileData?.careerEducation?.education || 'Not provided'}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="flex border-b">
          {TAB_TYPES.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'text-gray-900 border-b-2 border-red-500 bg-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  </div>
  </>
  );
};

export default Profile;
