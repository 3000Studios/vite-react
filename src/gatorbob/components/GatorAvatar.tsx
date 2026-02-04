
import React from 'react';

interface GatorAvatarProps {
  isTalking?: boolean;
  isDancing?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const GatorAvatar: React.FC<GatorAvatarProps> = ({ isTalking, isDancing, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-48 h-48',
    lg: 'w-64 h-64'
  };

  return (
    <div className={`relative ${sizeClasses[size]} mx-auto flex items-center justify-center ${isDancing ? 'animate-bounce' : 'animate-sway'}`}>
      <style>
        {`
          @keyframes breathe {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.03); }
          }
          @keyframes blink {
            0%, 90%, 100% { transform: scaleY(1); }
            95% { transform: scaleY(0.1); }
          }
          .animate-breathe { animation: breathe 4s ease-in-out infinite; }
          .animate-blink { animation: blink 5s infinite; transform-origin: center; }
        `}
      </style>
      <svg viewBox="0 0 200 200" className={`w-full h-full drop-shadow-2xl animate-breathe`}>
        {/* Body/Tail background */}
        <path d="M100,160 Q180,160 180,120 Q180,80 140,80" fill="#1e3d1a" />
        
        {/* Head */}
        <path d="M40,100 Q40,60 100,60 Q160,60 160,100 L160,140 Q160,160 100,160 Q40,160 40,140 Z" fill="#2d5a27" />
        
        {/* Snout */}
        <path d="M40,110 Q10,110 10,130 Q10,150 40,150 L80,150 L80,110 Z" fill="#2d5a27" />
        
        {/* Mardi Gras Hat */}
        <path d="M60,65 L140,65 L120,30 L80,30 Z" fill="#800080" />
        <circle cx="100" cy="25" r="8" fill="#FFD700" />
        <path d="M65,65 Q100,55 135,65" stroke="#008000" strokeWidth="4" fill="none" />
        
        {/* Eyes with Blinking */}
        <g className="animate-blink">
          <circle cx="90" cy="90" r="10" fill="white" />
          <circle cx="90" cy="90" r="5" fill="black" />
          <circle cx="130" cy="90" r="10" fill="white" />
          <circle cx="130" cy="90" r="5" fill="black" />
        </g>
        
        {/* Beads */}
        <circle cx="70" cy="140" r="4" fill="#FFD700" />
        <circle cx="85" cy="145" r="4" fill="#800080" />
        <circle cx="100" cy="148" r="4" fill="#008000" />
        <circle cx="115" cy="145" r="4" fill="#FFD700" />
        <circle cx="130" cy="140" r="4" fill="#800080" />
        
        {/* Blue Accents / Clothes */}
        <path d="M40,135 L60,135" stroke="#0000FF" strokeWidth="3" />
        <rect x="45" y="155" width="110" height="15" rx="5" fill="#0000FF" opacity="0.4" />
        
        {/* Toothy Smile / Mouth Animation */}
        <g className={isTalking ? 'animate-pulse' : ''}>
           <path 
             d={isTalking ? "M15,145 Q50,160 85,145" : "M20,140 Q50,145 80,140"} 
             stroke="white" 
             strokeWidth="2" 
             fill="none" 
           />
           {isTalking && (
             <>
               <path d="M25,146 L30,152 L35,146" fill="white" />
               <path d="M45,148 L50,154 L55,148" fill="white" />
               <path d="M65,146 L70,152 L75,146" fill="white" />
             </>
           )}
        </g>
      </svg>
    </div>
  );
};

export default GatorAvatar;
