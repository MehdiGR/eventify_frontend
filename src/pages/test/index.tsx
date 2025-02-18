import { useEffect, useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import axios from 'axios';

const TestEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch events
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token'); // Replace with your token storage logic
      const response = await axios.get('/api/events', {
        headers: {
          Authorization: `Bearer ${token}`, // Include the Bearer token for authentication
        },
      });
      setEvents(response.data.data.items); // Assuming the API returns data in this structure
      setError(null);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError(err.response?.data?.errors || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(); // Fetch events when the component mounts
  }, []);

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Test Events API
        </Typography>
        {loading && <Typography>Loading...</Typography>}
        {error && <Typography color="error">{error}</Typography>}
        {!loading && !error && (
          <>
            <Typography variant="h6">Fetched Events:</Typography>
            <ul>
              {events.map((event) => (
                <li key={event.id}>
                  {event.name} - {event.description}
                </li>
              ))}
            </ul>
          </>
        )}
        <Button variant="contained" onClick={fetchEvents}>
          Refresh
        </Button>
      </Box>
    </Container>
  );
};

export default TestEventsPage;
