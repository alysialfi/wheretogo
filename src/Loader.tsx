import { Box, Typography } from '@mui/material';
import { motion } from 'motion/react';

type LoaderProps = {
  isShowing?: boolean;
};

export default function Loader({ isShowing }: LoaderProps) {
  return (
    <Box
      sx={{
        display: isShowing ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        bgcolor: 'background.default',
      }}
    >
      <Box
        component='div'
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {[...Array(12)].map((_, index) => (
          <Box
            key={index}
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.15,
              ease: "linear"
            }}
            sx={{
              position: 'absolute',
              width: `${200 + (index * 150)}px`,
              height: `${200 + (index * 150)}px`,
              border: `1.5px solid rgba(103, 58, 183, ${0.2 + (index * 0.1)})`,
              borderRadius: '50%',
            }}
          />
        ))}
      </Box>

      <Typography
        variant="body1"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'text.secondary',
          fontWeight: 'medium',
          fontSize: '1.3rem',
        }}
      >
        Finding recommendations
      </Typography>
    </Box>
  );
};