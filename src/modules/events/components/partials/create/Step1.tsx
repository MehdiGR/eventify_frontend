import { RHFTextField } from '@common/components/lib/react-hook-form';
import ImageUploadField from '@modules/events/components/partials/ImageUploadField';
import { Grid } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface Step1Props {}

const Step1 = (_props: Step1Props) => {
  const { t } = useTranslation(['event']);
  const { control } = useFormContext();

  return (
    <Grid container spacing={3} sx={{ padding: 6 }}>
      <Grid item xs={12}>
        <RHFTextField name="name" label="Nom de l'événement" fullWidth />
      </Grid>
      <Grid item xs={12}>
        <RHFTextField name="description" label="Description" multiline rows={4} fullWidth />
      </Grid>
      <Grid item xs={12}>
        <ImageUploadField name="image" label={t('event:image')} />
      </Grid>
    </Grid>
  );
};

export default Step1;
