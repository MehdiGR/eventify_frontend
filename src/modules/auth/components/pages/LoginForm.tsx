import FormProvider, { RHFTextField } from '@common/components/lib/react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useAuth, { LoginInput } from '@modules/auth/hooks/api/useAuth';
import { LockOpen } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import Routes from '@common/defs/routes';

const LoginForm = () => {
  const theme = useTheme();
  const { login } = useAuth();
  const { t } = useTranslation(['sign-in', 'common','auth']);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('common:email_format_incorrect'))
      .required(t('common:field_required')),
    password: Yup.string().required(t('common:field_required')),
  });

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: LoginInput) => {
    await login(
      {
        email: data.email,
        password: data.password,
      },
      { displayProgress: true, displaySuccess: true }
    );
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        // height: '100vh',

        display: 'flex',
        bgcolor: 'background.default',
        [theme.breakpoints.down('md')]: {
          flexDirection: 'column', // Stack vertically on mobile <button class="citation-flag" data-index="5">
        },
      }}
    >
      {/* Left Section - Login Form */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
          bgcolor: 'background.paper',
          [theme.breakpoints.down('md')]: {
            order: 2, // Move form below image on mobile
          },
        }}
      >
        <Card
          sx={{
            p: 4,
            width: '100%',
            maxWidth: 500,
            boxShadow: 'none',
            borderRadius: 0,
            border: 0,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 4,
            }}
          >
            <Avatar
              sx={{
                bgcolor: 'primary.light',
                mb: 2,
                width: 56,
                height: 56,
                boxShadow: theme.shadows[3],
              }}
            >
              <LockOpen sx={{ color: 'common.white' }} />
            </Avatar>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {t('sign-in:title')}
            </Typography>
          </Box>

          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <RHFTextField
                  name="email"
                  label={t('common:email')}
                  autoComplete="email"
                  autoFocus
                  fullWidth
                  InputProps={{
                    sx: {
                      borderRadius: 1,
                      bgcolor: 'background.default',
                      '&.Mui-focused fieldset': {
                        borderColor: 'primary.main',
                      },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <RHFTextField
                  name="password"
                  label={t('common:password')}
                  type="password"
                  autoComplete="current-password"
                  fullWidth
                  InputProps={{
                    sx: {
                      borderRadius: 1,
                      bgcolor: 'background.default',
                      '&.Mui-focused fieldset': {
                        borderColor: 'primary.main',
                      },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <LoadingButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  loading={isSubmitting}
                  sx={{
                    py: 1.75,
                    borderRadius: 1,
                    bgcolor: 'primary.main',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                  }}
                >
                  {t('sign-in:validate')}
                </LoadingButton>
              </Grid>

              <Grid item xs={12}>
                <Link
                  href={Routes.Auth.RequestPasswordReset}
                  variant="body2"
                  sx={{
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.secondary',
                    mt: 2,
                    '&:hover': {
                      color: 'primary.main',
                      textDecoration: 'none',
                    },
                  }}
                >
                  {t('sign-in:forgot_password_text')}
                </Link>
                <Link
                  href={Routes.Auth.Register}
                  variant="body2"
                  sx={{
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.secondary',
                    mt: 2,
                    '&:hover': {
                      color: 'primary.main',
                      textDecoration: 'none',
                    },
                  }}
                >
                  {t('sign-up:create_an_account')}
                </Link>
              </Grid>
            </Grid>
          </FormProvider>
        </Card>
      </Box>

      {/* Right Section - Event Cover Image */}
      <Box
        sx={{
          flex: 1,
          backgroundImage: 'url(/assets/images/event-login-cover3.jpg)', // Add your image path
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          [theme.breakpoints.down('md')]: {
            height: 200, // Fixed height for mobile view
          },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            bgcolor: 'rgba(0, 0, 0, 0.4)', // Overlay for better contrast
          }}
        />
      </Box>
    </Container>
  );
};

export default LoginForm;
