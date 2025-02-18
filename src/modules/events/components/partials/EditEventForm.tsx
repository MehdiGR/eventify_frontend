import { RHFCheckbox, RHFTextField } from '@common/components/lib/react-hook-form';
import UpdateCrudItemForm from '@common/components/partials/UpdateCrudItemForm';
import Routes from '@common/defs/routes';
import { ItemResponse } from '@common/hooks/useItems';
import { Event } from '@modules/events/defs/types';
import useEvents, { UpdateOneInput } from '@modules/events/hooks/api/useEvents';
import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { UseFormReturn } from 'react-hook-form';
import * as Yup from 'yup';

interface EditEventFormProps {
  item: Event; // The event to be edited
}

const EditEventForm = ({ item }: EditEventFormProps) => {
  const router = useRouter();

  const schema = Yup.object().shape({
    name: Yup.string().required('Le nom est obligatoire'),
    description: Yup.string().optional(),
    start_date: Yup.string()
      .required('La date de début est obligatoire')
      .matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, 'Format invalide (YYYY-MM-DDTHH:mm)'),
    end_date: Yup.string()
      .required('La date de fin est obligatoire')
      .matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, 'Format invalide (YYYY-MM-DDTHH:mm)')
      .test(
        'end-date-after-start-date',
        'La date de fin doit être après la date de début',
        function (value) {
          const { start_date } = this.parent;
          return !start_date || !value || new Date(value) > new Date(start_date);
        }
      ),
    is_private: Yup.boolean().optional(),
  });

  const defaultValues: UpdateOneInput = {
    name: item.name,
    description: item.description,
    start_date: item.start_date,
    end_date: item.end_date,
    // is_private: item.is_private,
  };

  const onPostSubmit = async (
    _data: UpdateOneInput,
    response: ItemResponse<Event>,
    _methods: UseFormReturn<UpdateOneInput>
  ) => {
    if (response.success) {
      router.push(Routes.Events.ReadAll); 
    }
  };

  return (
    <>
      <UpdateCrudItemForm<Event, UpdateOneInput>
        item={item}
        routes={Routes.Events}
        useItems={useEvents}
        schema={schema}
        defaultValues={defaultValues}
        onPostSubmit={onPostSubmit}
      >
        <Grid container spacing={3} sx={{ padding: 6 }}>
          {/* Name Field */}
          <Grid item xs={12}>
            <RHFTextField name="name" label="Nom de l'événement" />
          </Grid>

          {/* Description Field */}
          <Grid item xs={12}>
            <RHFTextField name="description" label="Description" multiline rows={4} />
          </Grid>

          {/* Start Date Field */}
          <Grid item xs={6}>
            <RHFTextField
              name="start_date"
              label="Date de début"
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {/* End Date Field */}
          <Grid item xs={6}>
            <RHFTextField
              name="end_date"
              label="Date de fin"
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {/* Private Event Checkbox */}
          <Grid item xs={12}>
            <RHFCheckbox name="is_private" label="Événement privé" />
          </Grid>
        </Grid>
      </UpdateCrudItemForm>
    </>
  );
};

export default EditEventForm;
