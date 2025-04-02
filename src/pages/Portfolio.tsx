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
        const threadsResponse = await fetch('/data/threads.json', {
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
        const workItemsResponse = await fetch('/data/all_work.json', {
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

  const filteredItems = activeThread
    ? workItems.filter((item) => item.threads.includes(activeThread))
    : workItems;

  const handleGalleryClick = async (item: WorkItem) => {
    if (item.type === 'gallery') {
      try {
        console.log('Fetching gallery item:', item.id);
        const response = await fetch('/data/gallery_items.json', {
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
        <h2>Loading portfolio...</h2>
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
          <p>{personal.descriptors.join(' · ')}</p>
      </div>
      
      <div className="highlight-container">
        <ThreadFilter
          threads={threads}
          activeThread={activeThread}
          onThreadSelect={setActiveThread}
          workItems={workItems}
          onGalleryClick={handleGalleryClick}
        />
      </div>
      <div className="content-container">
        {filteredItems.length === 0 ? (
          <p>No items to display</p>
        ) : (
          <>
            {filteredItems.some(item => item.type === 'case-study') && (
              <section className="portfolio-section portfolio-section--case-study">
                <p>Case studies for <span className="thread-name">{threads.find(t => t.id === activeThread)?.name || 'all threads'}</span></p>
                <div className="grid">
                  {filteredItems
                    .filter(item => item.type === 'case-study')
                    .map((item) => (
                      <PortfolioItem
                        key={item.id}
                        item={item}
                        onGalleryClick={() => handleGalleryClick(item)}
                      />
                    ))}
                </div>
              </section>
            )}
            <hr className="portfolio-divider" />
            {filteredItems.some(item => item.type === 'gallery') && (
              <section className="portfolio-section portfolio-section--gallery">
                <p>Gallery of <span className="thread-name">{threads.find(t => t.id === activeThread)?.name || 'all threads'}</span></p>
                <div className="grid">
                  {filteredItems
                    .filter(item => item.type === 'gallery')
                    .map((item) => (
                      <PortfolioItem
                        key={item.id}
                        item={item}
                        onGalleryClick={() => handleGalleryClick(item)}
                      />
                    ))}
                </div>
              </section>
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