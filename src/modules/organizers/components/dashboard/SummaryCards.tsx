import { DashboardCard } from '@modules/organizer/components/dashboard/DashboardCard';
import { AttachMoney, EventNote, PeopleAlt, Upcoming } from '@mui/icons-material';
import { Box, Grid, Skeleton } from '@mui/material';
import React from 'react';

interface Stats {
  totalEvents: number;
  upcomingEvents: number;
  totalParticipants: number;
  revenue: number;
  eventsTrend?: number;
  participantsTrend?: number;
}

interface SummaryCardsProps {
  stats: Stats;
  loading: boolean;
}

export default function SummaryCards({ stats, loading }: SummaryCardsProps) {
  return (
    <Box sx={{ mb: 4 }}>
      <Grid container spacing={3}>
        {loading ? (
          [1, 2, 3, 4].map((i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 1 }} />
            </Grid>
          ))
        ) : (
          <>
            <Grid item xs={12} sm={6} md={3}>
              <DashboardCard
                icon={<EventNote fontSize="large" />}
                title="Total Events"
                value={stats.totalEvents}
                trend={stats.eventsTrend}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <DashboardCard
                icon={<Upcoming fontSize="large" />}
                title="Upcoming"
                value={stats.upcomingEvents}
                color="warning"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <DashboardCard
                icon={<PeopleAlt fontSize="large" />}
                title="Participants"
                value={stats.totalParticipants}
                trend={stats.participantsTrend}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <DashboardCard
                icon={<AttachMoney fontSize="large" />}
                title="Total Revenue"
                value={stats.revenue}
                color="primary"
              />
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
}
