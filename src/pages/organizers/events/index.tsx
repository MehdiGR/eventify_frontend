import withAuth, { AUTH_MODE } from '@modules/auth/hocs/withAuth';
import withPermissions from '@modules/permissions/hocs/withPermissions';
import { NextPage } from 'next';
import Routes from '@common/defs/routes';
import CustomBreadcrumbs from '@common/components/lib/navigation/CustomBreadCrumbs';
import { useRouter } from 'next/router';
import { Add } from '@mui/icons-material';
import PageHeader from '@common/components/lib/partials/PageHeader';
import { CRUD_ACTION } from '@common/defs/types';
import Namespaces from '@common/defs/namespaces';
import Labels from '@common/defs/labels';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import EventsTable from '@modules/events/components/partials/EventsTable';
import { useEffect, useState } from 'react';
import useApi from '@common/hooks/useApi';
import { Button, LinearProgress } from '@mui/material';
import SummaryCards from '@modules/organizer/components/dashboard/SummaryCards';
import LoadingPage from '@common/components/lib/feedbacks/LoadingPage';

const OrganizersPage: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation(['event']);
  const fetchApi = useApi();

  // Stats state
  const [stats, setStats] = useState<Stats>({
    totalEvents: 0,
    upcomingEvents: 0,
    totalParticipants: 0,
    revenue: 0,
  });
  const [statsLoading, setStatsLoading] = useState(true);

  // Fetch stats independently
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetchApi('events/organizer/stats');
        if (response.success) {
         setStats({
           totalEvents: response.data.total_events,
           upcomingEvents: response.data.upcoming_events,
           totalParticipants: response.data.total_participants,
           revenue: response.data.revenue || 0,
           // Add trends here when backend implements them
         });
        }
      } catch (error) {
        console.error('Error loading stats:', error);
      } finally {
        setStatsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <>
      <PageHeader
        title={t(`event:${Labels.Events.ReadAll}`)}
        action={{
          label: t(`event:${Labels.Events.NewOne}`),
          startIcon: <Add />,
          onClick: () => router.push(Routes.Events.CreateOne),
          permission: {
            entity: Namespaces.Events,
            action: CRUD_ACTION.CREATE,
          },
        }}
      />

      <CustomBreadcrumbs
        links={[
          { name: t('common:dashboard'), href: Routes.Common.Home },
          { name: t(`event:${Labels.Events.Items}`) },
        ]}
      />

      {statsLoading ? (
        <LoadingPage /> // In OrganizersPage component
      ) : (
        <SummaryCards
          stats={{
            totalEvents: stats.totalEvents,
            upcomingEvents: stats.upcomingEvents,
            totalParticipants: stats.totalParticipants,
            revenue: stats.revenue,
            eventsTrend: stats.eventsTrend,
            participantsTrend: stats.participantsTrend,
          }}
          loading={statsLoading}
        />
      )}
      {/* EventsTable manages its own data via useEvents hook */}
      <EventsTable />
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['topbar', 'footer', 'leftbar', 'event', 'common'])),
  },
});

export default withAuth(
  withPermissions(OrganizersPage, {
    requiredPermissions: {
      entity: Namespaces.Events,
      action: CRUD_ACTION.READ,
    },
    redirectUrl: Routes.Permissions.Forbidden,
  }),
  {
    mode: AUTH_MODE.LOGGED_IN,
    redirectUrl: Routes.Auth.Login,
  }
);
