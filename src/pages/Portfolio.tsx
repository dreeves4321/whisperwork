import React, { useState, useEffect } from 'react';
import ThreadFilter from '../components/ThreadFilter';
import PortfolioItem from '../components/PortfolioItem';
import GalleryModal from '../components/GalleryModal';
import { Thread, WorkItem, GalleryItem } from '../types';
import { usePersonalData } from '../hooks/usePersonalData';

const Portfolio: React.FC = () => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [workItems, setWorkItems] = useState<WorkItem[]>([]);
  const [activeThread, setActiveThread] = useState<string | null>(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { personal, error: personalError } = usePersonalData();

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load threads
        console.log('Fetching threads...');
        const threadsResponse = await fetch(`${process.env.PUBLIC_URL}/data/threads.json`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        if (!threadsResponse.ok) {
          throw new Error(`Failed to fetch threads: ${threadsResponse.status} ${threadsResponse.statusText}`);
        }

        const threadsText = await threadsResponse.text();
        if (!threadsText) {
          throw new Error('Threads response is empty');
        }
        console.log('Raw threads response:', threadsText);

        try {
          const threadsData = JSON.parse(threadsText);
          console.log('Parsed threads:', threadsData);
          if (!Array.isArray(threadsData)) {
            throw new Error('Threads data is not an array');
          }
          setThreads(threadsData);
          // Set the first thread as active if there are any threads
          if (threadsData.length > 0) {
            setActiveThread(threadsData[0].id);
          }
        } catch (parseError) {
          console.error('Error parsing threads JSON:', parseError);
          throw new Error(`Failed to parse threads JSON: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`);
        }

        // Load work items
        console.log('Fetching work items...');
        const workItemsResponse = await fetch(`${process.env.PUBLIC_URL}/data/all_work.json`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });

        if (!workItemsResponse.ok) {
          throw new Error(`Failed to fetch work items: ${workItemsResponse.status} ${workItemsResponse.statusText}`);
        }

        const workItemsText = await workItemsResponse.text();
        if (!workItemsText) {
          throw new Error('Work items response is empty');
        }
        console.log('Raw work items response:', workItemsText);

        try {
          const workItemsData = JSON.parse(workItemsText);
          console.log('Parsed work items:', workItemsData);
          if (!Array.isArray(workItemsData)) {
            throw new Error('Work items data is not an array');
          }
          setWorkItems(workItemsData);
        } catch (parseError) {
          console.error('Error parsing work items JSON:', parseError);
          throw new Error(`Failed to parse work items JSON: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Error loading data:', error);
        setError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Get items from the active thread
  const activeThreadItems = activeThread
    ? workItems.filter((item) => item.threads.includes(activeThread) && item.id !== threads.find(t => t.id === activeThread)?.featured)
    : workItems;

  // Get items from other threads
  const otherThreadItems = activeThread
    ? workItems.filter((item) => !item.threads.includes(activeThread))
    : [];

  const handleGalleryClick = async (item: WorkItem) => {
    if (item.type === 'gallery') {
      try {
        console.log('Fetching gallery item:', item.id);
        const response = await fetch(`${process.env.PUBLIC_URL}/data/gallery_items.json`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch gallery items: ${response.status} ${response.statusText}`);
        }

        const text = await response.text();
        if (!text) {
          throw new Error('Gallery items response is empty');
        }
        console.log('Raw gallery items response:', text);

        try {
          const galleryItems = JSON.parse(text);
          console.log('Parsed gallery items:', galleryItems);
          if (!Array.isArray(galleryItems)) {
            throw new Error('Gallery items data is not an array');
          }
          const fullGalleryItem = galleryItems.find((gi: GalleryItem) => gi.id === item.id);
          if (fullGalleryItem) {
            setSelectedGalleryItem(fullGalleryItem);
          } else {
            console.error('Gallery item not found:', item.id);
          }
        } catch (parseError) {
          console.error('Error parsing gallery items JSON:', parseError);
          throw new Error(`Failed to parse gallery items JSON: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Error loading gallery item:', error);
        setError(error instanceof Error ? error.message : 'Unknown error');
      }
    }
  };

  if (loading || !personal) {
    return (
      <div className="page-container">
        {/*<h2>Loading portfolio...</h2>*/}
      </div>
    );
  }

  if (error || personalError) {
    return (
      <div className="page-container">
        <h2>Error loading portfolio</h2>
        <p>{error || personalError}</p>
        <div>
          <h3>Debug Information:</h3>
          <p>Number of threads loaded: {threads.length}</p>
          <p>Number of work items loaded: {workItems.length}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="portfolio page-container">
      <div className="content-container personal-info">        
          <h1>{personal.name}</h1>
          <p>{personal.descriptors.map((descriptor, index) => (
            <React.Fragment key={index}>
              {descriptor}
              {index < personal.descriptors.length - 1 && (
                <img src={`${process.env.PUBLIC_URL}/icons/star.svg`} alt="star" className="star-bullet" />
              )}
            </React.Fragment>
          ))}</p>
      </div>
      
      <ThreadFilter
        threads={threads}
        activeThread={activeThread}
        onThreadSelect={setActiveThread}
        workItems={workItems}
        onGalleryClick={handleGalleryClick}
      />
      <div className="content-container">
        {activeThreadItems.length === 0 && otherThreadItems.length === 0 ? (
          <p>No items to display</p>
        ) : (
          <>
            {/* Active Thread Items - Mixed Case Studies and Gallery Items */}
            {activeThreadItems.length > 0 && (
              <section className="portfolio-section portfolio-section__filtered">
                <p className="portfolio-section__title">More work with <strong>{threads.find(t => t.id === activeThread)?.name || 'all threads'}</strong></p>
                <div className="grid">
                  {activeThreadItems.map((item) => (
                    <PortfolioItem
                      key={item.id}
                      item={item}
                      onGalleryClick={() => handleGalleryClick(item)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Other Thread Items */}
            {otherThreadItems.length > 0 && (
              <>
                <hr className="portfolio-divider" />
                <section className="portfolio-section portfolio-section__all">
                  <p className="portfolio-section__title">Other work</p>
                  <div className="grid">
                    {otherThreadItems.map((item) => (
                      <PortfolioItem
                        key={item.id}
                        item={item}
                        onGalleryClick={() => handleGalleryClick(item)}
                      />
                    ))}
                  </div>
                </section>
              </>
            )}
          </>
        )}
        {selectedGalleryItem && (
          <GalleryModal
            item={selectedGalleryItem}
            onClose={() => setSelectedGalleryItem(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Portfolio; 