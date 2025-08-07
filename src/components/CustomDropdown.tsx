import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  options: Option[];
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  className?: string;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  placeholder,
  onChange,
  className = '',
  isOpen = false,
  onToggle,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  
  const actualIsOpen = onToggle ? isOpen : internalIsOpen;
  const setActualIsOpen = onToggle ? onToggle : setInternalIsOpen;
  
  const selectedOption = options.find(option => option.value === value);
  
  useEffect(() => {
    if (onToggle && !isOpen) {
      setInternalIsOpen(false);
    }
  }, [isOpen, onToggle]);
  
  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setActualIsOpen(!actualIsOpen)}
        className="w-full p-3 text-left bg-gray-50 border border-gray-200 rounded-lg hover:border-gray-300 focus:outline-none focus:border-red-300 focus:ring-1 focus:ring-red-200 transition-colors flex items-center justify-between"
      >
        <span className={selectedOption ? 'text-gray-900' : 'text-gray-500'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown 
          size={16} 
          className={`text-gray-400 transition-transform ${actualIsOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      
      {actualIsOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setActualIsOpen(false);
              }}
              className="w-full p-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};