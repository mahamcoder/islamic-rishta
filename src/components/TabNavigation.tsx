import React from 'react';
import { User, Heart, Home, Briefcase } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface TabNavigationProps {
  currentStep: number;
  onTabClick: (step: number) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ currentStep, onTabClick }) => {
  const tabs: Tab[] = [
    { id: 'personal', label: 'Personal Info', icon: <User size={16} /> },
    { id: 'religious', label: 'Religious Info', icon: <Heart size={16} /> },
    { id: 'family', label: 'Family & Background', icon: <Home size={16} /> },
    { id: 'career', label: 'Career & Education', icon: <Briefcase size={16} /> },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {tabs.map((tab, index) => {
        const stepIndex = index + 1;
        const isActive = currentStep === stepIndex;
        const isCompleted = currentStep > stepIndex;
        
        return (
          <button
            key={tab.id}
            onClick={() => onTabClick(stepIndex)}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-all duration-200 ${
              isActive
                ? 'bg-white text-red-600 border-red-200 shadow-sm'
                : isCompleted
                ? 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                : 'bg-gray-50 text-gray-400 border-gray-200'
            }`}
            disabled={stepIndex > currentStep + 1}
          >
            {tab.icon}
            <span className="text-sm font-medium">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};