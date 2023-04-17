import React from 'react';
import '../../styles/skeletonLoading.scss';

interface SkeletonLoadingProps {
    textLines?: number;
  }

  const SkeletonLoading: React.FC<SkeletonLoadingProps> = ({ textLines = 3 }) => {
    const lines = Array.from(Array(textLines).keys());
    const showBlock = textLines > 3;
    return (
      <div className="skeleton-loading-container">
        <div className="skeleton-loading-image">
          <div className="image-placeholder" />
        </div>
        <div className="skeleton-loading-title"></div>
        <div className={`skeleton-loading-text ${showBlock ? 'block' : ''}`}>
          {lines.map((_, index) => (
            <div key={index} className="skeleton-loading-line" />
          ))}
        </div>
      </div>
    );
  };

  export default SkeletonLoading;