import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex items-center justify-center mb-8">
      <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
        Step {currentStep} of {totalSteps}
      </span>
    </div>
  );
};