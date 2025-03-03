import { useState } from 'react';
import { useRouter } from 'next/router';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Button, useMediaQuery, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import useAuth from '@modules/auth/hooks/api/useAuth';
import { useTranslation } from 'react-i18next';
import CreateEventModal from '@modules/events/components/CreateEventModal';
import AddIcon from '@mui/icons-material/Add';
import Routes from '@common/defs/routes';
import BecomeOrganizerModal from '@modules/participant/components/becomeOrganizerModal';
import Image from 'next/image';
import DashboardIcon from '@mui/icons-material/Dashboard';

interface TopbarProps {
  isAdmin?: boolean; // ✅ Added prop
  onToggleLeftbar: () => void;
}
const Topbar = ({ isAdmin,  onToggleLeftbar }: TopbarProps)=>{
  const { t, i18n } = useTranslation(['topbar']);
  const { user, logout } = useAuth();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [modalOpen, setModalOpen] = useState({ createEvent: false, becomeOrganizer: false });

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    router.push(router.asPath, undefined, { locale: lang, shallow: true });
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
const navigate = (path: string) => {
  if (path && typeof path === 'string') {
    router.push(path);
  } else {
    console.error('Invalid navigation path:', path);
  }
};
  return (
    <>
      <AppBar position="sticky" color="default" elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
          {/* Left Section */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isMobile && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => navigate(Routes.Common.Home)}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Box
              sx={{
                cursor: 'pointer',
                mr: 6,
                width: 140,
                height: 60,
                position: 'relative',
              }}
              // onClick={() => navigate(Routes.Common.Home)}
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
            {/* Mobile Admin Menu Toggle */}
            {isAdmin && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={onToggleLeftbar} // Ensure this prop is passed from Layout
                sx={{ display: { md: 'none' }, mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button onClick={() => navigate(Routes.Common.Home)}>{t('topbar:home')}</Button>
              <Button onClick={() => navigate(Routes.Events.ReadAll)}>{t('topbar:events')}</Button>
              {user?.role === 'participant' && (
                <Button onClick={() => navigate(Routes.Participant.RegisteredEvents)}>
                  {t('topbar:my_events')}
                </Button>
              )}
              {user?.role === 'organizer' && (
                <Button onClick={() => navigate(Routes.Organizer.Dashboard)}>
                  {t('topbar:dashboard')}
                </Button>
              )}
              {/* Admin Desktop Dashboard Link */}
              {isAdmin && (
                <Button
                  onClick={() => navigate(Routes.Admin.Dashboard)}
                  startIcon={<DashboardIcon />}
                  sx={{ display: { xs: 'none', md: 'flex' } }}
                >
                  {t('topbar:admin_dashboard')}
                </Button>
              )}
            </Box>
          )}

          {/* Right Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Language Selector */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              {['en', 'fr', 'es'].map((lang) => (
                <MenuItem
                  key={lang}
                  selected={i18n.language === lang}
                  onClick={() => handleLanguageChange(lang)}
                >
                  {lang === 'en' ? '🇺🇸 English' : lang === 'fr' ? '🇫🇷 Français' : '🇪🇸 Español'}
                </MenuItem>
              ))}
            </Menu>

            {/* Auth Buttons */}
            {!user ? (
              <>
                <Button onClick={() => navigate(Routes.Auth.Login)}>{t('topbar:login')}</Button>
                <Button variant="contained" onClick={() => navigate(Routes.Auth.Register)}>
                  {t('topbar:register')}
                </Button>
              </>
            ) : (
              <>
                {user.role === 'organizer' && (
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setModalOpen({ ...modalOpen, createEvent: true })}
                  >
                    {t('topbar:create_event')}
                  </Button>
                )}
                {user.role === 'participant' && (
                  <Button
                    variant="outlined"
                    onClick={() => setModalOpen({ ...modalOpen, becomeOrganizer: true })}
                  >
                    {t('topbar:become_organizer')}
                  </Button>
                )}
                <Button onClick={() => logout()} color="error">
                  {t('topbar:logout')}
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Modals */}
      <CreateEventModal
        open={modalOpen.createEvent}
        onClose={() => setModalOpen({ ...modalOpen, createEvent: false })}
      />
      <BecomeOrganizerModal
        open={modalOpen.becomeOrganizer}
        onClose={() => setModalOpen({ ...modalOpen, becomeOrganizer: false })}
      />
    </>
  );
};

export default Topbar;
