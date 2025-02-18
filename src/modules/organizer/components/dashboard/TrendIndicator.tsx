import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { Typography } from '@mui/material';

// modules/common/components/TrendIndicator.tsx
export const TrendIndicator = ({ trend }: { trend: number }) => {
  const isPositive = trend >= 0;

  return (
    <Typography
      variant="caption"
      sx={{
        color: isPositive ? 'success.main' : 'error.main',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {isPositive ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />}
      {Math.abs(trend)}%
    </Typography>
  );
};
