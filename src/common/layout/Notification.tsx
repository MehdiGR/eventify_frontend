import { useDataContext } from '@common/contexts/DataContext';
import { Notifications } from '@mui/icons-material';
import { Badge, Box, IconButton, ListItem, Popover, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const Notification = () => {
  const { echo } = useDataContext(); // Get echo from context
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    if (!echo) return; // Ensure echo is available before using it
    // (.)new-event-created is reqired because laravel prefixes custom event names with a . when broadcasting.
    const channel = echo.channel('events');
   
    channel.listen('.new-event-created', (event: any) => {
      setNotifications((prev) => [event.message, ...prev]);
    });
    return () => {
      channel.stopListening('.new-event-created'); // Cleanup on unmount
      echo.leaveChannel('events'); // Leave the channel
    };
  }, [echo]);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <ListItem>
        <IconButton onClick={handleOpen}>
          <Badge badgeContent={notifications.length} color="error">
            <Notifications />
          </Badge>
        </IconButton>
      </ListItem>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Box sx={{ p: 2, minWidth: 200 }}>
          <Typography variant="h6">Notifications</Typography>
          {notifications.length === 0 ? (
            <Typography color="textSecondary">No new notifications</Typography>
          ) : (
            notifications.map((notif, index) => <Typography key={index}>{notif}</Typography>)
          )}
        </Box>
      </Popover>
    </>
  );
};

export default Notification;


