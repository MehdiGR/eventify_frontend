import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import {
  Grid,
  Button,
  CircularProgress,
  Typography,
  Tabs,
  Tab,
  Box,
  Container,
  Paper,
  Stack,
  Divider,
} from '@mui/material';
import { RHFTextField } from '@common/components/lib/react-hook-form';
import useEvents, { CreateOneInput } from '@modules/events/hooks/api/useEvents';
import useUploads from '@modules/uploads/hooks/api/useUploads';
import { useRouter } from 'next/router';
import Routes from '@common/defs/routes';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import useAuth from '@modules/auth/hooks/api/useAuth';
import ImageUploadField from '@modules/events/components/ImageUploadField';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

// Validation Schema
const schema = Yup.object().shape({
  name: Yup.string().required('Le champ est obligatoire'),
  description: Yup.string().required('Le champ est obligatoire'),
  start_date: Yup.date().typeError('Date invalide').required('Le champ est obligatoire'),
  end_date: Yup.date()
    .typeError('Date invalide')
    .required('Le champ est obligatoire')
    .min(Yup.ref('start_date'), 'La date de fin doit être après la date de début'),
  location: Yup.string().required('Le champ est obligatoire'),
  max_participants: Yup.number()
    .min(1, 'Minimum 1 participant')
    .required('Le champ est obligatoire'),
  image: Yup.mixed()
    .nullable()
    .test('fileSize', 'Le fichier est trop grand', (value) => {
      if (value instanceof File) {
        return value.size <= 5 * 1024 * 1024; // 5MB
      }
      return true;
    })
    .test('fileType', 'Format non supporté', (value) => {
      if (value instanceof File) {
        return ['image/jpeg', 'image/png'].includes(value.type);
      }
      return true;
    }),
  organizer_id: Yup.number().required().positive().integer(),
});

const CreateEventForm = () => {
  const { t } = useTranslation(['event', 'common']);
  const { user } = useAuth();
  const methods = useForm<CreateOneInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      start_date: '',
      end_date: '',
      location: '',
      max_participants: 50,
      image: null,
      organizer_id: user?.id || 0,
    },
  });
  const { handleSubmit, setError } = methods;
  const { createOne: createEvent } = useEvents();
  const { createOne: uploadImage } = useUploads();
  const router = useRouter();
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  const onSubmit: SubmitHandler<CreateOneInput> = async (data) => {
    try {
      setSubmissionError(null);
      setImageUploadError(null);
      let imageUrl = null;
      let image = data.image as any;
      if (image instanceof File) {
        const uploadResponse = await uploadImage({ file: image });
        if (!uploadResponse.success) {
          setImageUploadError("Échec du téléchargement de l'image");
          throw new Error("Échec du téléchargement de l'image");
        }
        if (!uploadResponse.data?.item.url) {
          setImageUploadError("L'URL de l'image est manquante");
          throw new Error("L'URL de l'image est manquante");
        }
        imageUrl = uploadResponse.data.item.url;
      }
      const formattedData = {
        ...data,
        start_date: dayjs(data.start_date).format('YYYY-MM-DD HH:mm:ss'),
        end_date: dayjs(data.end_date).format('YYYY-MM-DD HH:mm:ss'),
        image: imageUrl,
      };
      console.log(formattedData,"formatdata")
      // return
      const createResponse = await createEvent(formattedData);
      if (!createResponse.success) {
        throw new Error(createResponse.errors?.[0] || "Échec de la création de l'événement");
      }
      // router.push(Routes.Events.ReadAll);
    } catch (error: any) {
      console.error('Form submission error:', error.message);
      setSubmissionError(error.message || 'Une erreur est survenue');
      setError('root', { type: 'manual', message: error.message });
    }
  };

  return (
    <FormProvider {...methods}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Créer un nouvel événement
          </Typography>

          {/* Image Upload at Top */}
          <Box sx={{ maxWidth: '300px', mx: 'auto', mb: 4, mt: 2 }}>
            <ImageUploadField name="image" label={t('event:image')} />
          </Box>

          <Divider sx={{ mb: 3 }} />

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={4}>
              {(submissionError || imageUploadError) && (
                <Grid item xs={12}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      bgcolor: '#FFF4F4',
                      borderRadius: 1,
                      border: '1px solid #FFCDD2',
                    }}
                  >
                    <Typography color="error" variant="body2">
                      {submissionError || imageUploadError}
                    </Typography>
                  </Paper>
                </Grid>
              )}

              <Grid item xs={12}>
                <Tabs
                  value={activeTab}
                  onChange={(_, newValue) => setActiveTab(newValue)}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                  sx={{ mb: 3 }}
                >
                  <Tab label="Détails" />
                  <Tab label="Date & Heure" />
                  <Tab label="Participants" />
                </Tabs>
              </Grid>

              <Grid item xs={12}>
                {/* Tab 1: Details */}
                <Box hidden={activeTab !== 0} sx={{ display: activeTab === 0 ? 'block' : 'none' }}>
                  <Stack spacing={3}>
                    <RHFTextField name="name" label="Nom de l'événement" fullWidth />
                    <RHFTextField name="location" label="Lieu" fullWidth />
                    <RHFTextField
                      name="description"
                      label="Description"
                      multiline
                      rows={4}
                      fullWidth
                    />
                  </Stack>
                </Box>

                {/* Tab 2: Date & Time */}
                <Box hidden={activeTab !== 1} sx={{ display: activeTab === 1 ? 'block' : 'none' }}>
                  <Stack spacing={3}>
                    <RHFTextField
                      name="start_date"
                      label="Date de début"
                      type="datetime-local"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <RHFTextField
                      name="end_date"
                      label="Date de fin"
                      type="datetime-local"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Stack>
                </Box>

                {/* Tab 3: Participants */}
                <Box hidden={activeTab !== 2} sx={{ display: activeTab === 2 ? 'block' : 'none' }}>
                  <Stack spacing={3}>
                    <RHFTextField
                      name="max_participants"
                      label="Nombre maximum de participants"
                      type="number"
                      fullWidth
                    />
                  </Stack>
                </Box>
              </Grid>

              <Grid item xs={12} sx={{ mt: 2 }}>
                <Divider sx={{ mb: 3 }} />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  sx={{ py: 1.5 }}
                >
                  {methods.formState.isSubmitting ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Créer l'événement"
                  )}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </FormProvider>
  );
};

export default CreateEventForm;
