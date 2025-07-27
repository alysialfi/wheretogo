import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import PlaceIcon from '@mui/icons-material/Place';
import type { SvgIconComponent } from '@mui/icons-material';


// Define the props for our component
interface LocationCardProps {
  // Icon: SvgIconComponent;
  rating: number;
  emojiLeft: string;
  emojiRight: string;
  top: string;
  left: string;
}

export const LocationCard: React.FC<LocationCardProps> = ({ rating, emojiLeft, emojiRight, top, left }) => {
  return (
    // This parent Box handles the absolute positioning and centers the pin under the card
    <Box
      sx={{
        position: 'absolute',
        top: top,
        left: left,
        transform: 'translateX(-50%)', // Center the card on the left coordinate
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0.5,
      }}
    >
      {/* The white card with shadow */}
      <Paper
        elevation={4}
        sx={{
          py: 1.5,
          px: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          borderRadius: '12px',
          position: 'relative',
        }}
      >
        {/* <Icon
          sx={{
            color: 'text.secondary',
            position: 'absolute',
            top: -12,
            left: -7,
            transform: 'rotate(-30deg)',
            fontSize: '2.5rem',
          }}
        /> */}
        <Typography
          sx={{
            position: 'absolute',
            top: -20,
            left: -16,
            transform: 'rotate(-30deg)',
            fontSize: '2.5rem',
          }}
        >
          {emojiLeft}
        </Typography>
        <Rating name="read-only" value={rating} readOnly size="small" />
        <Typography
          variant="h6"
          sx={{
            position: 'absolute',
            top: -2,
            right: -20,
            transform: 'rotate(20deg)',
            fontSize: '2.5rem',
          }}
        >
          {emojiRight}
        </Typography>
      </Paper>

      {/* The purple location pin below the card */}
      <PlaceIcon sx={{ color: '#9C6CFE', fontSize: '4rem' }} />
    </Box>
  );
};