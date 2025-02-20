import PageHeader from '@common/components/lib/partials/PageHeader';
import useAuth from '@modules/auth/hooks/api/useAuth';
import EventsGrid from '@modules/events/components/partials/EventGrid';
import HeroSlider from '@modules/home/components/partials/Hero';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import { useState, useMemo, useEffect } from 'react';
import useEvents from '@modules/events/hooks/api/useEvents';
import useProgressBar from '@common/hooks/useProgressBar';
import { Event } from '@modules/events/defs/types';

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
    if (loaded) {
      stop();
    } else {
      start();
    }
  }, [loaded]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data } = await readAll();
      if (data?.items) {
        // Filter out any potential null/undefined items
        setItems(data.items.filter((event) => event !== null));
      }
    } finally {
      setLoaded(true);
    }
  };

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // Handle potential undefined values safely
      const eventTitle = event.title?.toLowerCase() || '';
      const eventDescription = event.description?.toLowerCase() || '';
      const eventLocation = event.location?.toLowerCase() || '';

      const matchesQuery =
        eventTitle.includes(searchParams.query.toLowerCase()) ||
        eventDescription.includes(searchParams.query.toLowerCase());

      const matchesLocation = eventLocation.includes(searchParams.location.toLowerCase());

      return matchesQuery && matchesLocation;
    });
  }, [events, searchParams.query, searchParams.location]);

  const handleSearch = (query: string, location: string) => {
    setSearchParams({ query, location });
  };

  return (
    <>
      <HeroSlider onSearch={handleSearch} />
      {events && <EventsGrid events={filteredEvents} />}
    </>
  );
};

export default Index;
