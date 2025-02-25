import React from 'react';
import {
  Box,
  Button,
  Typography,
  Container,
  Grid,
  Divider,
  Chip,
  IconButton,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { LocationOn, CalendarToday, ArrowBack, ExpandMore } from '@mui/icons-material';
import { Event } from '@modules/events/defs/types';
import useEventParticipants from '@modules/events/hooks/api/useEventParticipants';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';

interface EventDetailProps {
  event: Event;
}

const EventDetail: React.FC<EventDetailProps> = ({ event }) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { register } = useEventParticipants();
  const [value, setValue] = React.useState(0);

  const handleRegisterClick = async () => {
    const response = await register(event.id);
    if (response.success) {
      enqueueSnackbar('Registered successfully', { variant: 'success' });
    } else {
      enqueueSnackbar(response.errors?.join(', ') || 'An error occurred', { variant: 'error' });
    }
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, position: 'relative' }}>
      <IconButton onClick={() => router.back()} sx={{ mb: 2 }}>
        <ArrowBack />
      </IconButton>

      <Grid container spacing={4}>
        {/* Main Content */}
        <Grid item xs={12} md={8}>
          <Box sx={{ mb: 4 }}>
            <Box
              component="img"
              src={event.image || ''}
              alt={event.name}
              sx={{
                width: '100%',
                height: 400,
                objectFit: 'cover',
                borderRadius: 2,
                mb: 3,
              }}
            />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Chip
                label={event.status}
                color={
                  event.status === 'published'
                    ? 'success'
                    : event.status === 'canceled'
                    ? 'error'
                    : 'info'
                }
                variant="outlined"
              />
              <Typography variant="body2" color="text.secondary">
                {event.max_participants} spots available
              </Typography>
            </Box>

            <Typography variant="h3" fontWeight={700} gutterBottom>
              {event.name}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CalendarToday fontSize="small" color="action" sx={{ mr: 1 }} />
                <Typography variant="body1">
                  {new Date(event.start_date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOn fontSize="small" color="action" sx={{ mr: 1 }} />
                <Typography variant="body1">{event.location || 'Online Event'}</Typography>
              </Box>
            </Box>

            <Tabs value={value} onChange={handleChange} sx={{ mb: 3 }}>
              <Tab label="About" />
              <Tab label="Schedule" />
              <Tab label="FAQs" />
              <Tab label="Organizer" />
            </Tabs>

            <Box sx={{ mb: 4 }}>
              {value === 0 && (
                <>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                    About this event
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    {event.description}
                  </Typography>
                </>
              )}

              {value === 1 && event.schedule && (
                <Box>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                    Event Schedule
                  </Typography>
                  {event.schedule.map((item, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <Typography fontWeight={500}>{item.time}</Typography>
                      <Typography color="text.secondary">{item.activity}</Typography>
                    </Box>
                  ))}
                </Box>
              )}

              {value === 2 && event.faqs && (
                <Box>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                    Frequently Asked Questions
                  </Typography>
                  {event.faqs.map((faq, index) => (
                    <Accordion key={index}>
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography fontWeight={500}>{faq.question}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography color="text.secondary">{faq.answer}</Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Box>
              )}

              {value === 3 && event.organizer && (
                <Box>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                    Organizer Details
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      component="img"
                      src={event.organizer.avatar}
                      alt={event.organizer.name}
                      sx={{ width: 56, height: 56, borderRadius: '50%' }}
                    />
                    <Box>
                      <Typography fontWeight={600}>{event.organizer.name}</Typography>
                      <Typography color="text.secondary">{event.organizer.bio}</Typography>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Box sx={{ position: 'sticky', top: 80 }}>
            <Box
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                p: 3,
                mb: 3,
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Registration
              </Typography>

              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  {event.registeredParticipants} registered
                </Typography>
                •
                <Typography variant="body2" color="text.secondary">
                  {event.max_participants - event.registeredParticipants} spots left
                </Typography>
              </Box>

              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={handleRegisterClick}
                sx={{ mb: 2 }}
              >
                Register Now
              </Button>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ '& > div': { mb: 1 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Date</Typography>
                  <Typography variant="body2">
                    {new Date(event.start_date).toLocaleDateString()}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Location</Typography>
                  <Typography variant="body2">{event.location}</Typography>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                p: 3,
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Share with friends
              </Typography>
              {/* Add social sharing buttons here */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EventDetail;
