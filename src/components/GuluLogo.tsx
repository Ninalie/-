import React from 'react';

export const GuluLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    {/* Chubby Body */}
    <ellipse cx="50" cy="60" rx="42" ry="36" />
    {/* Horns */}
    <path d="M32 32 L22 8 Q35 12 40 30 Z" />
    <path d="M68 32 L78 8 Q65 12 60 30 Z" />
    {/* Eyes */}
    <circle cx="38" cy="52" r="6" fill="white" />
    <circle cx="62" cy="52" r="6" fill="white" />
    <circle cx="38" cy="52" r="2.5" fill="black" />
    <circle cx="62" cy="52" r="2.5" fill="black" />
    {/* Blush */}
    <circle cx="25" cy="62" r="4" fill="white" opacity="0.2" />
    <circle cx="75" cy="62" r="4" fill="white" opacity="0.2" />
    {/* Belly highlight */}
    <path d="M28 72 Q50 88 72 72" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
  </svg>
);
