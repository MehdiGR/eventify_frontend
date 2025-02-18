import { RHFTextField } from '@common/components/lib/react-hook-form';
import CreateCrudItemForm from '@common/components/partials/CreateCrudItemForm';
import Routes from '@common/defs/routes';
import { Event } from '@modules/events/defs/types';
import useEvents, { CreateOneInput } from '@modules/events/hooks/api/useEvents';
import { Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import ImageUploadField from '@modules/events/components/partials/ImageUploadField';

interface CreateEventFormProps {
  onSubmitSuccess?: () => void;
}

interface TabPanelProps {
  children: React.ReactNode;
  value: number;
  index: number;
}

const TabPanel = ({ children, value, index }: TabPanelProps) => (
  <Box role="tabpanel" hidden={value !== index} sx={{ pt: 2 }}>
    {value === index && children}
  </Box>
);

const CreateEventForm = ({ onSubmitSuccess }: CreateEventFormProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const { t } = useTranslation(['event', 'common']);

  const schema = Yup.object().shape({
    name: Yup.string().required(t('event:name_required')),
    description: Yup.string().optional(),
    start_date: Yup.string()
      .required(t('event:start_date_required'))
      .matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, t('event:invalid_date_format')),
    end_date: Yup.string()
      .required(t('event:end_date_required'))
      .matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, t('event:invalid_date_format'))
      .test('end-date-after-start-date', t('event:end_date_after_start_date'), function (value) {
        const { start_date } = this.parent;
        return !start_date || !value || new Date(value) > new Date(start_date);
      }),
  });

  const defaultValues: CreateOneInput = {
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    image: null,
  };

  return (
    <CreateCrudItemForm<Event, CreateOneInput>
      routes={Routes.Events}
      useItems={useEvents}
      schema={schema}
      defaultValues={defaultValues}
      onPostSubmit={onSubmitSuccess}
    >
      <Box component="form" id="create-event-form">
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
            <Tab label={t('event:info')} />
            <Tab label={t('event:details')} />
            <Tab label={t('event:media')} />
          </Tabs>
        </Box>

        <TabPanel value={activeTab} index={0}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <RHFTextField name="name" label={t('event:name')} fullWidth />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <RHFTextField
                name="start_date"
                label={t('event:start_date')}
                type="datetime-local"
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
              <RHFTextField
                name="end_date"
                label={t('event:end_date')}
                type="datetime-local"
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Box>
          </Box>
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <RHFTextField
            name="description"
            label={t('event:description')}
            multiline
            rows={3}
            fullWidth
          />
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <ImageUploadField name="image" label={t('event:image')} />
        </TabPanel>
      </Box>
    </CreateCrudItemForm>
  );
};

export default CreateEventForm;
