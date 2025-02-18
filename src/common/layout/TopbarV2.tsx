import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import TranslateIcon from '@mui/icons-material/Translate';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EventIcon from '@mui/icons-material/Event'; // For events
import CreateIcon from '@mui/icons-material/Create'; // For create event
import DashboardIcon from '@mui/icons-material/Dashboard'; // For admin dashboard
import Routes from '@common/defs/routes';
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  styled,
  Menu,
  MenuItem,
  Badge,
  Chip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import useAuth from '@modules/auth/hooks/api/useAuth';
import { useTranslation } from 'react-i18next';
import { setUserLanguage } from '@common/components/lib/utils/language';
import Notification from '@common/layout/Notification';
import Logo from '@common/assets/svgs/Logo';

const Topbar = () => {
  const { t } = useTranslation(['topbar']);
  const router = useRouter();
  const { asPath } = router;
  const [showDrawer, setShowDrawer] = useState(false);
  const { user, logout } = useAuth();

  // State for dropdown menus
  const [languageAnchor, setLanguageAnchor] = useState<null | HTMLElement>(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);

  const toggleSidebar = () => setShowDrawer((oldValue) => !oldValue);

  // Handle language dropdown
  const handleLanguageOpen = (event: React.MouseEvent<HTMLElement>) => {
    setLanguageAnchor(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setLanguageAnchor(null);
  };

  // Handle user menu dropdown
  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  // Get user role
  // || 'visitor';
  const userRole = user?.rolesNames[0];

  return (
    <AppBar
      position="sticky"
      sx={{
        boxShadow: (theme) => theme.customShadows.z1,
        backgroundColor: 'common.white',
      }}
    >
      <Toolbar>
        {/* Logo */}
        <Box onClick={() => router.push(Routes.Common.Home)} sx={{ cursor: 'pointer' }}>
          <Logo
            id="topbar-logo"
            onClick={() => router.push(Routes.Common.Home)}
            sx={{ cursor: 'pointer' }}
          />
        </Box>

        {/* Navigation Links */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, marginLeft: 2, gap: 1 }}>
          <Button onClick={() => router.push(Routes.Common.Home)} startIcon={<HomeIcon />}>
            {t('topbar:home')}
          </Button>
          <Button onClick={() => router.push(Routes.Events.ReadAll)} startIcon={<EventIcon />}>
            {t('topbar:events')}
          </Button>

          {/* Organizer Links */}
          {userRole === 'organizer' && (
            <Button onClick={() => router.push(Routes.Events.Create)} startIcon={<CreateIcon />}>
              {t('topbar:create_event')}
            </Button>
          )}

          {/* Participant Links */}
          {userRole === 'participant' && (
            <Button onClick={() => router.push(Routes.Events.MyEvents)} startIcon={<EventIcon />}>
              {t('topbar:my_events')}
            </Button>
          )}

          {/* Admin Links */}
          {userRole === 'admin' && (
            <Button
              onClick={() => router.push(Routes.Admin.Dashboard)}
              startIcon={<DashboardIcon />}
            >
              {t('topbar:dashboard')}
            </Button>
          )}
        </Box>

        {/* Language Dropdown */}
        <IconButton onClick={handleLanguageOpen} sx={{ marginLeft: 'auto' }}>
          <TranslateIcon />
        </IconButton>
        <Menu
          anchorEl={languageAnchor}
          open={Boolean(languageAnchor)}
          onClose={handleLanguageClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <MenuItem
            onClick={() => {
              setUserLanguage('fr');
              handleLanguageClose();
            }}
          >
            🇫🇷 {t('topbar:language_french')}
          </MenuItem>
          <MenuItem
            onClick={() => {
              setUserLanguage('en');
              handleLanguageClose();
            }}
          >
            🇺🇸 {t('topbar:language_english')}
          </MenuItem>
          <MenuItem
            onClick={() => {
              setUserLanguage('es');
              handleLanguageClose();
            }}
          >
            🇪🇸 {t('topbar:language_spanish')}
          </MenuItem>
        </Menu>

        {/* Notification Icon */}
        <Box sx={{ marginLeft: 2 }}>
          <Notification />
        </Box>

        {/* User Menu Dropdown */}
        {user ? (
          <>
            <IconButton onClick={handleUserMenuOpen}>
              <Badge badgeContent={userRole} color="primary">
                <AccountCircleIcon />
              </Badge>
            </IconButton>
            <Menu
              anchorEl={userMenuAnchor}
              open={Boolean(userMenuAnchor)}
              onClose={handleUserMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <MenuItem onClick={() => router.push(Routes.Users.Me)}>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                {t('topbar:profile')}
              </MenuItem>
              {userRole === 'admin' && (
                <MenuItem onClick={() => router.push(Routes.Admin.Dashboard)}>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  {t('topbar:dashboard')}
                </MenuItem>
              )}
              <MenuItem onClick={logout}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                {t('topbar:logged.logout')}
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button onClick={() => router.push(Routes.Auth.Login)}>{t('topbar:login')}</Button>
            <Button onClick={() => router.push(Routes.Auth.Register)}>
              {t('topbar:register')}
            </Button>
          </>
        )}

        {/* Mobile Menu Toggle */}
        <IconButton onClick={toggleSidebar} sx={{ display: { md: 'none' } }}>
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={showDrawer} onClose={() => setShowDrawer(false)}>
        <List>
          <ListItem>
            <Button onClick={() => router.push(Routes.Common.Home)}>{t('topbar:home')}</Button>
          </ListItem>
          <ListItem>
            <Button onClick={() => router.push(Routes.Events.ReadAll)}>{t('topbar:events')}</Button>
          </ListItem>

          {/* Organizer Links */}
          {userRole === 'organizer' && (
            <ListItem>
              <Button onClick={() => router.push(Routes.Events.Create)} startIcon={<CreateIcon />}>
                {t('topbar:create_event')}
              </Button>
            </ListItem>
          )}

          {/* Participant Links */}
          {userRole === 'participant' && (
            <ListItem>
              <Button onClick={() => router.push(Routes.Events.MyEvents)} startIcon={<EventIcon />}>
                {t('topbar:my_events')}
              </Button>
            </ListItem>
          )}

          {/* Admin Links */}
          {userRole === 'admin' && (
            <ListItem>
              <Button
                onClick={() => router.push(Routes.Admin.Dashboard)}
                startIcon={<DashboardIcon />}
              >
                {t('topbar:dashboard')}
              </Button>
            </ListItem>
          )}

          {/* User Links */}
          {user ? (
            <>
              <ListItem>
                <Button onClick={() => router.push(Routes.Users.Me)}>{t('topbar:profile')}</Button>
              </ListItem>
              <ListItem>
                <Button onClick={() => logout()}>logoutss</Button>
              </ListItem>
            </>
          ) : (
            <>
              <ListItem>
                <Button onClick={() => router.push(Routes.Auth.Login)}>{t('topbar:login')}</Button>
              </ListItem>
              <ListItem>
                <Button onClick={() => router.push(Routes.Auth.Register)}>
                  {t('topbar:register')}
                </Button>
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Topbar;
