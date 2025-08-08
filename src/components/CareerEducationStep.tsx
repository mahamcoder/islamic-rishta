import React, { useState } from 'react';
import { Briefcase } from 'lucide-react';
import { FormField } from './FormField';
import { CustomDropdown } from './CustomDropdown';

interface CareerEducationData {
  education: string;
  occupation: string;
  income: string;
  employmentStatus: string;
}

interface CareerEducationStepProps {
  data: CareerEducationData;
  onChange: (data: Partial<CareerEducationData>) => void;
}

export const CareerEducationStep: React.FC<CareerEducationStepProps> = ({ data, onChange }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  const educationOptions = [
    { value: 'high-school', label: 'High School' },
    { value: 'bachelors', label: "Bachelor's Degree" },
    { value: 'masters', label: "Master's Degree" },
    { value: 'phd', label: 'PhD' },
    { value: 'diploma', label: 'Diploma' },
    { value: 'other', label: 'Other' }
  ];
  const occupationOptions = [
    { value: 'engineer', label: 'Engineer' },
    { value: 'doctor', label: 'Doctor' },
    { value: 'teacher', label: 'Teacher' },
    { value: 'business', label: 'Business Professional' },
    { value: 'student', label: 'Student' },
    { value: 'other', label: 'Other' },
  ];

  const incomeOptions = [
    { value: 'under-30k', label: 'Under $30,000' },
    { value: '30k-50k', label: '$30,000 - $50,000' },
    { value: '50k-75k', label: '$50,000 - $75,000' },
    { value: '75k-100k', label: '$75,000 - $100,000' },
    { value: 'over-100k', label: 'Over $100,000' },
  ];

  const employmentOptions = [
    { value: 'employed', label: 'Employed' },
    { value: 'self-employed', label: 'Self Employed' },
    { value: 'student', label: 'Student' },
    { value: 'unemployed', label: 'Unemployed' },
  ];

  const handleDropdownToggle = (dropdownId: string, isOpen: boolean) => {
    setOpenDropdown(isOpen ? dropdownId : null);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <Briefcase className="text-red-600" size={24} />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Career & Education</h2>
          <p className="text-gray-600">Share your professional and educational background</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Education Level" required>
          <CustomDropdown
            options={educationOptions}
            value={data.education}
            placeholder="Select Education Level"
            onChange={(value) => onChange({ education: value })}
            isOpen={openDropdown === 'education'}
            onToggle={(isOpen) => handleDropdownToggle('education', isOpen)}
          />
        </FormField>

        <FormField label="Occupation" required>
          <CustomDropdown
            options={occupationOptions}
            value={data.occupation}
            placeholder="Select Occupation"
            onChange={(value) => onChange({ occupation: value })}
            isOpen={openDropdown === 'occupation'}
            onToggle={(isOpen) => handleDropdownToggle('occupation', isOpen)}
          />
        </FormField>

        <FormField label="Annual Income" required>
          <CustomDropdown
            options={incomeOptions}
            value={data.income}
            placeholder="Select Income Range"
            onChange={(value) => onChange({ income: value })}
            isOpen={openDropdown === 'income'}
            onToggle={(isOpen) => handleDropdownToggle('income', isOpen)}
          />
        </FormField>

        <FormField label="Employment Status" required>
          <CustomDropdown
            options={employmentOptions}
            value={data.employmentStatus}
            placeholder="Select Employment Status"
            onChange={(value) => onChange({ employmentStatus: value })}
            isOpen={openDropdown === 'employment'}
            onToggle={(isOpen) => handleDropdownToggle('employment', isOpen)}
          />
        </FormField>
      </div>
    </div>
  );
};