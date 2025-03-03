// Sidebar.tsx
import useAuth from '@modules/auth/hooks/api/useAuth';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
// import { useAuth } from '@modules/auth/hooks/api/useAuth';
import { useRouter } from 'next/router';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  variant: "permanent" | "persistent" | "temporary" ;
}

const Sidebar = ({ open, onClose, variant  }: SidebarProps) => {
  const { user } = useAuth();
  const router = useRouter();
  const userRole = user?.rolesNames[0];

  const adminMenuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, link: '/admin/dashboard' },
    { text: 'Users', icon: <PeopleIcon />, link: '/admin/users' },
  ];

  const organizerMenuItems = [
    { text: 'My Events', icon: <EventIcon />, link: '/organizer/events' },
  ];

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      variant={variant}
      sx={{
        '& .MuiDrawer-paper': {
          width: 240,
          bgcolor: 'background.default',
          borderRight: 'none',
        },
      }}
    >
      <List>
        {(userRole === 'admin' ? adminMenuItems : organizerMenuItems)?.map((item) => (
          <ListItemButton
            key={item.text}
            onClick={() => {
              router.push(item.link);
              onClose();
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
