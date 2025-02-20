import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Grid,
} from '@mui/material';
import { LocationOn, CalendarToday } from '@mui/icons-material';
import { Event } from '@modules/events/defs/types';
import useEventParticipants from '@modules/events/hooks/api/useEventParticipants';
import { useSnackbar } from 'notistack';
// import { useNavigate } from 'react-router-dom';

interface EventDetailProps {
  event: Event;
}

const EventDetail: React.FC<EventDetailProps> = ({ event }) => {
  // const navigate = useNavigate();
const { enqueueSnackbar } = useSnackbar();
  const { register } = useEventParticipants();
  const handleRegisterClick = async () => {
    const response = await register(event.id)
    if (response.success) {
        enqueueSnackbar('registered', { variant: 'success' });

    } else {
      console.error(response.errors);
        enqueueSnackbar('An error occurred', { variant: 'error' });
    }
  };
   
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card>
        <Grid container>
          {/* Left: Event Image */}
          <Grid item xs={12} md={4}>
            <CardMedia
              component="img"
              image={event.image || ''}
              alt={event.name}
              sx={{ height: '100%', objectFit: 'cover' }}
            />
          </Grid>

          {/* Right: Event Details */}
          <Grid item xs={12} md={8}>
            <CardContent>
              <Typography variant="h4" fontWeight={600} gutterBottom>
                {event.name}
              </Typography>

              <Box display="flex" alignItems="center" mb={1}>
                <CalendarToday fontSize="small" color="action" sx={{ mr: 1 }} />
                <Typography variant="body1" color="text.secondary">
                  {new Date(event.start_date).toLocaleString()}
                </Typography>
              </Box>

              <Box display="flex" alignItems="center" mb={2}>
                <LocationOn fontSize="small" color="action" sx={{ mr: 1 }} />
                <Typography variant="body1" color="text.secondary">
                  {event.location || 'Online Event'}
                </Typography>
              </Box>

              <Typography variant="body1" color="text.secondary" paragraph>
                {event.description}
              </Typography>

              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleRegisterClick}
                fullWidth
              >
                Register
              </Button>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default EventDetail;
