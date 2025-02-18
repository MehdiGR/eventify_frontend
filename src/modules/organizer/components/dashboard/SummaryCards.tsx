import ProgressBar from '@common/components/lib/feedbacks/ProgressBar';
import { DashboardCard } from '@modules/organizer/components/dashboard/DashboardCard';
import { AttachMoney, EventNote, PeopleAlt, Upcoming } from '@mui/icons-material';
import { Box, Grid } from '@mui/material';
import React from 'react';

export default function SummaryCards({ stats, loading }: { stats: any; loading: boolean }) {
  if (loading) {
    return (
      <ProgressBar />
    );
  }
  return (
    <Box sx={{ mb: 4 }}>
      <Grid container spacing={3}>
        {/* Total Events */}
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            icon={<EventNote fontSize="large" />}
            title="Total Events"
            value={stats.totalEvents}
            trend={stats.eventsTrend}
          />
        </Grid>

        {/* Upcoming Events */}
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            icon={<Upcoming fontSize="large" />}
            title="Upcoming"
            value={stats.upcomingEvents}
            color="warning"
          />
        </Grid>

        {/* Participants */}
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            icon={<PeopleAlt fontSize="large" />}
            title="Participants"
            value={stats.totalParticipants}
            trend={stats.participantsTrend}
          />
        </Grid>

        {/* Revenue (if applicable) */}
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            icon={<AttachMoney fontSize="large" />}
            title="Total Revenue"
            value={stats.revenue}
            color="primary"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
