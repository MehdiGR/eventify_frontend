import withAuth, { AUTH_MODE } from '@modules/auth/hocs/withAuth';
import withPermissions from '@modules/permissions/hocs/withPermissions';
import { NextPage } from 'next';
import Routes from '@common/defs/routes';
import PageHeader from '@common/components/lib/partials/PageHeader';

import { CRUD_ACTION } from '@common/defs/types';
import Namespaces from '@common/defs/namespaces';
import Labels from '@common/defs/labels';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import CustomBreadcrumbs from '@common/components/lib/navigation/CustomBreadCrumbs';
import EventEditForm from '@modules/events/components/partials/EditEventForm';

const EventEditPage: NextPage = () => {
  const { t } = useTranslation(['event', 'common']);
  const router = useRouter();
  const { id } = router.query;

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
      {/* <EventEditForm id={Number(id)} /> */}
    </>
  );
};

// Server-side translations for i18n
export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['topbar', 'footer', 'leftbar', 'event', 'common'])),
  },
});

// export default withAuth(
//   withPermissions(EventEditPage, {
//     requiredPermissions: {
//       entity: Namespaces.Events,
//       action: CRUD_ACTION.UPDATE,
//     },
//     redirectUrl: Routes.Permissions.Forbidden,
//   }),
//   {
//     mode: AUTH_MODE.LOGGED_IN,
//     redirectUrl: Routes.Auth.Login,
//   }
// );

// export default EventEditPage;
export default  withAuth(
  withPermissions(EventEditPage, {
    requiredPermissions: [
      { entity: Namespaces.Events, action: CRUD_ACTION.UPDATE }, // User must have READ permission for events
    ],
    redirectUrl: Routes.Permissions.Forbidden,
  }),
  {
    mode: AUTH_MODE.LOGGED_IN,
    redirectUrl: Routes.Auth.Login,
  }
);
