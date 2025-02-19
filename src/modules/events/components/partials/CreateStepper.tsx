import FormStepper, { FormStep } from '@common/components/lib/navigation/FormStepper';
import Routes from '@common/defs/routes';
import Step1 from '@modules/events/components/partials/create/Step1';
import Step2 from '@modules/events/components/partials/create/Step2';
import Step3 from '@modules/events/components/partials/create/Step3';

import useEvents, { CreateOneInput } from '@modules/events/hooks/api/useEvents';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

enum CREATE_EVENT_STEP_ID {
  STEP1 = 'step1',
  STEP2 = 'step2',
  STEP3 = 'step3',
}

interface CreateEventStepperProps {}

const CreateEventStepper = (_props: CreateEventStepperProps) => {
  const { createOne } = useEvents();
  const router = useRouter();
  const { t } = useTranslation(['event']);

  const steps: FormStep<CREATE_EVENT_STEP_ID>[] = [
    {
      id: CREATE_EVENT_STEP_ID.STEP1,
      label: t('event:form.step1_label'),
      component: Step1,
    },
    {
      id: CREATE_EVENT_STEP_ID.STEP2,
      label: t('event:form.step2_label'),
      component: Step2,
    },
    {
      id: CREATE_EVENT_STEP_ID.STEP3,
      label: t('event:form.step3_label'),
      component: Step3,
    },
  ];

  const onSubmit = async (data: CreateOneInput) => {
    const response = await createOne(data, {
      displayProgress: true,
      displaySuccess: true,
    });

    if (response.success) {
      router.push(Routes.Events.ReadAll);
      return true;
    }
    return false;
  };

  return (
    <FormStepper<CreateOneInput, CREATE_EVENT_STEP_ID>
      id="create-event-stepper"
      steps={steps}
      onSubmit={onSubmit}
    />
  );
};

export default CreateEventStepper;
