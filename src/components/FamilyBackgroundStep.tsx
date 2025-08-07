import React, { useState } from 'react';
import { Home } from 'lucide-react';
import { FormField } from './FormField';
import { CustomDropdown } from './CustomDropdown';

interface FamilyBackgroundData {
  maritalStatus: string;
  children: string;
  wantChildren: string;
  nationality: string;
  motherTongue: string;
  languagesKnown: string;
  country: string;
  city: string;
}

interface FamilyBackgroundStepProps {
  data: FamilyBackgroundData;
  onChange: (data: Partial<FamilyBackgroundData>) => void;
}

export const FamilyBackgroundStep: React.FC<FamilyBackgroundStepProps> = ({ data, onChange }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  const maritalOptions = [
    { value: 'never', label: 'Never' },
    { value: 'divorced', label: 'Divorced' },
    { value: 'widowed', label: 'Widowed' },
    { value: 'other', label: 'Other' },
  ];

  const childrenOptions = [
    { value: 'no', label: 'No' },
    { value: '1', label: '1 Child' },
    { value: '2', label: '2 Childs' },
    { value: '3+', label: '3 Children +' },
  ];

  const wantChildrenOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
    { value: 'maybe', label: 'Maybe' },
  ];

  const nationalityOptions = [
    { value: 'afghanistan', label: 'Afghanistan' },
    { value: 'aland-islands', label: 'Åland Islands' },
    { value: 'albania', label: 'Albania' },
    { value: 'algeria', label: 'Algeria' },
    { value: 'american-samoa', label: 'American Samoa' },
    { value: 'andorra', label: 'Andorra' },
    { value: 'angola', label: 'Angola' },
    { value: 'anguilla', label: 'Anguilla' },
    { value: 'antarctica', label: 'Antarctica' },
    { value: 'antigua-and-barbuda', label: 'Antigua and Barbuda' },
    { value: 'argentina', label: 'Argentina' },
  ];

  const motherTongueOptions = [
    { value: 'english', label: 'English' },
    { value: 'arabic', label: 'Arabic' },
    { value: 'bengali', label: 'Bengali' },
    { value: 'hindi', label: 'Hindi' },
    { value: 'japanese', label: 'Japanese' },
    { value: 'mandarin-chinese', label: 'Mandarin Chinese' },
    { value: 'punjabi', label: 'Punjabi' },
    { value: 'portuguese', label: 'Portuguese' },
    { value: 'russian', label: 'Russian' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'other', label: 'Other' },
  ];

  const countryOptions = [
    { value: 'afghanistan', label: 'Afghanistan' },
    { value: 'aland-islands', label: 'Åland Islands' },
    { value: 'albania', label: 'Albania' },
    { value: 'algeria', label: 'Algeria' },
    { value: 'american-samoa', label: 'American Samoa' },
    { value: 'andorra', label: 'Andorra' },
    { value: 'angola', label: 'Angola' },
    { value: 'anguilla', label: 'Anguilla' },
    { value: 'antarctica', label: 'Antarctica' },
    { value: 'antigua-and-barbuda', label: 'Antigua and Barbuda' },
    { value: 'argentina', label: 'Argentina' },
  ];

  const handleDropdownToggle = (dropdownId: string, isOpen: boolean) => {
    setOpenDropdown(isOpen ? dropdownId : null);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <Home className="text-red-600" size={24} />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Family & Background</h2>
          <p className="text-gray-600">Tell us about your family and background</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Marital Status" required>
          <CustomDropdown
            options={maritalOptions}
            value={data.maritalStatus}
            placeholder="Marital Status"
            onChange={(value) => onChange({ maritalStatus: value })}
            isOpen={openDropdown === 'marital'}
            onToggle={(isOpen) => handleDropdownToggle('marital', isOpen)}
          />
        </FormField>

        <FormField label="Children" required>
          <CustomDropdown
            options={childrenOptions}
            value={data.children}
            placeholder="Do You Have Children?"
            onChange={(value) => onChange({ children: value })}
            isOpen={openDropdown === 'children'}
            onToggle={(isOpen) => handleDropdownToggle('children', isOpen)}
          />
        </FormField>

        <FormField label="Want Children" required>
          <CustomDropdown
            options={wantChildrenOptions}
            value={data.wantChildren}
            placeholder="Want Children?"
            onChange={(value) => onChange({ wantChildren: value })}
            isOpen={openDropdown === 'wantChildren'}
            onToggle={(isOpen) => handleDropdownToggle('wantChildren', isOpen)}
          />
        </FormField>

        <FormField label="Nationality" required>
          <CustomDropdown
            options={nationalityOptions}
            value={data.nationality}
            placeholder="Nationality"
            onChange={(value) => onChange({ nationality: value })}
            isOpen={openDropdown === 'nationality'}
            onToggle={(isOpen) => handleDropdownToggle('nationality', isOpen)}
          />
        </FormField>

        <FormField label="Mother Tongue" required>
          <CustomDropdown
            options={motherTongueOptions}
            value={data.motherTongue}
            placeholder="Mother Tongue"
            onChange={(value) => onChange({ motherTongue: value })}
            isOpen={openDropdown === 'motherTongue'}
            onToggle={(isOpen) => handleDropdownToggle('motherTongue', isOpen)}
          />
        </FormField>

        <FormField label="Languages Known">
          <input
            type="text"
            value={data.languagesKnown}
            onChange={(e) => onChange({ languagesKnown: e.target.value })}
            placeholder="e.g., English, Arabic, Urdu"
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg hover:border-gray-300 focus:outline-none focus:border-red-300 focus:ring-1 focus:ring-red-200 transition-colors"
          />
        </FormField>

        <FormField label="Country" required>
          <CustomDropdown
            options={countryOptions}
            value={data.country}
            placeholder="Country"
            onChange={(value) => onChange({ country: value })}
            isOpen={openDropdown === 'country'}
            onToggle={(isOpen) => handleDropdownToggle('country', isOpen)}
          />
        </FormField>

        <FormField label="City" required>
          <input
            type="text"
            value={data.city}
            onChange={(e) => onChange({ city: e.target.value })}
            placeholder="City"
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg hover:border-gray-300 focus:outline-none focus:border-red-300 focus:ring-1 focus:ring-red-200 transition-colors"
          />
        </FormField>
      </div>
    </div>
  );
};