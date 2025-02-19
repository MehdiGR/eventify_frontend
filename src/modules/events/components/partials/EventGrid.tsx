// import { Event } from '@modules/events/defs/types';
// import { Box, Grid } from '@mui/material';
import EventCard from '../EventCard';

// interface EventGridProps {
//   events: Event[] | null;
// }

// const EventGrid = ({ events }: EventGridProps) => {
//   return (
//     <Box>
//       <Grid container spacing={4}>
//         {events?.map((event) => (
//           <Grid item key={event.id} xs={12} sm={6} md={4} lg={3}>
//             <EventCard event={event} />
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default EventGrid;

import React, { useEffect, useState } from 'react';
import { Grid, Container, Typography, Box } from '@mui/material';
import useEvents from '@modules/events/hooks/api/useEvents';
import useProgressBar from '@common/hooks/useProgressBar';
import { Event } from '@modules/events/defs/types';
// interface EventsProps{
//   events:Event[]
// }
const EventsGrid = () => {
  // Sample event data
  // const events = [
  //   {
  //     id: 1,
  //     name: 'Web Development Workshop - React & Next.js',
  //     description:
  //       'Learn to build modern web applications with React and Next.js. This workshop covers component design, routing, and state management.',
  //     // category: 'Workshop',
  //     start_date: '2023-09-15T10:00:00',
  //     end_date: '2023-09-15T10:00:00',
  //     organizer_id: 1,
  //     imageUrl:
  //       'https://images.pexels.com/photos/57980/pexels-photo-57980.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  //     createdAt: '2025-01-01',
  //     updatedAt: '2025-01-01',
  //     // organizer: { email: 'test@mail.com', rolesNames: ROLE.ORGANIZER, permissionsNames: [''] },
  //     // image: '/api/placeholder/400/250',
  //     // imageUrl: '/api/placeholder/400/250',
  //     // location: 'Tech Hub Downtown',
  //     // price: 25,
  //     // attendees: 42,
  //   },
  //   {
  //     id: 2,
  //     name: 'Web Development Workshop - React & Next.js',
  //     description:
  //       'Learn to build modern web applications with React and Next.js. This workshop covers component design, routing, and state management.',
  //     // category: 'Workshop',
  //     start_date: '2023-09-15T10:00:00',
  //     end_date: '2023-09-15T10:00:00',
  //     organizer_id: 1,
  //     imageUrl:
  //       'https://images.pexels.com/photos/57980/pexels-photo-57980.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  //     createdAt: '2025-01-01',
  //     updatedAt: '2025-01-01',
  //     // organizer: { email: 'test@mail.com', rolesNames: ROLE.ORGANIZER, permissionsNames: [''] },
  //     // image: '/api/placeholder/400/250',
  //     // imageUrl: '/api/placeholder/400/250',
  //     // location: 'Tech Hub Downtown',
  //     // price: 25,
  //     // attendees: 42,
  //   },
  //   {
  //     id: 3,
  //     name: 'Web Development Workshop - React & Next.js',
  //     description:
  //       'Learn to build modern web applications with React and Next.js. This workshop covers component design, routing, and state management.',
  //     // category: 'Workshop',
  //     start_date: '2023-09-15T10:00:00',
  //     end_date: '2023-09-15T10:00:00',
  //     organizer_id: 1,
  //     imageUrl:
  //       'https://images.pexels.com/photos/57980/pexels-photo-57980.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  //     createdAt: '2025-01-01',
  //     updatedAt: '2025-01-01',
  //     // organizer: { email: 'test@mail.com', rolesNames: ROLE.ORGANIZER, permissionsNames: [''] },
  //     // image: '/api/placeholder/400/250',
  //     // imageUrl: '/api/placeholder/400/250',
  //     // location: 'Tech Hub Downtown',
  //     // price: 25,
  //     // attendees: 42,
  //   },
  //   {
  //     id: 4,
  //     name: 'Web Development Workshop - React & Next.js',
  //     description:
  //       'Learn to build modern web applications with React and Next.js. This workshop covers component design, routing, and state management.',
  //     // category: 'Workshop',
  //     start_date: '2023-09-15T10:00:00',
  //     end_date: '2023-09-15T10:00:00',
  //     organizer_id: 1,
  //     imageUrl:
  //       'https://images.pexels.com/photos/57980/pexels-photo-57980.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  //     createdAt: '2025-01-01',
  //     updatedAt: '2025-01-01',
  //     // organizer: { email: 'test@mail.com', rolesNames: ROLE.ORGANIZER, permissionsNames: [''] },
  //     // image: '/api/placeholder/400/250',
  //     // imageUrl: '/api/placeholder/400/250',
  //     // location: 'Tech Hub Downtown',
  //     // price: 25,
  //     // attendees: 42,
  //   },
  //   {
  //     id: 5,
  //     name: 'Web Development Workshop - React & Next.js',
  //     description:
  //       'Learn to build modern web applications with React and Next.js. This workshop covers component design, routing, and state management.',
  //     // category: 'Workshop',
  //     start_date: '2023-09-15T10:00:00',
  //     end_date: '2023-09-15T10:00:00',
  //     organizer_id: 1,
  //     imageUrl:
  //       'https://images.pexels.com/photos/57980/pexels-photo-57980.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  //     createdAt: '2025-01-01',
  //     updatedAt: '2025-01-01',
  //     // organizer: { email: 'test@mail.com', rolesNames: ROLE.ORGANIZER, permissionsNames: [''] },
  //     // image: '/api/placeholder/400/250',
  //     // imageUrl: '/api/placeholder/400/250',
  //     // location: 'Tech Hub Downtown',
  //     // price: 25,
  //     // attendees: 42,
  //   },
  //   // More events...
  // ];
   const { readAll } = useEvents();
   const { start, stop } = useProgressBar();
   const [loaded, setLoaded] = useState(false);
   const [events, setItems] = useState<null | Event[]>(null);

   useEffect(() => {
     if (loaded) {
       stop();
     } else {
       start();
     }
   }, [loaded]);

   useEffect(() => {
     fetchEvents();
   }, []);
   const fetchEvents = async () => {
     const { data } = await readAll();
     console.log(data, 'data');
     if (data) {
       if (data.items) {
         setItems(data.items);
       }
     }
     setLoaded(true);
   };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
    {events &&
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
    }
    </Container >
  );
};

export default EventsGrid;