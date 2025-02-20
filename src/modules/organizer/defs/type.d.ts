// modules/organizer/defs/types.ts
// export interface OrganizerStats {
//   totalEvents: number;
//   upcomingEvents: number;
//   totalParticipants: number;
//   eventsTrend: number;
//   participantsTrend: number;
// }

interface Stats {
  totalEvents: number;
  upcomingEvents: number;
  totalParticipants: number;
  revenue: number;
  // Make trends optional since they're not currently provided by the backend
  eventsTrend?: number;
  participantsTrend?: number;
}

interface SummaryCardsProps {
  stats: Stats;
  loading: boolean;
}