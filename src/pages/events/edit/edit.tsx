import withAuth, { AUTH_MODE } from '@modules/auth/hocs/withAuth';
import withPermissions from '@modules/permissions/hocs/withPermissions';
import { NextPage } from 'next';
import Routes from '@common/defs/routes';
import PageHeader from '@common/components/lib/partials/PageHeader';

import { CRUD_ACTION, Id } from '@common/defs/types';
import Namespaces from '@common/defs/namespaces';
import Labels from '@common/defs/labels';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import CustomBreadcrumbs from '@common/components/lib/navigation/CustomBreadCrumbs';
import EventEditForm from '@modules/events/components/partials/EditEventForm';
import UpdateEventForm from '@modules/events/components/partials/UpdateEventForm';
import { useEffect, useState } from 'react';
import useProgressBar from '@common/hooks/useProgressBar';
import useEvents, { UpdateOneInput } from '@modules/events/hooks/api/useEvents';
import { Event } from '@modules/events/defs/types';
import EventsPage from 'src/pages/events';

const EventEditPage: NextPage = () => {
  const { t } = useTranslation(['event', 'common']);
  const router = useRouter();
    const { start, stop } = useProgressBar();
    const { readOne } = useEvents();
    const [loaded, setLoaded] = useState(false);
    const [item, setItem] = useState<Event>();
    const id: Id = Number(router.query.id);
useEffect(() => {
    if (loaded) {
      stop();
    } else {
      start();
    }
  }, [loaded]);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    if (id) {
      const { data } = await readOne(id);
      if (data) {
        if (data.item) {
          setItem(data.item);
        }
      }
      setLoaded(true);
    }
  };
  if (!id) {
    return <Typography>Error: Event ID not provided.</Typography>;
  }

  return (
    <>
      {/* Page Header */}
      <PageHeader title={t(`event:${Labels.Events.EditOne}`)} />

      {/* Breadcrumbs */}
      <CustomBreadcrumbs
        links={[
          { name: t('common:dashboard'), href: Routes.Common.Home },
          { name: t(`event:${Labels.Events.Items}`), href: Routes.Events.ReadAll },
          { name: t(`event:${Labels.Events.EditOne}`) },
        ]}
      />

      {/* Form Component */}
      <UpdateEventForm event={item as UpdateOneInput} />
    </>
  );
};

export const getStaticPaths = () => {
  return { paths: [], fallback: 'blocking' };
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['topbar', 'footer', 'leftbar', 'event', 'common'])),
  },
});

export default withAuth(
  withPermissions(EventsPage, {
    requiredPermissions: {
      entity: Namespaces.Events,
      action: CRUD_ACTION.UPDATE,
    },
    redirectUrl: Routes.Permissions.Forbidden,
  }),
  {
    mode: AUTH_MODE.LOGGED_IN,
    redirectUrl: Routes.Auth.Login,
  }
);