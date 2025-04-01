import React, { useState } from 'react';
import { GalleryItem } from '../types';

interface GalleryModalProps {
  item: GalleryItem;
  onClose: () => void;
}

const GalleryModal: React.FC<GalleryModalProps> = ({ item, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? item.images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) =>
      prev === item.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>
          ×
        </button>
        <div className="modal__gallery">
          <img
            src={`/images/${item.images[currentImageIndex]}`}
            alt={`${item.title} - Image ${currentImageIndex + 1}`}
            className="modal__image"
          />
          {item.images.length > 1 && (
            <div className="modal__controls">
              <button onClick={handlePrevious}>&lt;</button>
              <span>
                {currentImageIndex + 1} / {item.images.length}
              </span>
              <button onClick={handleNext}>&gt;</button>
            </div>
          )}
        </div>
        <h2>{item.title}</h2>
        <p>{item.description}</p>
        {item.caption && <p className="modal__caption">{item.caption}</p>}
      </div>
    </div>
  );
};

export default GalleryModal; 