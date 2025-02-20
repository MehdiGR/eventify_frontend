/* eslint-disable no-nested-ternary */
// components/HeroSlider.js
import React, { useMemo, useState } from 'react';
import { Box, Paper, InputBase } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { styled } from '@mui/material/styles';
import SlideItem from '@modules/home/components/SlideItem';
import SearchBar from '@modules/home/components/SearchBar';

// Styled components for the search box
const SearchBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  backgroundColor: 'white',
  width: '100%',
  maxWidth: 700,
  margin: '0 auto',
  marginTop: theme.spacing(4),
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(1),
  fontSize: '1.1rem',
}));

// Slide content
const slides = [
  {
    id: 1,
    image:
      'https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Discover events near you',
    subtitle: 'Find your next experience',
    color: 'rgba(0,0,0,0.6)',
  },
  {
    id: 2,
    image:
      'https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Connect with people',
    subtitle: 'Join amazing events in your area',
    color: 'rgba(0,0,30,0.6)',
  },
  {
    id: 3,
    image:
      'https://images.pexels.com/photos/57980/pexels-photo-57980.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Create your own events',
    subtitle: 'Share your passion with others',
    color: 'rgba(30,0,0,0.6)',
  },
];
interface HeroSliderProps {
  onSearch: (query: string, location: string) => void;
}
const HeroSlider: React.FC<HeroSliderProps> = ({ onSearch }) => {
  const [tabValue, setTabValue] = useState(0);
  // const [searchParams, setSearchParams] = useState({
  //   query: '',
  //   location: '',
  // });
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

 
  return (
    <Box sx={{ position: 'relative', height: { xs: '70vh', md: '80vh' }, overflow: 'hidden' }}>
      {/* Swiper component for the slider */}
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        style={{ height: '100%' }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <SlideItem slide={slide} />
          </SwiperSlide>
        ))}
      </Swiper>
      <SearchBar
        tabValue={tabValue}
        handleTabChange={handleTabChange}
        onSearch={onSearch} // Pass through the search handler
      />
    </Box>
  );
};

export default HeroSlider;
