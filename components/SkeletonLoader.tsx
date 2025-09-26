import React from 'react';

interface SkeletonLoaderProps {
  className?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ className = 'h-24' }) => {
  return (
    <div className={`animate-pulse bg-gray-200 dark:bg-slate-700 rounded-lg ${className}`} />
  );
};

export default SkeletonLoader;