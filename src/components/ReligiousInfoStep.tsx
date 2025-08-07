import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { FormField } from './FormField';
import { CustomDropdown } from './CustomDropdown';

interface ReligiousInfoData {
  sunniMuslim: string;
  revertMuslim: string;
  prayerFrequency: string;
  quranReading: string;
  hijab: string;
  beard: string;
}

interface ReligiousInfoStepProps {
  data: ReligiousInfoData;
  onChange: (data: Partial<ReligiousInfoData>) => void;
}

export const ReligiousInfoStep: React.FC<ReligiousInfoStepProps> = ({ data, onChange }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  const sunniOptions = [
    { value: 'yes-sunni', label: 'Yes I am Sunni' },
  ];

  const revertOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
  ];

  const prayerOptions = [
    { value: 'always', label: 'Always' },
    { value: 'often', label: 'Often' },
    { value: 'sometimes', label: 'Sometimes' },
    { value: 'never', label: 'Never' },
  ];

  const quranOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'occasionally', label: 'Occasionally' },
    { value: 'never', label: 'Never' },
  ];

  const hijabOptions = [
    { value: 'niqab', label: 'Niqab' },
    { value: 'hijab', label: 'Hijab' },
    { value: 'none', label: 'None' },
  ];

  const beardOptions = [
    { value: 'full-beard', label: 'Full Beard' },
    { value: 'trimmed', label: 'Trimmed' },
    { value: 'mustache-only', label: 'Mustache Only' },
    { value: 'clean-shaven', label: 'Clean Shaven' },
  ];

  const handleDropdownToggle = (dropdownId: string, isOpen: boolean) => {
    setOpenDropdown(isOpen ? dropdownId : null);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <Heart className="text-red-600" size={24} />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Religious Info</h2>
          <p className="text-gray-600">Share your religious preferences and practices</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Are you a Sunni Muslim?" required>
          <CustomDropdown
            options={sunniOptions}
            value={data.sunniMuslim}
            placeholder="Select An Option"
            onChange={(value) => onChange({ sunniMuslim: value })}
            isOpen={openDropdown === 'sunni'}
            onToggle={(isOpen) => handleDropdownToggle('sunni', isOpen)}
          />
        </FormField>

        <FormField label="Are You a Revert Muslim?" required>
          <CustomDropdown
            options={revertOptions}
            value={data.revertMuslim}
            placeholder="Are You a Revert Muslim?"
            onChange={(value) => onChange({ revertMuslim: value })}
            isOpen={openDropdown === 'revert'}
            onToggle={(isOpen) => handleDropdownToggle('revert', isOpen)}
          />
        </FormField>

        <FormField label="Prayer Frequency" required>
          <CustomDropdown
            options={prayerOptions}
            value={data.prayerFrequency}
            placeholder="Prayer Frequency"
            onChange={(value) => onChange({ prayerFrequency: value })}
            isOpen={openDropdown === 'prayer'}
            onToggle={(isOpen) => handleDropdownToggle('prayer', isOpen)}
          />
        </FormField>

        <FormField label="Quran Reading" required>
          <CustomDropdown
            options={quranOptions}
            value={data.quranReading}
            placeholder="Quran Reading"
            onChange={(value) => onChange({ quranReading: value })}
            isOpen={openDropdown === 'quran'}
            onToggle={(isOpen) => handleDropdownToggle('quran', isOpen)}
          />
        </FormField>

        <FormField label="Hijab" required>
          <CustomDropdown
            options={hijabOptions}
            value={data.hijab}
            placeholder="Hijab Preference"
            onChange={(value) => onChange({ hijab: value })}
            isOpen={openDropdown === 'hijab'}
            onToggle={(isOpen) => handleDropdownToggle('hijab', isOpen)}
          />
        </FormField>

        <FormField label="Beard" required>
          <CustomDropdown
            options={beardOptions}
            value={data.beard}
            placeholder="Beard Preference"
            onChange={(value) => onChange({ beard: value })}
            isOpen={openDropdown === 'beard'}
            onToggle={(isOpen) => handleDropdownToggle('beard', isOpen)}
          />
        </FormField>
      </div>
    </div>
  );
};