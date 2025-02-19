import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import {
  Grid,
  Button,
  CircularProgress,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { RHFTextField } from '@common/components/lib/react-hook-form';
import useEvents, { CreateOneInput } from '@modules/events/hooks/api/useEvents';
import useUploads from '@modules/uploads/hooks/api/useUploads';
import { useRouter } from 'next/router';
import Routes from '@common/defs/routes';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import useAuth from '@modules/auth/hooks/api/useAuth';
import ImageUploadField from '@modules/events/components/partials/ImageUploadField';
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

  const onSubmit: SubmitHandler<CreateOneInput> = async (data) => {
    try {
      setSubmissionError(null);
      setImageUploadError(null);

      let imageUrl = null;
      if (data.image instanceof File) {
        const uploadResponse = await uploadImage({ file: data.image });
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

      const createResponse = await createEvent(formattedData);
      if (!createResponse.success) {
        throw new Error(createResponse.errors?.[0] || "Échec de la création de l'événement");
      }

      router.push(Routes.Events.ReadAll);
    } catch (error: any) {
      console.error('Form submission error:', error.message);
      setSubmissionError(error.message || 'Une erreur est survenue');
      setError('root', { type: 'manual', message: error.message });
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} sx={{ padding: 6 }}>
          {/* Error Messages */}
          {submissionError && (
            <Grid item xs={12}>
              <Typography color="error">{submissionError}</Typography>
            </Grid>
          )}
          {imageUploadError && (
            <Grid item xs={12}>
              <Typography color="error">{imageUploadError}</Typography>
            </Grid>
          )}

          {/* Accordion for Event Details */}
          <Grid item xs={12}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="event-details">
                <Typography variant="h6">Détails de l'événement</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <RHFTextField name="name" label="Nom de l'événement" fullWidth />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <RHFTextField
                      name="description"
                      label="Description"
                      multiline
                      rows={4}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ImageUploadField name="image" label={t('event:image')} />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>

          {/* Accordion for Date & Time */}
          <Grid item xs={12}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="date-time">
                <Typography variant="h6">Date et heure</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <RHFTextField
                      name="start_date"
                      label="Date de début"
                      type="datetime-local"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <RHFTextField
                      name="end_date"
                      label="Date de fin"
                      type="datetime-local"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>

          {/* Accordion for Participants */}
          <Grid item xs={12}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="participants">
                <Typography variant="h6">Participants</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <RHFTextField
                      name="max_participants"
                      label="Nombre maximum de participants"
                      type="number"
                      inputProps={{ min: 1 }}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={methods.formState.isSubmitting}
              startIcon={methods.formState.isSubmitting && <CircularProgress size={20} />}
            >
              {methods.formState.isSubmitting ? 'Envoi en cours...' : 'Créer événement'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
};

export default CreateEventForm;
