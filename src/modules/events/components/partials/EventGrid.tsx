
import EventCard from '../EventCard';
import React from 'react';
import { Grid, Container, Typography, Box } from '@mui/material';

import { Event } from '@modules/events/defs/types';

interface EventsGridProps {
  events: Event[];
}
const EventsGrid: React.FC<EventsGridProps> = ({ events }) => {  // Sample event data

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {events && (
        <>
          {/* Featured event in horizontal layout */}
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

          {/* Upcoming events grid in vertical layout */}
          <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 700 }}>
            Upcoming Events
          </Typography>
          <Grid container spacing={3}>
            {events.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event.id}>
                <EventCard
                  event={event}
                  onBookmark={(id) => console.log(`Bookmarked event ${id}`)}
                  variant=""
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
}
export default EventsGrid;