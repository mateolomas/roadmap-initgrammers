import React from 'react';

interface ProgressTrackerProps {
  progress: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ progress }) => {
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-2">
        <div className="text-lg font-medium">Your progress</div>
        <div className="text-lg font-medium text-[rgb(179,43,75)]">{progress}%</div>
      </div>
      
      <div className="w-fullrounded-full h-2.5">
        <div 
          className="bg-[rgb(179,43,75)] h-2.5 rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="flex justify-between mt-2 text-sm text-gray-500">
        <div>Just started</div>
        <div>Halfway there</div>
        <div>Completed</div>
      </div>
    </div>
  );
};

export default ProgressTracker;