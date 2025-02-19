import { RHFTextField } from '@common/components/lib/react-hook-form';
import { Grid } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface Step3Props {}

const Step3 = (_props: Step3Props) => {
  const { t } = useTranslation(['event']);
  const { control } = useFormContext();

  return (
    <Grid container spacing={3} sx={{ padding: 6 }}>
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
  );
};

export default Step3;
