import FormProvider, { RHFTextField } from '@common/components/lib/react-hook-form';
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
import useAuth, { RegisterInput } from '@modules/auth/hooks/api/useAuth';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import Routes from '@common/defs/routes';

const RegisterForm = () => {
  const theme = useTheme();
  const { register } = useAuth();
  const { t } = useTranslation(['sign-up', 'common','auth']);

  const RegisterSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('common:email_format_incorrect'))
      .max(191, t('common:field_too_long'))
      .required(t('common:field_required')),
    password: Yup.string()
      .max(191, t('common:field_too_long'))
      .required(t('common:field_required')),
  });

  const methods = useForm<RegisterInput>({
    resolver: yupResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: RegisterInput) => {
    await register(
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
        height: '100vh',
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          md: '1fr 1fr',
        },
        bgcolor: 'background.default',
      }}
    >
      {/* Form Section */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: { xs: 4, md: 8 },
          bgcolor: 'background.paper',
          minHeight: '100vh',
        }}
      >
        <Card
          sx={{
            p: 4,
            width: '100%',
            maxWidth: 500,
            mx: 'auto',
            boxShadow: 'none',
            bgcolor: 'transparent',
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
                width: 64,
                height: 64,
                boxShadow: theme.shadows[3],
              }}
            >
              <LockOpen sx={{ color: 'common.white', fontSize: 32 }} />
            </Avatar>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
              {t('sign-up:title')}
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
                  autoComplete="new-password"
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
                  {t('sign-up:create_account')}
                </LoadingButton>
              </Grid>

              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    textAlign: 'center',
                    mt: 2,
                  }}
                >
                  {t('sign-up:already_have_account')}{' '}
                  <Link
                    href={Routes.Auth.Login}
                    sx={{
                      color: 'primary.main',
                      '&:hover': {
                        textDecoration: 'none',
                      },
                    }}
                  >
                    {t('auth:login')}
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </FormProvider>
        </Card>
      </Box>
      {/* Image Section */}
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          backgroundImage: 'url(/assets/images/event-login-cover2.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            bgcolor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 1,
          },
        }}
      />
    </Container>
  );
};

export default RegisterForm;
