import PageHeader from '@common/components/lib/partials/PageHeader';
import Routes from '@common/defs/routes';
import withAuth, { AUTH_MODE } from '@modules/auth/hocs/withAuth';
import useAuth from '@modules/auth/hooks/api/useAuth';
import EventsGrid from '@modules/events/components/partials/EventGrid';
import HeroSlider from '@modules/home/components/partials/Hero';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import Organizers from 'src/pages/organizers';

const userRole ='organizer';
const Index: NextPage = () => {
  const { t } = useTranslation(['home']);
  return (
    <>
      {/* <PageHeader title={t('home:dashboard')} /> */}
      {userRole === 'admin' ? (
        <>
          <HeroSlider />
          <EventsGrid />
        </>
      ) : userRole === 'organizer' ? (
        <>
          <Organizers />
          {/* <EventsGrid /> */}
        </>
      ) : userRole === 'participant'  ? (
        <>
          <HeroSlider />
          <EventsGrid />
        </>
      ) : (
        // visitors
        <>
          <HeroSlider />
          <EventsGrid />
        </>
      )}
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['topbar', 'footer', 'leftbar', 'home'])),
  },
});
export default Index;
// Give permission to all visitor to access the home page and browse events
// export default withAuth(Index, {
//   mode: AUTH_MODE.LOGGED_IN,
//   redirectUrl: Routes.Auth.Login,
// });
