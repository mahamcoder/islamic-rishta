import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { StepIndicator } from './StepIndicator';
import { ProgressBar } from './ProgressBar';
import { TabNavigation } from './TabNavigation';
import { PersonalInfoStep } from './PersonalInfoStep';
import { ReligiousInfoStep } from './ReligiousInfoStep';
import { FamilyBackgroundStep } from './FamilyBackgroundStep';
import { CareerEducationStep } from './CareerEducationStep';
import { auth, db } from '../firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface FormData {
  personalInfo: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    aboutMe: string;
    expectations: string;
    healthConditions: string;
  };
  religiousInfo: {
    sunniMuslim: string;
    revertMuslim: string;
    prayerFrequency: string;
    quranReading: string;
    hijab: string;
    beard: string;
  };
  familyBackground: {
    maritalStatus: string;
    children: string;
    wantChildren: string;
    nationality: string;
    motherTongue: string;
    languagesKnown: string;
    country: string;
    city: string;
  };
  careerEducation: {
    education: string;
    occupation: string;
    income: string;
    employmentStatus: string;
  };
}

export const ProfileCompletion: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      aboutMe: '',
      expectations: '',
      healthConditions: '',
    },
    religiousInfo: {
      sunniMuslim: '',
      revertMuslim: '',
      prayerFrequency: '',
      quranReading: '',
      hijab: '',
      beard: '',
    },
    familyBackground: {
      maritalStatus: '',
      children: '',
      wantChildren: '',
      nationality: '',
      motherTongue: '',
      languagesKnown: '',
      country: '',
      city: '',
    },
    careerEducation: {
      education: '',
      occupation: '',
      income: '',
      employmentStatus: '',
    },
  });

  const updateFormData = (section: keyof FormData, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  // Validation functions for each step
  const validatePersonalInfo = (data: FormData['personalInfo']) => {
    return (
      data.firstName &&
      data.lastName &&
      data.dateOfBirth &&
      data.gender &&
      data.aboutMe &&
      data.expectations &&
      data.healthConditions
    );
  };
  const validateReligiousInfo = (data: FormData['religiousInfo']) => {
    return (
      data.sunniMuslim &&
      data.revertMuslim &&
      data.prayerFrequency &&
      data.quranReading &&
      data.hijab &&
      data.beard
    );
  };
  const validateFamilyBackground = (data: FormData['familyBackground']) => {
    return (
      data.maritalStatus &&
      data.children &&
      data.wantChildren &&
      data.nationality &&
      data.motherTongue &&
      data.country &&
      data.city
    );
  };
  const validateCareerEducation = (data: FormData['careerEducation']) => {
    return (
      data.education &&
      data.occupation &&
      data.income &&
      data.employmentStatus
    );
  };

  const handleNext = () => {
    if (currentStep === 1 && !validatePersonalInfo(formData.personalInfo)) {
      toast.error('Please complete all required fields in Personal Info.');
      return;
    }
    if (currentStep === 2 && !validateReligiousInfo(formData.religiousInfo)) {
      toast.error('Please complete all required fields in Religious Info.');
      return;
    }
    if (currentStep === 3 && !validateFamilyBackground(formData.familyBackground)) {
      toast.error('Please complete all required fields in Family & Background.');
      return;
    }
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCompleteProfile = async () => {
    if (!validatePersonalInfo(formData.personalInfo)) {
      toast.error('Please complete all required fields in Personal Info.');
      setCurrentStep(1);
      return;
    }
    if (!validateReligiousInfo(formData.religiousInfo)) {
      toast.error('Please complete all required fields in Religious Info.');
      setCurrentStep(2);
      return;
    }
    if (!validateFamilyBackground(formData.familyBackground)) {
      toast.error('Please complete all required fields in Family & Background.');
      setCurrentStep(3);
      return;
    }
    if (!validateCareerEducation(formData.careerEducation)) {
      toast.error('Please complete all required fields in Career & Education.');
      setCurrentStep(4);
      return;
    }
    const user = auth.currentUser;
    if (!user) {
      toast.error('No authenticated user found.');
      return;
    }
    try {
      // Save detailed profile data to Firestore
      await setDoc(doc(db, 'userProfileData', user.uid), {
        ...formData,
        profileCompleted: true,
        profileCompletedAt: new Date().toISOString()
      });
      
      toast.success('Profile saved successfully!');
      setTimeout(() => navigate('/dashboard'), 1200);
    } catch (error: any) {
      toast.error('Failed to save profile: ' + error.message);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            data={formData.personalInfo}
            onChange={(data) => updateFormData('personalInfo', data)}
          />
        );
      case 2:
        return (
          <ReligiousInfoStep
            data={formData.religiousInfo}
            onChange={(data) => updateFormData('religiousInfo', data)}
          />
        );
      case 3:
        return (
          <FamilyBackgroundStep
            data={formData.familyBackground}
            onChange={(data) => updateFormData('familyBackground', data)}
          />
        );
      case 4:
        return (
          <CareerEducationStep
            data={formData.careerEducation}
            onChange={(data) => updateFormData('careerEducation', data)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">
          Complete Your Profile
        </h1>
        
        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        
        <TabNavigation
          currentStep={currentStep}
          onTabClick={setCurrentStep}
        />

        {renderCurrentStep()}

        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <ChevronLeft size={16} />
            Previous
          </button>

          <button
            onClick={currentStep === totalSteps ? handleCompleteProfile : handleNext}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              currentStep === totalSteps
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
          >
            {currentStep === totalSteps ? 'Complete Profile' : 'Next'}
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};