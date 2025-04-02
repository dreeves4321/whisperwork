import React from 'react';
import { Thread, WorkItem } from '../types';
import PortfolioItem from './PortfolioItem';

interface ThreadFilterProps {
  threads: Thread[];
  activeThread: string | null;
  onThreadSelect: (threadId: string | null) => void;
  workItems: WorkItem[];
  onGalleryClick: (item: WorkItem) => void;
}

const ThreadFilter: React.FC<ThreadFilterProps> = ({
  threads,
  activeThread,
  onThreadSelect,
  workItems,
  onGalleryClick,
}) => {
  // Find the featured work item for the active thread
  const getFeaturedItem = () => {
    if (!activeThread) return null;
    const activeThreadData = threads.find(t => t.id === activeThread);
    if (!activeThreadData?.featured) return null;
    return workItems.find(item => item.id === activeThreadData.featured);
  };

  // Get the description for the active thread
  const getThreadDescription = () => {
    if (!activeThread) return null;
    const activeThreadData = threads.find(t => t.id === activeThread);
    return activeThreadData?.description;
  };

  const featuredItem = getFeaturedItem();
  const threadDescription = getThreadDescription();

  return (
    <div className="thread-filter">
      <div className="thread-filter__buttons">
        <p>There are several <b>threads</b> weaving through my work —</p>
        {threads.map((thread) => (
          <button
            key={thread.id}
            className={`thread-filter__button ${
              activeThread === thread.id ? 'thread-filter__button--active' : ''
            }`}
            onClick={() => onThreadSelect(thread.id)}
          >
            {thread.name}
          </button>
        ))}
      </div>
      <div className="thread-filter__content">
        
        {featuredItem && (
          <div className="thread-filter__featured">
            <PortfolioItem item={featuredItem} key={featuredItem.id} onGalleryClick={() => onGalleryClick(featuredItem)} />
          </div>
        )}
        {threadDescription && (
          <p className="thread-filter__description">{threadDescription}</p>
        )}
      </div>
    </div>
  );
};

export default ThreadFilter; 