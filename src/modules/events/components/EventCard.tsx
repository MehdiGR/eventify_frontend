import React from 'react';
import { Event } from '@modules/events/defs/types';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  IconButton,
  Stack,
  Grid,
  styled,
} from '@mui/material';
import { LocationOn, CalendarToday, BookmarkBorder, BookmarkAdded } from '@mui/icons-material';
import { useRouter } from 'next/router';

interface EventCardProps {
  event: Event;
  variant: string;
  onBookmark: (id: number) => void;
}

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  transition: 'transform 0.2s, box-shadow 0.2s',
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
  },
}));

const EventCard = ({ event, variant, onBookmark }: EventCardProps) => {
  console.log(event);
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = React.useState(false);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark(event.id);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <StyledCard>
      <CardActionArea onClick={() => router.push(`/events/${event.id}`)}>
        <Box sx={{ position: 'relative' }}>
          <CardMedia component="img" height="200" image={event.image || ''} alt={event.name} />
        </Box>
        <CardContent>
          <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
            <CalendarToday fontSize="small" color="action" sx={{ mr: 0.5 }} />
            <Typography variant="body2" color="text.secondary">
              {formatDate(event.start_date)}
            </Typography>
          </Box>
          <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            {event.name}
          </Typography>
          <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
            <LocationOn fontSize="small" color="action" sx={{ mr: 0.5 }} />
            <Typography variant="body2" color="text.secondary" noWrap>
              {event.location || 'Online Event'}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ overflow: 'hidden' }}>
            {event.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
};

export default EventCard;
