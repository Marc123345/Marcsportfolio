import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X } from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
}

interface PortfolioFilterProps {
  options: FilterOption[];
  activeFilter: string;
  onChange: (filterId: string) => void;
  className?: string;
}

export default function PortfolioFilter({
  options,
  activeFilter,
  onChange,
  className = ''
}: PortfolioFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const activeOption = options.find(option => option.id === activeFilter);
  
  return (
    <div className={`relative ${className}`}>
      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex items-center gap-2 px-4 py-2 bg-[#1b1b1b] text-white rounded-lg border border-white/10 hover:border-[#A3D1FF] transition-colors"
        aria-expanded={isOpen}
        aria-controls="filter-dropdown"
      >
        {isOpen ? <X className="w-4 h-4" /> : <Filter className="w-4 h-4" />}
        <span>{activeOption?.label || 'Filter'}</span>
      </button>
      
      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="filter-dropdown"
            className="absolute top-full left-0 right-0 mt-2 bg-[#1b1b1b] rounded-lg border border-white/10 shadow-lg overflow-hidden z-50 md:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-2">
              {options.map(option => (
                <button
                  key={option.id}
                  onClick={() => {
                    onChange(option.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeFilter === option.id
                      ? 'bg-[#A3D1FF] text-black'
                      : 'text-gray-300 hover:bg-white/5'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Desktop Filter Buttons */}
      <div className="hidden md:flex flex-wrap gap-2">
        {options.map(option => (
          <button
            key={option.id}
            onClick={() => onChange(option.id)}
            className={`px-6 py-2 rounded-full transition-all duration-300 ${
              activeFilter === option.id
                ? 'bg-[#A3D1FF] text-black'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}