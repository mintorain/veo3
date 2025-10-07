
import React from 'react';

interface TagSelectorProps {
  title: string;
  options: string[];
  selectedOptions: string[];
  onSelectionChange: (selected: string[]) => void;
}

export const TagSelector: React.FC<TagSelectorProps> = ({ title, options, selectedOptions, onSelectionChange }) => {
  const handleToggle = (option: string) => {
    const newSelection = selectedOptions.includes(option)
      ? selectedOptions.filter(item => item !== option)
      : [...selectedOptions, option];
    onSelectionChange(newSelection);
  };

  return (
    <div>
      <p className="text-sm text-gray-500 mb-2">{title}</p>
      <div className="flex flex-wrap gap-2">
        {options.map(option => (
          <button
            key={option}
            onClick={() => handleToggle(option)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition duration-200 ${
              selectedOptions.includes(option)
                ? 'bg-slate-300 text-slate-900'
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};
