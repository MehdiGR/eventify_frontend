import React, { useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Chip,
  Button,
  Grid,
  Skeleton,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Box,
  Select,
  MenuItem,
  Avatar,
  useTheme,
} from '@mui/material';
import {
  Search,
  CalendarToday,
  LocationOn,
  FilterList,
  ArrowForward,
  CheckCircle,
} from '@mui/icons-material';
import { useSearch } from '@modules/events/hooks/api/useSearch';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
  status: 'upcoming' | 'past' | 'cancelled';
}

export default function MyEvents() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [sortBy, setSortBy] = useState('date');
  const theme = useTheme();

  // Replace with actual data fetching
  const events: Event[] = [];
  const isLoading = false;

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const getStatusColor = (status: Event['status']) => {
    switch (status) {
      case 'upcoming':
        return 'primary';
      case 'past':
        return 'secondary';
      case 'cancelled':
        return 'error';
    }
  };
const {
  filteredData: filteredEvents,
  searchQuery,
  setSearchQuery,
} = useSearch<Event>({
  data: events,
  searchKeys: ['title', 'location', 'date'],
});
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" component="h1" gutterBottom>
            My Events
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Manage and view your upcoming and past events
          </Typography>
        </Grid>

        <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* <TextField
            fullWidth
            variant="outlined"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          /> */}
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            IconComponent={FilterList}
          >
            <MenuItem value="date">Sort by Date</MenuItem>
            <MenuItem value="name">Sort by Name</MenuItem>
          </Select>
        </Grid>
      </Grid>

      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 3 }}
      >
        <Tab label="Upcoming Events" />
        <Tab label="Past Events" />
        <Tab label="Favorites" />
      </Tabs>

      {isLoading ? (
        <Grid container spacing={3}>
          {[1, 2, 3].map((i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Skeleton variant="rectangular" height={200} />
              <Skeleton variant="text" sx={{ mt: 1 }} />
              <Skeleton variant="text" width="60%" />
            </Grid>
          ))}
        </Grid>
      ) : events.length === 0 ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: 8,
            textAlign: 'center',
          }}
        >
          <CheckCircle sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No events found. Start by joining new events!
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {events.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)' },
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    pt: '56.25%',
                    position: 'relative',
                    bgcolor: theme.palette.grey[300],
                  }}
                >
                  <Chip
                    label={event.status}
                    color={getStatusColor(event.status)}
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      fontWeight: 'bold',
                    }}
                  />
                </CardMedia>

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {event.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CalendarToday sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {event.date}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {event.location}
                    </Typography>
                  </Box>
                </CardContent>

                <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                  <Button endIcon={<ArrowForward />} variant="outlined" size="small">
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['topbar', 'footer', 'leftbar', 'event', 'common'])),
  },
});
