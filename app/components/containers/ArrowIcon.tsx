'use client';

import React from 'react';

interface ArrowIconProps {
  className?: string;
  size?: number;
}

export default function ArrowIcon({ className = '', size = 16 }: ArrowIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M7 17L17 7M17 7H7M17 7V17" />
    </svg>
  );
}
