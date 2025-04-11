import { useState, useEffect } from 'react';
import { Personal } from '../types';

export const usePersonalData = () => {
  const [personal, setPersonal] = useState<Personal | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPersonal = async () => {
      try {
        console.log('Fetching personal data...');
        const response = await fetch('/data/personal.json', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch personal data: ${response.status}`);
        }
        const data = await response.json();
        console.log('Personal data loaded:', data);
        setPersonal(data);
      } catch (err) {
        console.error('Error loading personal data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load personal data');
      }
    };

    loadPersonal();
  }, []);

  return { personal, error };
}; 