import { RHFTextField } from '@common/components/lib/react-hook-form';
import { Grid } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface Step2Props {}

const Step2 = (_props: Step2Props) => {
  const { t } = useTranslation(['event']);
  const { control } = useFormContext();

  return (
    <Grid container spacing={3} sx={{ padding: 6 }}>
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
      <Grid item xs={12}>
        <RHFTextField name="location" label="Lieu" fullWidth />
      </Grid>
    </Grid>
  );
};

export default Step2;
