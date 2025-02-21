import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import useAuth from '@modules/auth/hooks/api/useAuth';
import { setUserLanguage } from '@common/components/lib/utils/language';
import Routes from '@common/defs/routes';

// MUI Components
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuItem,
  Toolbar,
  Badge,
  ListItemIcon,
} from '@mui/material';

// Icons
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import TranslateIcon from '@mui/icons-material/Translate';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';
import AddCircleOutlined from '@mui/icons-material/AddCircleOutlined';

// Components
import Notification from '@common/layout/Notification';
import Logo from '@common/assets/svgs/Logo';
import CreateEventModal from '@modules/events/components/CreateEventModal';
import Image from 'next/image';

const Topbar = () => {
  const { t } = useTranslation(['topbar']);
  const router = useRouter();
  const { user, logout } = useAuth();
  const userRole = user?.rolesNames[0];

  // State
  const [showDrawer, setShowDrawer] = useState(false);
  const [languageAnchor, setLanguageAnchor] = useState<HTMLButtonElement | null>(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState<HTMLButtonElement | null>(null);

  // Handlers
  const toggleDrawer = () => setShowDrawer((prev) => !prev);
  // const navigate = (path) => router.push(path);

  // Language menu handlers
  const handleLanguageMenu = (event: React.MouseEvent<HTMLButtonElement>) =>
    setLanguageAnchor(event.currentTarget);
  const closeLanguageMenu = () => setLanguageAnchor(null);
  const changeLanguage = (lang:string) => {
    setUserLanguage(lang);
    closeLanguageMenu();
  };

  // User menu handlers
  const handleUserMenu = (event: React.MouseEvent<HTMLButtonElement>) =>
    setUserMenuAnchor(event.currentTarget);
  const closeUserMenu = () => setUserMenuAnchor(null);
  // handle modal create event
  const [isOpenCreateEventModal, setIsOpenCreateEventModal] = useState(false);

  const openModalCreateEventModal = () => setIsOpenCreateEventModal(true);
  const closeModalCreateEventModal = () => setIsOpenCreateEventModal(false);
  // Safe navigation handler that validates routes before navigation

  const navigate = (path:string) => {
    if (path && typeof path === 'string') {
      router.push(path);
    } else {
      console.error('Invalid navigation path:', path);
    }
  };
  return (
    <AppBar
      position="sticky"
      sx={{
        boxShadow: (theme) => theme.customShadows.z1,
        backgroundColor: 'common.white',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo and Main Navigation */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* <Logo
            id="topbar-logo"
            onClick={() => navigate(Routes.Common.Home)}
            sx={{ cursor: 'pointer', mr: 6 }}
          /> */}

          <Box
            sx={{
              cursor: 'pointer',
              mr: 6,
              width: 140,
              height: 60,
              position: 'relative',
            }}
            onClick={() => navigate(Routes.Common.Home)}
          >
            <Image
              id="topbar-logo"
              src="/logo.png"
              alt="Company Logo"
              fill
              style={{ objectFit: 'contain' }}
              priority
              sizes="60"
            />
          </Box>
          {/* Desktop Navigation Links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <Button onClick={() => navigate(Routes.Common.Home)} startIcon={<HomeIcon />}>
              {t('topbar:home')}
            </Button>
            <Button onClick={() => navigate(Routes.Events.ReadAll)} startIcon={<EventIcon />}>
              {t('topbar:events')}
            </Button>

            {/* Role-specific navigation */}
            {userRole === 'participant' && (
              <Button onClick={() => navigate(Routes.Events.MyEvents)} startIcon={<EventIcon />}>
                {t('topbar:my_events')}
              </Button>
            )}

            {userRole === 'organizer' && (
              <Button
                onClick={() => navigate(Routes.Organizer.Dashboard)}
                startIcon={<DashboardIcon />}
              >
                {t('topbar:Dashboard')}
              </Button>
            )}

            {userRole === 'admin' && (
              <Button
                onClick={() => navigate(Routes.Admin.Dashboard)}
                startIcon={<DashboardIcon />}
              >
                {t('topbar:dashboard')}
              </Button>
            )}
          </Box>
        </Box>

        {/* Right side controls */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Create Event Button - Moved earlier in the right section */}
          {userRole === 'organizer' && (
            <>
              {' '}
              <Button
                variant="contained"
                color="primary"
                // onClick={() => navigate(Routes.Events.Create)}
                onClick={() => openModalCreateEventModal()}
                startIcon={<AddCircleOutlined />}
                sx={{ mr: 2 }}
              >
                {t('topbar:create_event')}
              </Button>
              <CreateEventModal
                open={isOpenCreateEventModal}
                onClose={closeModalCreateEventModal}
              />
            </>
          )}

          {/* Language Selector */}
          <IconButton onClick={handleLanguageMenu} sx={{ mx: 1 }}>
            <TranslateIcon />
          </IconButton>
          <Menu
            anchorEl={languageAnchor}
            open={Boolean(languageAnchor)}
            onClose={closeLanguageMenu}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <MenuItem onClick={() => changeLanguage('en')}>
              🇺🇸 {t('topbar:language_english')}
            </MenuItem>
            <MenuItem onClick={() => changeLanguage('fr')}>
              🇫🇷 {t('topbar:language_french')}
            </MenuItem>
            <MenuItem onClick={() => changeLanguage('es')}>
              🇪🇸 {t('topbar:language_spanish')}
            </MenuItem>
          </Menu>

          {/* Notification */}
          <Box sx={{ mx: 1 }}>
            <Notification />
          </Box>

          {/* User Menu */}
          {user ? (
            <>
              <IconButton onClick={handleUserMenu} sx={{ ml: 1 }}>
                <Badge badgeContent={userRole} color="primary">
                  <AccountCircleIcon />
                </Badge>
              </IconButton>
              <Menu
                anchorEl={userMenuAnchor}
                open={Boolean(userMenuAnchor)}
                onClose={closeUserMenu}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              >
                <MenuItem
                  onClick={() => {
                    navigate(Routes.Users.Me);
                    closeUserMenu();
                  }}
                >
                  <ListItemIcon>
                    <AccountCircleIcon fontSize="small" />
                  </ListItemIcon>
                  {t('topbar:profile')}
                </MenuItem>
                {userRole === 'admin' && (
                  <MenuItem
                    onClick={() => {
                      navigate(Routes.Admin.Dashboard);
                      closeUserMenu();
                    }}
                  >
                    <ListItemIcon>
                      <DashboardIcon fontSize="small" />
                    </ListItemIcon>
                    {t('topbar:dashboard')}
                  </MenuItem>
                )}
                <MenuItem
                  onClick={() => {
                    logout();
                    closeUserMenu();
                  }}
                >
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  {t('topbar:logged.logout')}
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button variant="outlined" onClick={() => navigate(Routes.Auth.Login)}>
                {t('topbar:login')}
              </Button>
              <Button variant="contained" onClick={() => navigate(Routes.Auth.Register)}>
                {t('topbar:register')}
              </Button>
            </Box>
          )}

          {/* Mobile Menu Toggle */}
          <IconButton onClick={toggleDrawer} sx={{ display: { xs: 'flex', md: 'none' }, ml: 1 }}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={showDrawer} onClose={toggleDrawer}>
        <List sx={{ width: 250, pt: 2 }}>
          <ListItem>
            <Button
              fullWidth
              onClick={() => {
                navigate(Routes.Common.Home);
                toggleDrawer();
              }}
              startIcon={<HomeIcon />}
            >
              {t('topbar:home')}
            </Button>
          </ListItem>
          <ListItem>
            <Button
              fullWidth
              onClick={() => {
                navigate(Routes.Events.ReadAll);
                toggleDrawer();
              }}
              startIcon={<EventIcon />}
            >
              {t('topbar:events')}
            </Button>
          </ListItem>

          {userRole === 'organizer' && (
            <>
              <ListItem>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    navigate(Routes.Events.Create);
                    toggleDrawer();
                  }}
                  startIcon={<AddCircleOutlined />}
                >
                  {t('topbar:create_event')}
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  fullWidth
                  onClick={() => {
                    navigate(Routes.Organizer.Dashboard);
                    toggleDrawer();
                  }}
                  startIcon={<DashboardIcon />}
                >
                  {t('topbar:Dashboard')}
                </Button>
              </ListItem>
            </>
          )}

          {userRole === 'participant' && (
            <ListItem>
              <Button
                fullWidth
                onClick={() => {
                  navigate(Routes.Events.MyEvents);
                  toggleDrawer();
                }}
                startIcon={<EventIcon />}
              >
                {t('topbar:my_events')}
              </Button>
            </ListItem>
          )}

          {userRole === 'admin' && (
            <ListItem>
              <Button
                fullWidth
                onClick={() => {
                  navigate(Routes.Admin.Dashboard);
                  toggleDrawer();
                }}
                startIcon={<DashboardIcon />}
              >
                {t('topbar:dashboard')}
              </Button>
            </ListItem>
          )}

          {user ? (
            <>
              <ListItem>
                <Button
                  fullWidth
                  onClick={() => {
                    navigate(Routes.Users.Me);
                    toggleDrawer();
                  }}
                  startIcon={<AccountCircleIcon />}
                >
                  {t('topbar:profile')}
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  fullWidth
                  onClick={() => {
                    logout();
                    toggleDrawer();
                  }}
                  startIcon={<LogoutIcon />}
                >
                  {t('topbar:logged.logout')}
                </Button>
              </ListItem>
            </>
          ) : (
            <>
              <ListItem>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => {
                    navigate(Routes.Auth.Login);
                    toggleDrawer();
                  }}
                >
                  {t('topbar:login')}
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => {
                    navigate(Routes.Auth.Register);
                    toggleDrawer();
                  }}
                >
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