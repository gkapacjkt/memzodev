import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className = "", size = 42 }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 select-none ${className}`} style={{ height: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-500 hover:scale-105"
      >
        <circle cx="50" cy="50" r="46" fill="#0c111d" stroke="#1f2937" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="41" fill="#000000" />
        <rect x="30" y="23" width="40" height="12" rx="6" fill="url(#greenGradient)" />
        <rect x="30" y="39" width="40" height="12" rx="6" fill="url(#greenGradient)" />
        <path d="M36 55h26v12H36a6 6 0 0 1-6-6v0a6 6 0 0 1 6-6z" fill="url(#greenGradient)" />
        <path d="M62 55c4 0 7 2 8 6l.5 1c.5 1 .5 3-1.5 5-2 2-5 0-7-2-1.5-1.5-3-3-3-6a4 4 0 0 1 3-4z" fill="url(#greenGradient)" />
        <path d="M62 55c2 0 6 2 8 6l.5 1c-1.5-1-4-2-6-2-2 0-3-.5-4-1.5-.5-.5-.5-1.5-.5-3.5z" fill="url(#curlHighlight)" />
        <text x="50" y="78" fill="#ffffff" fontSize="11" fontWeight="700" fontFamily="'Inter', sans-serif" letterSpacing="2.5" textAnchor="middle">
          memzo
        </text>
        <text x="50" y="88" fill="#84cc16" fontSize="8" fontWeight="500" fontFamily="'JetBrains Mono', monospace" letterSpacing="2" textAnchor="middle">
          .dev
        </text>
        <defs>
          <linearGradient id="greenGradient" x1="30" y1="23" x2="70" y2="67" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#84cc16" />
            <stop offset="50%" stopColor="#41b22e" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>
          <linearGradient id="curlHighlight" x1="60" y1="55" x2="71" y2="66" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#a3e635" />
            <stop offset="100%" stopColor="#84cc16" />
          </linearGradient>
        </defs>
      </svg>
      <div className="flex flex-col justify-center leading-none">
        <span className="font-heading font-extrabold text-xl tracking-tight text-white hover:text-navy-300 transition-colors">
          memzo<span className="text-navy-400">.dev</span>
        </span>
      </div>
    </div>
  );
}
