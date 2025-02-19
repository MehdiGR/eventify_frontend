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

interface EventCardProps {
  event: Event;
  variant: string;
  onBookmark: (id: number) => void;
}

// Styled components
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

const CategoryChip = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  left: theme.spacing(2),
  fontWeight: 500,
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
}));

const BookmarkButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  padding: theme.spacing(1),
}));

const EventCard = ({ event, variant, onBookmark }: EventCardProps) => {
  const [isBookmarked, setIsBookmarked] = React.useState(false);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark(event.id);
    console.log(event, 'onbo event');
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

  // Render horizontal layout
  if (variant === 'horizontal') {
    return (
      <StyledCard>
        <Grid container>
          {/* Left side - Image */}
          <Grid item xs={12} sm={4} md={3} sx={{ position: 'relative' }}>
            <CardMedia
              component="img"
              sx={{ height: '100%', minHeight: 200 }}
              image={event?.image || ''}
              alt={event.name}
            />
            {event.category && <CategoryChip size="small" label={event.category} />}
            <BookmarkButton
              onClick={handleBookmark}
              aria-label={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
              size="small"
            >
              {isBookmarked ? (
                <BookmarkAdded fontSize="small" />
              ) : (
                <BookmarkBorder fontSize="small" />
              )}
            </BookmarkButton>
          </Grid>

          {/* Right side - Content */}
          <Grid item xs={12} sm={8} md={9}>
            <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                <CalendarToday fontSize="small" color="action" sx={{ mr: 0.5 }} />
                <Typography variant="body2" color="text.secondary">
                  {formatDate(event.startDate)}
                </Typography>
              </Box>

              <Typography
                variant="h6"
                component="h2"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  lineHeight: 1.3,
                  mb: 1,
                }}
              >
                {event.name}
              </Typography>

              <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                <LocationOn fontSize="small" color="action" sx={{ mr: 0.5 }} />
                <Typography variant="body2" color="text.secondary" noWrap>
                  {event.location || 'Online Event'}
                </Typography>
              </Box>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  mb: 'auto',
                }}
              >
                {event.description}
              </Typography>

              <Box
                sx={{
                  mt: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant="body2" color="primary" sx={{ fontWeight: 600 }}>
                  {event.price ? `$${event.price}` : 'Free'}
                </Typography>

                {event.participantCount && (
                  <Chip
                    size="small"
                    label={`${event.participantCount} attending`}
                    variant="outlined"
                    sx={{ fontSize: '0.75rem' }}
                  />
                )}
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </StyledCard>
    );
  }

  // Vertical layout (default)
  return (
    <StyledCard>
      <Box sx={{ position: 'relative' }}>
        <CardMedia component="img" height="200" image={event.image || ''} alt={event.name} />
        {event.category && <CategoryChip size="small" label={event.category} />}
        <BookmarkButton
          onClick={handleBookmark}
          aria-label={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
          size="small"
        >
          {isBookmarked ? <BookmarkAdded fontSize="small" /> : <BookmarkBorder fontSize="small" />}
        </BookmarkButton>
      </Box>

      <CardActionArea component="div">
        <CardContent>
          <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
            <CalendarToday fontSize="small" color="action" sx={{ mr: 0.5 }} />
            <Typography variant="body2" color="text.secondary">
              {formatDate(event.startDate)}
            </Typography>
          </Box>

          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 600,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: 1.3,
            }}
          >
            {event.name}
          </Typography>

          <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
            <LocationOn fontSize="small" color="action" sx={{ mr: 0.5 }} />
            <Typography variant="body2" color="text.secondary" noWrap>
              {event.location || 'Online Event'}
            </Typography>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              mb: 1,
            }}
          >
            {event.description}
          </Typography>

          <Box
            sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Typography variant="body2" color="primary" sx={{ fontWeight: 600 }}>
              {event.price ? `$${event.price}` : 'Free'}
            </Typography>
            {event.participantCount==0 && (
              <Chip
                size="small"
                label={`${event.participantCount} attending`}
                variant="outlined"
                sx={{ fontSize: '0.75rem' }}
              />
            )}
          </Box>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
};

export default EventCard;
