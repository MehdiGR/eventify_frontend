import EventCard from '../EventCard';
import React from 'react';
import { Grid, Container, Typography, Box } from '@mui/material';
import { Event } from '@modules/events/defs/types';

interface EventsGridProps {
  events: Event[];
}

const EventsGrid: React.FC<EventsGridProps> = ({ events }) => {
  // Check if events exists and has items
  const hasEvents = events && events.length > 0;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {hasEvents ? (
        <>
          {/* Featured event section */}
          <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 700 }}>
            Featured Event
          </Typography>
          <Box sx={{ mb: 6 }}>
            <EventCard
              event={events[0]}
              variant="horizontal"
              onBookmark={(id) => console.log(`Bookmarked event ${id}`)}
            />
          </Box>

          {/* Upcoming events grid */}
          <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 700 }}>
            Upcoming Events ({events.length - 1})
          </Typography>
          <Grid container spacing={3}>
            {events.slice(1).map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event.id}>
                <EventCard
                  event={event}
                  onBookmark={(id) => console.log(`Bookmarked event ${id}`)}
                  variant="vertical"
                />
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h5" color="text.secondary">
            No events found
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default EventsGrid;
