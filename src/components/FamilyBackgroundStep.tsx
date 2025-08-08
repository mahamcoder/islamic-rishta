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
    { value: 'never-married', label: 'Never Married' },
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
    { value: 'afghan', label: 'Afghan' },
    { value: 'albanian', label: 'Albanian' },
    { value: 'algerian', label: 'Algerian' },
    { value: 'azerbaijani', label: 'Azerbaijani' },
    { value: 'bahraini', label: 'Bahraini' },
    { value: 'bangladeshi', label: 'Bangladeshi' },
    { value: 'bruneian', label: 'Bruneian' },
    { value: 'burkinabe', label: 'Burkinabé' },
    { value: 'chadian', label: 'Chadian' },
    { value: 'comorian', label: 'Comorian' },
    { value: 'djiboutian', label: 'Djiboutian' },
    { value: 'egyptian', label: 'Egyptian' },
    { value: 'gambian', label: 'Gambian' },
    { value: 'guinean', label: 'Guinean' },
    { value: 'indonesian', label: 'Indonesian' },
    { value: 'iranian', label: 'Iranian' },
    { value: 'iraqi', label: 'Iraqi' },
    { value: 'jordanian', label: 'Jordanian' },
    { value: 'kazakh', label: 'Kazakh' },
    { value: 'kuwaiti', label: 'Kuwaiti' },
    { value: 'kyrgyz', label: 'Kyrgyz' },
    { value: 'lebanese', label: 'Lebanese' },
    { value: 'libyan', label: 'Libyan' },
    { value: 'malaysian', label: 'Malaysian' },
    { value: 'maldivian', label: 'Maldivian' },
    { value: 'malian', label: 'Malian' },
    { value: 'mauritanian', label: 'Mauritanian' },
    { value: 'moroccan', label: 'Moroccan' },
    { value: 'nigerien', label: 'Nigerien' },
    { value: 'omani', label: 'Omani' },
    { value: 'pakistani', label: 'Pakistani' },
    { value: 'palestinian', label: 'Palestinian' },
    { value: 'qatari', label: 'Qatari' },
    { value: 'saudi', label: 'Saudi' },
    { value: 'senegalese', label: 'Senegalese' },
    { value: 'sierra-leonean', label: 'Sierra Leonean' },
    { value: 'somali', label: 'Somali' },
    { value: 'sudanese', label: 'Sudanese' },
    { value: 'syrian', label: 'Syrian' },
    { value: 'tajik', label: 'Tajik' },
    { value: 'tunisian', label: 'Tunisian' },
    { value: 'turkish', label: 'Turkish' },
    { value: 'turkmen', label: 'Turkmen' },
    { value: 'emirati', label: 'Emirati' },
    { value: 'uzbek', label: 'Uzbek' },
    { value: 'sahrawi', label: 'Sahrawi' },
    { value: 'yemeni', label: 'Yemeni' },
    { value: 'american', label: 'American' },
    { value: 'british', label: 'British' },
    { value: 'canadian', label: 'Canadian' },
    { value: 'australian', label: 'Australian' },
    { value: 'french', label: 'French' },
    { value: 'german', label: 'German' },
    { value: 'italian', label: 'Italian' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'japanese', label: 'Japanese' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'russian', label: 'Russian' },
    { value: 'brazilian', label: 'Brazilian' },
    { value: 'south-african', label: 'South African' },
    { value: 'south-korean', label: 'South Korean' },
    { value: 'new-zealander', label: 'New Zealander' }
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
      { value: 'albania', label: 'Albania' },
      { value: 'algeria', label: 'Algeria' },
      { value: 'azerbaijan', label: 'Azerbaijan' },
      { value: 'bahrain', label: 'Bahrain' },
      { value: 'bangladesh', label: 'Bangladesh' },
      { value: 'brunei', label: 'Brunei' },
      { value: 'burkina-faso', label: 'Burkina Faso' },
      { value: 'chad', label: 'Chad' },
      { value: 'comoros', label: 'Comoros' },
      { value: 'djibouti', label: 'Djibouti' },
      { value: 'egypt', label: 'Egypt' },
      { value: 'gambia', label: 'Gambia' },
      { value: 'guinea', label: 'Guinea' },
      { value: 'indonesia', label: 'Indonesia' },
      { value: 'iran', label: 'Iran' },
      { value: 'iraq', label: 'Iraq' },
      { value: 'jordan', label: 'Jordan' },
      { value: 'kazakhstan', label: 'Kazakhstan' },
      { value: 'kuwait', label: 'Kuwait' },
      { value: 'kyrgyzstan', label: 'Kyrgyzstan' },
      { value: 'lebanon', label: 'Lebanon' },
      { value: 'libya', label: 'Libya' },
      { value: 'malaysia', label: 'Malaysia' },
      { value: 'maldives', label: 'Maldives' },
      { value: 'mali', label: 'Mali' },
      { value: 'mauritania', label: 'Mauritania' },
      { value: 'morocco', label: 'Morocco' },
      { value: 'niger', label: 'Niger' },
      { value: 'oman', label: 'Oman' },
      { value: 'pakistan', label: 'Pakistan' },
      { value: 'palestine', label: 'Palestine' },
      { value: 'qatar', label: 'Qatar' },
      { value: 'saudi-arabia', label: 'Saudi Arabia' },
      { value: 'senegal', label: 'Senegal' },
      { value: 'sierra-leone', label: 'Sierra Leone' },
      { value: 'somalia', label: 'Somalia' },
      { value: 'sudan', label: 'Sudan' },
      { value: 'syria', label: 'Syria' },
      { value: 'tajikistan', label: 'Tajikistan' },
      { value: 'tunisia', label: 'Tunisia' },
      { value: 'turkey', label: 'Turkey' },
      { value: 'turkmenistan', label: 'Turkmenistan' },
      { value: 'united-arab-emirates', label: 'United Arab Emirates' },
      { value: 'uzbekistan', label: 'Uzbekistan' },
      { value: 'western-sahara', label: 'Western Sahara' },
      { value: 'yemen', label: 'Yemen' },
      { value: 'united-states', label: 'United States' },
      { value: 'united-kingdom', label: 'United Kingdom' },
      { value: 'canada', label: 'Canada' },
      { value: 'australia', label: 'Australia' },
      { value: 'france', label: 'France' },
      { value: 'germany', label: 'Germany' },
      { value: 'italy', label: 'Italy' },
      { value: 'spain', label: 'Spain' },
      { value: 'japan', label: 'Japan' },
      { value: 'china', label: 'China' },
      { value: 'russia', label: 'Russia' },
      { value: 'brazil', label: 'Brazil' },
      { value: 'south-africa', label: 'South Africa' },
      { value: 'south-korea', label: 'South Korea' },
      { value: 'new-zealand', label: 'New Zealand' }
    
    
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