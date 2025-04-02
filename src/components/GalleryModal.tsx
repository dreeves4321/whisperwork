import React, { useEffect } from 'react';
import { GalleryItem } from '../types';
import '../styles/main.scss';

interface GalleryModalProps {
  item: GalleryItem;
  onClose: () => void;
}

const GalleryModal: React.FC<GalleryModalProps> = ({ item, onClose }) => {
  useEffect(() => {
    document.body.classList.add('modal-open');
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal__holder">
        <button className="modal__close" onClick={onClose}>
            <img src={`${process.env.PUBLIC_URL}/icons/close.svg`} alt="Close" />
        </button>
        <div className="modal__window" onClick={e => e.stopPropagation()}>
          
          <div className="modal__content">
            <div className="modal__hero">
              <img               
                src={`${process.env.PUBLIC_URL}/images/${item.images[0].src}`}
                alt={item.images[0].caption}
                className="modal__hero-image"
              />
            </div>
            <div className="modal__content-section">
              <div className="modal__meta">
                <span>{item.client}</span>
                <span>•</span>
                <span>{item.date}</span>
              </div>
              <h2 className="modal__title">{item.title}</h2>
              <p className="modal__description">{item.description}</p>
              <div className="modal__grid">
                {item.images.slice(1).map((image, index) => (
                  <div key={index} className="modal__grid-item">
                    <img 
                      src={`${process.env.PUBLIC_URL}/images/${image.src}`}
                      alt={image.caption}
                      className="modal__grid-image"
                    />
                    <div className="modal__grid-caption">{image.caption}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryModal; 