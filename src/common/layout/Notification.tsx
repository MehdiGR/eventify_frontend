import React, { useEffect, useState } from 'react';
import { useDataContext } from '@common/contexts/DataContext';
import { Notifications } from '@mui/icons-material';
import { Badge, Box, IconButton, ListItem, Popover, Typography } from '@mui/material';
import useAuth from '@modules/auth/hooks/api/useAuth';

const Notification = () => {
  const { echo } = useDataContext();
  const { user } = useAuth();
  const role=user?.rolesNames[0]
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);

 useEffect(() => {
   if (!echo || !user) return;

  //  console.log('User ID:', user.id);
  //  console.log('User Role:', role);

   // Listen to public events
   const publicChannel = echo.channel('events');
   publicChannel.listen('.new-event-created', (event: any) => {
     console.log('Received Public Event:', event);
     setNotifications((prev) => [event.message, ...prev]);
     setUnreadCount((prev) => prev + 1);
   });

   // Listen to private organizer channel
   let OrganizationChannel: any;
   if (role === 'organizer') {
     const channelName = `organizer.${user.id}`;
     // private channel disabled until configure the authorization
    //  privateChannel = echo.private(channelName);
     OrganizationChannel = echo.channel(channelName);
     OrganizationChannel.listen('.new-event-registration', (event: any) => {
       console.log('Received Private Event:', event);
       setNotifications((prev) => [event.message, ...prev]);
       setUnreadCount((prev) => prev + 1);
     });

     // Debugging authentication errors
     OrganizationChannel.error((error: any) => {
       console.error('Private channel auth error:', error);
     });
   }

   return () => {
     publicChannel.stopListening('.new-event-created');
     echo.leaveChannel('events');
     if (OrganizationChannel) {
       OrganizationChannel.stopListening('.new-event-registration');
       echo.leaveChannel(`organizer.${user.id}`);
     }
   };
 }, [echo, user]);


  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    // Clear unread notifications when the popover opens
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
