import { Box, Grid, Link, TextField, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useRouter } from 'next/router';
import Image from 'next/image';

const EventFooter = () => {
  const { t } = useTranslation(['footer']);
  const theme = useTheme();
  const router = useRouter();

  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        backgroundColor: theme.palette.primary.darker,
        color: 'common.white',
        py: 8,
        mt: 'auto',
      }}
    >
      <Grid container spacing={4} sx={{ maxWidth: 'lg', mx: 'auto', px: 2 }}>
        {/* Brand Column */}
        <Grid item xs={12} md={4}>
          <Box sx={{ mb: 2 }}>
            <Box
              sx={{
                cursor: 'pointer',
                mr: 6,
                width: 140,
                height: 60,
                position: 'relative',
              }}
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
          </Box>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {t('footer:tagline')}
          </Typography>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={6} md={2}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {t('footer:discover')}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Link
              href="#"
              onClick={() => router.push('/events')}
              sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
            >
              {t('footer:all_events')}
            </Link>
            <Link
              href="#"
              onClick={() => router.push('/categories')}
              sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
            >
              {t('footer:categories')}
            </Link>
            <Link
              href="#"
              onClick={() => router.push('/trending')}
              sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
            >
              {t('footer:trending')}
            </Link>
          </Box>
        </Grid>

        {/* Organize */}
        <Grid item xs={6} md={2}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {t('footer:organize')}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Link
              href="#"
              onClick={() => router.push('/create-event')}
              sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
            >
              {t('footer:create_event')}
            </Link>
            <Link
              href="#"
              onClick={() => router.push('/pricing')}
              sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
            >
              {t('footer:pricing')}
            </Link>
            <Link
              href="#"
              onClick={() => router.push('/organizer')}
              sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
            >
              {t('footer:organizer_portal')}
            </Link>
          </Box>
        </Grid>

        {/* Newsletter */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {t('footer:stay_updated')}
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder={t('footer:email_placeholder')}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                color: 'common.white',
                '& fieldset': { borderColor: 'common.white' },
                '&:hover fieldset': { borderColor: 'primary.light' },
              },
            }}
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FacebookIcon sx={{ color: '#1877F2', cursor: 'pointer' }} />
            <InstagramIcon sx={{ color: '#E1306C', cursor: 'pointer' }} />
            <TwitterIcon sx={{ color: '#1DA1F2', cursor: 'pointer' }} />
            <LinkedInIcon sx={{ color: '#0077B5', cursor: 'pointer' }} />
          </Box>
        </Grid>

        {/* Bottom Bar */}
        <Grid item xs={12}>
          <Box
            sx={{
              borderTop: '1px solid',
              borderColor: 'divider',
              pt: 3,
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              gap: 2,
            }}
          >
            <Typography variant="body2">
              © {currentYear} {t('footer:all_rights_reserved')}
            </Typography>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Link href="#" sx={{ cursor: 'pointer' }}>
                {t('footer:privacy')}
              </Link>
              <Link href="#" sx={{ cursor: 'pointer' }}>
                {t('footer:terms')}
              </Link>
              <Link href="#" sx={{ cursor: 'pointer' }}>
                {t('footer:cookies')}
              </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EventFooter;
