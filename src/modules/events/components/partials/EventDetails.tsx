import {
  Grid,
  Typography,
  Button,
  Card,
  CardMedia,
  Divider,
  Chip,
  Box,
  IconButton,
} from '@mui/material';
import { CalendarToday, LocationOn, Schedule } from '@mui/icons-material';
import { Event } from '@modules/events/defs/types';

interface EventProps {
  event: Event ;
}



export default function EventDetails({ event }: EventProps) {
  return (
    <Grid container spacing={4} sx={{ p: 4 }}>
      {/* Left Column - Event Details */}
      <Grid item xs={12} md={8}>
        <Card>
          {event?.image &&(
            <CardMedia component="img" height="400" image={event.image} alt={event.title} />)
          }
        </Card>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h3" gutterBottom>
            {event.title}
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Chip
              icon={<CalendarToday />}
              label={new Intl.DateTimeFormat('en-US', {
                dateStyle: 'long',
              }).format(event.startDate)}
            />
            <Chip
              icon={<Schedule />}
              label={new Intl.DateTimeFormat('en-US', {
                timeStyle: 'short',
              }).format(event.startDate)}
            />
            <Chip
              icon={<LocationOn />}
              label={event.locationType === 'online' ? 'Online Event' : event.location}
            />
          </Box>

          <Divider sx={{ my: 4 }} />

          <Typography variant="body1" paragraph>
            {event.description}
          </Typography>

          {/* Add more sections like organizers, schedule, etc. */}
        </Box>
      </Grid>

      {/* Right Column - Registration */}
      <Grid item xs={12} md={4}>
        <Box
          sx={{
            position: 'sticky',
            top: 80,
            border: '1px solid #e0e0e0',
            borderRadius: 2,
            p: 3,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Register Now
          </Typography>

          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 2 }}
            onClick={() => {
              /* Handle registration */
            }}
          >
            Reserve Your Spot
          </Button>

          <Box sx={{ mt: 2, color: 'text.secondary' }}>
            <Typography variant="body2">Free Registration</Typography>
            <Typography variant="caption">
              {event.startDate &&
                `Starts ${new Intl.DateTimeFormat('en-US', {
                  dateStyle: 'full',
                  timeStyle: 'short',
                }).format(event.startDate)}`}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
