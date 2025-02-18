import { Box, Container, Typography } from '@mui/material';
import React from 'react';

interface SlideCardProps {
  slide: {
    id: number;
    image: string;
    title: string;
    subtitle: string;
    color: string;
  };
}
// eslint-disable-next-line react/function-component-definition
export default function SlideItem({ slide }: SlideCardProps) {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        position: 'relative',
        borderRadius: '40%',
      }}
    >
      {/* Background image */}
      <Box
        component="img"
        src={slide.image}
        alt={slide.title}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {/* Overlay gradient */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `linear-gradient(to bottom, transparent 50%, ${slide.color} 100%)`,
        }}
      />

      {/* Content */}
      <Container
        sx={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: 'white',
          zIndex: 2,
          width: '100%',
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 700,
            mb: 2,
            fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
            textShadow: '0 2px 4px rgba(0,0,0,0.4)',
          }}
        >
          {slide.title}
        </Typography>
        <Typography
          variant="h5"
          sx={{
            mb: 4,
            maxWidth: '800px',
            mx: 'auto',
            fontSize: { xs: '1.2rem', md: '1.5rem' },
            textShadow: '0 1px 2px rgba(0,0,0,0.4)',
          }}
        >
          {slide.subtitle}
        </Typography>
      </Container>
    </Box>
  );
}
