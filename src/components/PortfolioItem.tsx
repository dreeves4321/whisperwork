import React from 'react';
import { Link } from 'react-router-dom';
import { WorkItem } from '../types';

interface PortfolioItemProps {
  item: WorkItem;
  onGalleryClick?: () => void;
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({ item, onGalleryClick }) => {
  const itemContent = (
    <>
      <img
        src={`${process.env.PUBLIC_URL}/images/${item.thumbnail}`}
        alt={item.title}
        className="portfolio-item__image"
      />
      <div className="portfolio-item__content">
        <h2 className="portfolio-item__title">{item.title}</h2>
        <p className="portfolio-item__client">{item.client}</p>        
        <p className="portfolio-item__description">{item.description}</p>
        <div className="button__secondary portfolio-item__button">Read the case study</div>
      </div>

    </>
  );

  return (
    <div className="portfolio-item" >
      {item.type === 'case-study' ? (
        <Link to={`/case-study/${item.id}`}>{itemContent}</Link>
      ) : (
        <div onClick={onGalleryClick} style={{ cursor: 'pointer' }}>
          {itemContent}
        </div>
      )}
    </div>
  );
};

export default PortfolioItem; 