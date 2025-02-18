// modules/organizer/components/dashboard/DashboardCard.tsx
import { TrendIndicator } from '@modules/organizer/components/dashboard/TrendIndicator';
import { Card, Avatar, Stack, Box, Typography } from '@mui/material';

interface DashboardCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  color?: 'primary' | 'secondary' | 'error' | 'warning';
  trend?: number;
}

export const DashboardCard = ({ icon, title, value, color = 'primary', trend }: DashboardCardProps) => {
  return (
    <Card sx={{ p: 2, height: '100%' }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar
          sx={{
            bgcolor: `${color}.light`,
            color: `${color}.contrastText`,
          }}
        >
          {icon}
        </Avatar>
        <Box>
          <Typography variant="overline" color="text.secondary">
            {title}
          </Typography>
          <Stack direction="row" alignItems="baseline" spacing={1}>
            <Typography variant="h5">{value}</Typography>
            {trend !== undefined && <TrendIndicator trend={trend} />}
          </Stack>
        </Box>
      </Stack>
    </Card>
  );
};
