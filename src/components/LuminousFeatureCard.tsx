// src/components/LuminousFeatureCard.tsx

import React from 'react';
import { motion, MotionProps } from 'framer-motion';

// --- Types ---
interface LuminousFeatureCardProps {
  title: string;
  description: string;
  ctaText: string;
  onCtaClick: () => void;
  // Allows overriding the wrapper element for semantic HTML (e.g., 'div' or 'article')
  as?: keyof React.JSX.IntrinsicElements; 
}

// Merge Framer Motion props for animation control
type CardProps = LuminousFeatureCardProps & MotionProps;

/**
 * A sharp-edged, high-contrast card with a luminous border for a 'Wow Factor'
 * that focuses user attention on a key conversion action.
 */
export const LuminousFeatureCard: React.FC<CardProps> = ({
  title,
  description,
  ctaText,
  onCtaClick,
  as = 'div',
  ...motionProps
}) => {
  // Use the motion component based on the 'as' prop
  const MotionComponent = motion[as] as React.ElementType;

  return (
    <MotionComponent
      // Framer Motion properties for an engaging hover effect
      whileHover={{ scale: 1.02, rotateX: 1.5, rotateY: -1.5, boxShadow: '0 10px 30px rgba(163, 209, 255, 0.15)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      
      // Tailwind Classes for the outer container and glow effect
      className="
        relative w-full max-w-sm p-px 
        shadow-glow-lg 
        transform-gpu perspective-[1000px] 
        hover:shadow-primary-lighter 
      "
      style={{
        // Custom CSS for the sharp, glowing border effect
        backgroundImage: 'linear-gradient(45deg, #A3D1FF 0%, transparent 10%, transparent 90%, #A3D1FF 100%)',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        // Important: ensures the effect is strictly sharp (no rounded corners)
        borderRadius: '0px', 
      }}
      {...motionProps}
    >
      {/* Inner Content Container - the dark background */}
      <div className="
        h-full w-full 
        p-8 
        bg-dark-lighter 
        flex flex-col justify-between 
        space-y-6 
        border border-transparent 
        shadow-inner 
      ">
        {/* Content */}
        <div className="space-y-4">
          <h3 className="text-3xl font-asen text-primary border-b border-primary/20 pb-2">
            {title}
          </h3>
          <p className="text-gray-custom text-base leading-relaxed">
            {description}
          </p>
        </div>

        {/* CTA Button - Use MagneticButton or a high-contrast standard button */}
        <button
          onClick={onCtaClick}
          className="
            mt-6 w-full py-3 
            bg-primary text-dark 
            text-lg font-bold uppercase 
            transition-all duration-300 
            shadow-glow
            hover:bg-white 
            active:scale-[0.98] 
            focus:outline-none focus:ring-4 focus:ring-primary/50
          "
        >
          {ctaText}
        </button>
      </div>
    </MotionComponent>
  );
};