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
import SummaryCards from '@modules/organizer/components/dashboard/SummaryCards';
import { useEffect, useState } from 'react';
import useEvents from '@modules/events/hooks/api/useEvents';
import { Event } from '@modules/events/defs/types';

const OrganizersPage: NextPage = () => {
  const router = useRouter();
  const { readAll } = useEvents();
  const { t } = useTranslation(['event']);
  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    totalParticipants: 0,
    revenue: 0,
    eventsTrend: 0,
    participantsTrend: 0,
  });
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await readAll();
        if (data?.items) {
          const eventsData = data.items as Event[];
          setEvents(eventsData);
          setStats(calculateStats(eventsData));
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateStats = (events: Event[]) => {
    const now = new Date();
    return {
      totalEvents: events.length,
      upcomingEvents: events.filter((e) => new Date(e.start_date) > now).length,
      totalParticipants: events.reduce((sum, e) => sum + (e.participants?.length || 0), 0),
      revenue: events.reduce(
        (sum, e) => sum + (e.ticketTypes?.reduce((tSum: any, t:any) => tSum + t.price, 0) || 0),
        0
      ),
      eventsTrend: 0, // You'll need historical data for trends
      participantsTrend: 0,
    };
  };

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

      {!loading && <SummaryCards stats={stats} />}

      <EventsTable events={events} loading={loading} onRefresh={fetchData} />
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
