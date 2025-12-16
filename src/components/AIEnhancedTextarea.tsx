import React from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
  className?: string;
  rows?: number;
}

export default function AIEnhancedTextarea({
  value,
  onChange,
  label,
  placeholder,
  className = '',
  rows = 4,
}: Props) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`w-full px-4 py-3 bg-[#2d3035] border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A3D1FF] focus:border-transparent ${className}`}
      />
    </div>
  );
}