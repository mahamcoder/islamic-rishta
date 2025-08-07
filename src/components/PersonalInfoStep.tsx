import React, { useState } from 'react';
import { User } from 'lucide-react';
import { FormField } from './FormField';
import { CustomDropdown } from './CustomDropdown';

interface PersonalInfoData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  aboutMe: string;
  expectations: string;
  healthConditions: string;
}

interface PersonalInfoStepProps {
  data: PersonalInfoData;
  onChange: (data: Partial<PersonalInfoData>) => void;
}

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ data, onChange }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ];

  const handleDropdownToggle = (dropdownId: string, isOpen: boolean) => {
    setOpenDropdown(isOpen ? dropdownId : null);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <User className="text-red-600" size={24} />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Personal Info</h2>
          <p className="text-gray-600">Tell us about yourself to help us find your perfect match</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="First Name" required>
          <input
            type="text"
            value={data.firstName}
            onChange={(e) => onChange({ firstName: e.target.value })}
            placeholder="Enter First Name"
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg hover:border-gray-300 focus:outline-none focus:border-red-300 focus:ring-1 focus:ring-red-200 transition-colors"
          />
        </FormField>

        <FormField label="Last Name" required>
          <input
            type="text"
            value={data.lastName}
            onChange={(e) => onChange({ lastName: e.target.value })}
            placeholder="Enter Last Name"
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg hover:border-gray-300 focus:outline-none focus:border-red-300 focus:ring-1 focus:ring-red-200 transition-colors"
          />
        </FormField>

        <FormField label="Date of Birth" required>
          <input
            type="date"
            value={data.dateOfBirth}
            onChange={(e) => onChange({ dateOfBirth: e.target.value })}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg hover:border-gray-300 focus:outline-none focus:border-red-300 focus:ring-1 focus:ring-red-200 transition-colors"
          />
        </FormField>

        <FormField label="Gender" required>
          <CustomDropdown
            options={genderOptions}
            value={data.gender}
            placeholder="Select Gender"
            onChange={(value) => onChange({ gender: value })}
            isOpen={openDropdown === 'gender'}
            onToggle={(isOpen) => handleDropdownToggle('gender', isOpen)}
          />
        </FormField>
      </div>

      <FormField label="About Me" required>
        <textarea
          value={data.aboutMe}
          onChange={(e) => onChange({ aboutMe: e.target.value })}
          placeholder="We refrain from allowing detailed descriptions of women or men that may create vivid mental imagery. This is to uphold respect, privacy, and modesty. Thank you for your understanding."
          rows={4}
          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg hover:border-gray-300 focus:outline-none focus:border-red-300 focus:ring-1 focus:ring-red-200 transition-colors resize-none"
        />
      </FormField>

      <FormField label="Expectations" required>
        <textarea
          value={data.expectations}
          onChange={(e) => onChange({ expectations: e.target.value })}
          placeholder="What do you want to find in an ideal partner?"
          rows={4}
          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg hover:border-gray-300 focus:outline-none focus:border-red-300 focus:ring-1 focus:ring-red-200 transition-colors resize-none"
        />
      </FormField>

      <FormField label="Health Conditions" required>
        <textarea
          value={data.healthConditions}
          onChange={(e) => onChange({ healthConditions: e.target.value })}
          placeholder="Can you tell us about your health conditions?"
          rows={4}
          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg hover:border-gray-300 focus:outline-none focus:border-red-300 focus:ring-1 focus:ring-red-200 transition-colors resize-none"
        />
      </FormField>
    </div>
  );
};