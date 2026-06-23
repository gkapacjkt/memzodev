import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className = "", size = 24 }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {/* Elegant Leaf/Clover Icon resembling the logo in the mockup */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className="text-white shrink-0 transition-transform duration-500 hover:rotate-45"
      >
        {/* Modern 4-petal minimal leaf emblem */}
        <path d="M12 2C12 7.5 16.5 12 22 12C16.5 12 12 16.5 12 22C12 16.5 7.5 12 2 12C7.5 12 12 7.5 12 2Z" />
      </svg>
      
      <span className="font-sans font-semibold text-lg leading-none tracking-wide text-white">
        memzo<span className="text-slate-400 font-light">.dev</span>
      </span>
    </div>
  );
}
