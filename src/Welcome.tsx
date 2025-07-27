import { Box, Button, Container, Stack, Typography } from '@mui/material';
import JavaMap from '../src/assets/images/java-map.svg';
import { LocationCard } from './LocationCard';
import { useState } from 'react';
import { motion, AnimatePresence, useAnimate } from 'motion/react';

type WelcomeProps = {
  handleModalOpen?: () => void;
};
const mapImageUrl = JavaMap;

export default function Welcome({ handleModalOpen }: WelcomeProps) {
  const [isImageVisible, setIsImageVisible] = useState(true);
  const [scope, animate] = useAnimate();

  const handleFindNearbyClick = async () => {
    animate('#hero-section', { opacity: 0, y: -30 }, { duration: 0.5 });
    await animate('#location-others', { opacity: 0 }, { duration: 0.5 });

    await Promise.all([
      animate('#wrapper-location-jogja', 
        { top: "55%", left: "39%", x: "-50%", y: "-50%" },
        { duration: 0.8, ease: "easeInOut" }
      ),
      animate('#background-map', 
        {
          y: "-25%",
          scale: 1.2
        },
        { duration: 0.8, ease: "easeInOut" }
      )
    ]);

    await animate('#location-jogja',
      {
        y: [0, -25, 0, -15, 0],
        scale: [1, 1.1, 1, 1.05, 1],
      },
      { 
        duration: 1.5, 
        ease: "easeInOut" 
      }
    );

    await Promise.all([
      animate('#background-map', { scale: 1.3, opacity: 0 }, { duration: 0.4, ease: "easeOut" }),
      animate('#location-jogja', { scale: 0.8, opacity: 0 }, { duration: 0.2, ease: "easeOut" })
    ])
    await setIsImageVisible(false);
    await handleModalOpen?.();
  };

  return (
    <Container
      ref={scope}
      maxWidth={false}
      sx={{
        height: '100vh',
        width: '100vw',
        bgcolor: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: 16,
          pb: 4,
          textAlign: 'center',
          zIndex: 10,
        }}
        id="hero-section"
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: '500',
            fontSize: { xs: '3.5rem', md: '6rem' },
            letterSpacing: '2px',
            color: '#1F1F1F',
          }}
        >
          Where{' '}
          <Box component="span" sx={{ fontStyle: 'italic', fontWeight: 'medium' }}>
            to
          </Box>{' '}
          Go
        </Typography>
        <Typography sx={{
          mt: 1, color: 'text.secondary',
          fontSize: { xs: '1rem', md: '1.3rem' },
          fontWeight: '500',
        }}>
          Not Sure Where to Go? Let Ronda Helps You Decide.
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
            <Button
            variant="outlined"
            sx={{
              borderRadius: '100px',  // Changed from '80px' to '100px'
              color: 'text.primary',
              textTransform: 'none',
              fontSize: { xs: '1rem', md: '1.2rem' },
              px: 6,
              py: 1,
              position: 'relative',
              '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: '100px',
              border: '2px solid transparent',
              background: 'linear-gradient(90deg, #9C6CFE, #FFC0F7) border-box',
              WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'destination-out',
              maskComposite: 'exclude',
              },
              '&:hover': {
              borderColor: 'transparent',
              bgcolor: 'rgba(156, 108, 254, 0.04)'
              }
            }}
            >
            Find Places
            </Button>
          <Button
            variant="contained"
            sx={{
              borderRadius: '100px',
              bgcolor: 'black',
              color: 'white',
              textTransform: 'none',
              fontSize: { xs: '1rem', md: '1.2rem' },
              px: 6,
              py: 1,
              '&:hover': {
                bgcolor: '#333',
              }
            }}
            onClick={handleFindNearbyClick} 
          >
            Find Nearby
          </Button>
        </Stack>
      </Box>

       <AnimatePresence>
        {isImageVisible && (
          <Box
          key="map-section"
          component={motion.div}
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: { xs: '60%', md: '55%' },
            width: '100%',
            }}
            >
            <Box
              id='background-map'
              component="img"
              src={mapImageUrl}
              sx={{
                width: '100%',
                height: '120%',
                position: 'absolute',
              }}
            />
            <div id='location-others'>
              <LocationCard rating={4} emojiLeft='🌲' emojiRight="🥰" top="15%" left="75%" />
              <LocationCard rating={3} emojiLeft='☕️' emojiRight="👍🏼" top="25%" left="20%" />
            </div>
            <motion.div
              id="wrapper-location-jogja"
              style={{ position: 'absolute', top: '50%', left: '45%' }}
            >
              <motion.div
                id='location-jogja'
                style={{ 
                  position: 'absolute', 
                  top: '50%', 
                  left: '45%' 
                }}
              >
                <LocationCard rating={5} emojiLeft='🍩' emojiRight="🤤" top="50%" left="45%" />
              </motion.div>
            </motion.div>
          </Box>
        )}
      </AnimatePresence>
    </Container>
  );
}