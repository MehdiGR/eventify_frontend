
import EventsGrid from '@modules/events/components/partials/EventGrid';
import HeroSlider from '@modules/home/components/partials/Hero';
import { NextPage } from 'next';
import { useTranslation } from 'react-i18next';
import { useState, useMemo, useEffect } from 'react';
import useEvents from '@modules/events/hooks/api/useEvents';
import useProgressBar from '@common/hooks/useProgressBar';
import { Event } from '@modules/events/defs/types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Index: NextPage = () => {
  const { t } = useTranslation(['home']);
  const [searchParams, setSearchParams] = useState({
    query: '',
    location: '',
  });

  const [events, setItems] = useState<Event[]>([]);
  const { readAll } = useEvents();
  const { start, stop } = useProgressBar();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loaded ? stop() : start();
  }, [loaded]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data } = await readAll();
      if (data?.items) {
        setItems(data.items.filter((event) => event !== null));
      }
    } finally {
      setLoaded(true);
    }
  };

  // Fixed filtering logic based on Event interface
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // Safely handle all possible undefined values
      const searchQuery = searchParams.query.toLowerCase();
      const searchLocation = searchParams.location.toLowerCase();

      const nameMatch = event.name?.toLowerCase().includes(searchQuery) ?? false;
      const descMatch = event.description?.toLowerCase().includes(searchQuery) ?? false;
      const locMatch = event.location?.toLowerCase().includes(searchLocation) ?? false;

      return (nameMatch || descMatch) && locMatch;
    });
  }, [events, searchParams.query, searchParams.location]);

  const handleSearch = (query: string, location: string) => {
    setSearchParams({ query, location });
  };

  return (
    <>
      <HeroSlider onSearch={handleSearch} />
      <EventsGrid events={filteredEvents} />
    </>
  );
};
export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['topbar', 'footer', 'leftbar', 'event', 'common'])),
  },
});
export default Index;
