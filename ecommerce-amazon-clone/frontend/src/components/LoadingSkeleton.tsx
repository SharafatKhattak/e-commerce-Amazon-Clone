import React from 'react';

interface LoadingSkeletonProps {
  count?: number;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ count = 12 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-gray-300 animate-pulse" />
          <div className="p-3 space-y-3">
            <div className="h-4 bg-gray-300 animate-pulse rounded" />
            <div className="h-4 bg-gray-300 animate-pulse rounded w-3/4" />
            <div className="h-6 bg-gray-300 animate-pulse rounded w-1/2" />
            <div className="h-10 bg-gray-300 animate-pulse rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
