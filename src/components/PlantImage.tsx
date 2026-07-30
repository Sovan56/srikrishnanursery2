import React, { useState } from 'react';
import { Sprout } from 'lucide-react';

interface PlantImageProps {
  src?: string;
  alt: string;
  className?: string;
  fallbackCategory?: string;
}

export const PlantImage: React.FC<PlantImageProps> = ({
  src,
  alt,
  className = '',
  fallbackCategory = 'Nursery Plant',
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // High-reliability nursery backdrop for fallback
  const backupImage = 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80';

  if (!src || hasError) {
    return (
      <div className={`bg-stone-800 relative overflow-hidden flex flex-col items-center justify-center ${className}`}>
        <img
          src={backupImage}
          alt={alt}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover opacity-40 blur-[1px]"
        />
        <div className="relative z-10 flex flex-col items-center justify-center p-3 text-center space-y-1">
          <div className="p-2 rounded-full bg-emerald-900/80 text-emerald-300 border border-emerald-500/30">
            <Sprout className="w-6 h-6" />
          </div>
          <p className="text-xs font-bold text-white line-clamp-1">{alt}</p>
          <span className="text-[10px] uppercase font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded-md">
            {fallbackCategory}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-stone-200 animate-pulse flex items-center justify-center z-10">
          <Sprout className="w-5 h-5 text-emerald-600 animate-pulse" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
      />
    </div>
  );
};
