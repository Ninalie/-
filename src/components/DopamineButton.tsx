import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface DopamineButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const DopamineButton: React.FC<DopamineButtonProps> = ({ 
  children, 
  onClick, 
  className = '',
  size = 'md'
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05, rotate: -2 }}
      whileTap={{ scale: 0.95, rotate: 2 }}
      onClick={onClick}
      className={cn(
        "bg-max-magenta text-white font-heading uppercase tracking-widest border-4 border-black shadow-hard hover:shadow-hard-hover transition-all",
        size === 'sm' ? "px-4 py-2 text-sm" : 
        size === 'md' ? "px-8 py-4 text-xl" : 
        "px-12 py-6 text-3xl",
        className
      )}
    >
      {children}
    </motion.button>
  );
};
