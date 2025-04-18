import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Components } from 'react-markdown';
import { GalleryItem } from '../types';
import '../styles/main.scss';

interface GalleryModalProps {
  item: GalleryItem;
  onClose: () => void;
}

const GalleryModal: React.FC<GalleryModalProps> = ({ item, onClose }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    document.body.classList.add('modal-open');
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  const markdownComponents: Components = {
    a: ({ href, children }) => (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  };

  const handleGridItemClick = (index: number) => {
    setSelectedImage(index);
  };

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImage(null);
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal__holder">
        <button className="modal__close" onClick={onClose}>
            <img src={`${process.env.PUBLIC_URL}/icons/close.svg`} alt="Close" />
        </button>
        <div className="modal__window" onClick={e => e.stopPropagation()}>
          <div className="modal__content">
            {selectedImage !== null ? (
              <div className="modal__fullscreen-image" onClick={handleImageClick}>
                <img
                  src={`${process.env.PUBLIC_URL}/images/${item.images[selectedImage + 1].src}`}
                  alt={item.images[selectedImage + 1].caption}
                  className="modal__fullscreen-image-content"
                />
                {item.images[selectedImage + 1].caption && (
                  <div className="modal__fullscreen-caption">
                    {item.images[selectedImage + 1].caption}
                  </div>
                )}
              </div>
            ) : (
              <div className="modal__hero">
                <img               
                  src={`${process.env.PUBLIC_URL}/images/${item.images[0].src}`}
                  alt={item.images[0].caption}
                  className="modal__hero-image"
                />
              </div>
            )}
            <div className="modal__content-section">
              <div className="modal__meta">
                <span>{item.client}</span>
                <img src={`${process.env.PUBLIC_URL}/icons/star.svg`} alt="°" className="star-bullet" />
                <span>{item.date}</span>
              </div>
              <h2 className="modal__title">{item.title}</h2>
              <div className="modal__description"><ReactMarkdown components={markdownComponents}>{item.description}</ReactMarkdown></div>
              {item.link && (
                <a 
                  href={item.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal__button button__primary"
                >
                  {item.link.text}
                </a>
              )}
              <div className="modal__grid">
                {item.images.slice(1).map((image, index) => (
                  <div 
                    key={index} 
                    className="modal__grid-item"
                    onClick={() => handleGridItemClick(index)}
                  >
                    {image.src.endsWith('.mp4') ? (
                      <video 
                        src={`${process.env.PUBLIC_URL}/images/${image.src}`}
                        className="modal__grid-image"
                        controls
                        poster={`${process.env.PUBLIC_URL}/images/${image.src.replace('.mp4', '.jpg')}`}
                      />
                    ) : (
                      <img 
                        src={`${process.env.PUBLIC_URL}/images/${image.src}`}
                        alt={image.caption}
                        className="modal__grid-image"
                      />
                    )}                    
                    {image.caption && <div className="modal__grid-caption">{image.caption}</div>}
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