import { NextPage } from 'next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

import useEvents from '@modules/events/hooks/api/useEvents';
import useProgressBar from '@common/hooks/useProgressBar';
import { useEffect, useState } from 'react';
import { Event } from '@modules/events/defs/types';
import EventsGrid from '@modules/events/components/partials/EventGrid';
import CreateEventModal from '@modules/events/components/CreateEventModal';
import { Button } from '@mui/material';

const EventsPage: NextPage = () => {
  const { t } = useTranslation(['event', 'common']);
  const { readAll } = useEvents();
  const { start, stop } = useProgressBar();
  const [loaded, setLoaded] = useState(false);
  const [items, setItems] = useState<null | Event[]>(null);

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
    const { data } = await readAll();
    console.log(data, 'data');
    if (data) {
      if (data.items) {
        setItems(data.items);
      }
    }
    setLoaded(true);
  };
const [isOpen, setIsOpen] = useState(false);

const openModal = () => setIsOpen(true);
const closeModal = () => setIsOpen(false);
  return (
    <>
      {/* <PageHeader title={t(`event:${Labels.Events.CreateNewOne}`)} />

      <CustomBreadcrumbs
        links={[
          { name: t('common:dashboard'), href: Routes.Common.Home },
          { name: t(`event:${Labels.Events.Items}`), href: Routes.Events.ReadAll },
          { name: t(`event:${Labels.Events.NewOne}`) },
        ]}
      /> */}
      {/* <EventGrid events={items} /> */}
      {/* <Button variant="outlined" href="#outlined-buttons">
        Link
      </Button> */}
     
      { items && <EventsGrid events={items}/>}
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['topbar', 'footer', 'leftbar', 'event', 'common'])),
  },
});

export default EventsPage;
