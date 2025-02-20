import React, { useEffect, useState } from 'react';
import { useDataContext } from '@common/contexts/DataContext';
import { Notifications } from '@mui/icons-material';
import { Badge, Box, IconButton, ListItem, Popover, Typography } from '@mui/material';

const Notification = () => {
  const { echo } = useDataContext(); // Get echo from context
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  useEffect(() => {
    if (!echo) return; // Ensure echo is available
    const channel = echo.channel('events');

    channel.listen('.new-event-created', (event: any) => {
      setNotifications((prev) => [event.message, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    channel.listen('.new-event-registration', (event: any) => {
      setNotifications((prev) => [event.message, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    return () => {
      channel.stopListening('.new-event-created');
      channel.stopListening('.new-event-registration');
      echo.leaveChannel('events');
    };
  }, [echo]);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    // Clear the badge by setting unread count to zero when user opens notifications
    setUnreadCount(0);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <ListItem>
        <IconButton onClick={handleOpen}>
          <Badge badgeContent={unreadCount} color="error">
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
        <Box sx={{ p: 2, minWidth: 250 }}>
          <Typography variant="h6" gutterBottom>
            Notifications
          </Typography>
          {notifications.length === 0 ? (
            <Typography color="textSecondary">No new notifications</Typography>
          ) : (
            notifications.map((notif, index) => (
              <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                {notif}
              </Typography>
            ))
          )}
        </Box>
      </Popover>
    </>
  );
};

export default Notification;
