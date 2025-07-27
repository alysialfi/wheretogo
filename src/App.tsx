import { useState, useEffect } from 'react';
import Modal from './FormModal'
import Welcome from './Welcome'
import Loader from './Loader';
import CafeCard from './CafeCard';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useQuery } from '@tanstack/react-query';
import type { Location } from './models/Geolocation';

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Plus Jakarta Sans, sans-serif',
    },
  },
});

function App() {
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const fetchNearbyPlaces = async () => {
    const response = await fetch(`http://127.0.0.1:8000/nearby-places?lat=${userLocation?.lat}&lon=${userLocation?.lng}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
  const {
    data: allCafes,
    isLoading,
    // isError,
  } = useQuery({
    queryKey: ['cafes', userLocation],
    queryFn: () => fetchNearbyPlaces(),
    enabled: !!userLocation,
  });
  
  useEffect(() => {
    console.log('allCafes:', allCafes);
  }, [allCafes])

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, [])

  const [view, setView] = useState<'welcome' | 'loading' | 'place'>('welcome');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);
  const handleSubmitModal = () => {
    setIsModalOpen(false);
    setView('loading');
  };

  useEffect(() => {
    if (allCafes && allCafes.length > 0) {
      setView('place');
    }
  }, [allCafes]);

  return (
    <ThemeProvider theme={theme}>
      {view === 'welcome' && (
        <>
          <Welcome handleModalOpen={handleModalOpen} />
          <Modal open={isModalOpen} handleModalClose={handleModalClose} handleSubmitModal={handleSubmitModal} />
        </>
      )}
      {view === 'loading' && <Loader isShowing={isLoading} />}
      {view === 'place' && <CafeCard cafes={allCafes} />}
    </ThemeProvider>
  )
}

export default App
