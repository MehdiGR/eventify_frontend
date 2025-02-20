import Routes from '@common/defs/routes';
import ItemsTable, { RowAction } from '@common/components/partials/ItemsTable';
import { Event } from '@modules/events/defs/types';
import useEvents, { CreateOneInput, UpdateOneInput } from '@modules/events/hooks/api/useEvents';
import { GridColumns } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import Namespaces from '@common/defs/namespaces';
import { CrudRow } from '@common/defs/types';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Edit, People, Visibility } from '@mui/icons-material';
import ParticipantsModal from '@modules/events/components/partials/ParticipantsModal';
import UpdateEventModal from '@modules/events/components/UpdateEventModal';

interface Row extends CrudRow {
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  createdAt: string;
  organizer_id: number;
}

const EventsTable = () => {
  const { t, i18n } = useTranslation(['event']);

  const columns: GridColumns<Row> = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
    },
    {
      field: 'name',
      headerName: t('event:list.name'),
      flex: 1,
    },
    {
      field: 'description',
      headerName: t('event:list.description'),
      flex: 1,
    },
    {
      field: 'start_date',
      headerName: t('event:list.start_date'),
      type: 'dateTime',
      width: 200,
      renderCell: (params) => dayjs(params.row.start_date).format('DD/MM/YYYY HH:mm'),
    },
    {
      field: 'end_date',
      headerName: t('event:list.end_date'),
      type: 'dateTime',
      width: 200,
      renderCell: (params) => dayjs(params.row.end_date).format('DD/MM/YYYY HH:mm'),
    },
  ];

  const [translatedColumns, setTranslatedColumns] = useState<GridColumns<Row>>(columns);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showParticipants, setShowParticipants] = useState(false);
  const [isOpenUpdateEventModal, setIsOpenUpdateEventModal] = useState(false);

  useEffect(() => {
    setTranslatedColumns(columns);
  }, [t, i18n.language]);

  const itemToRow = (item: Event): Row => {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      start_date: item.start_date,
      end_date: item.end_date,
      createdAt: item.createdAt,
      organizer_id: item.organizer_id || 0,
    };
  };

  const eventActions: RowAction<Event>[] = [
    {
      label: (id, item) => t('event:actions.edit'),
      icon: (id, item) => <Edit fontSize="small" />,
      onClick: (id, item) => {
        setSelectedEvent(item);
        setIsOpenUpdateEventModal(true);
      },
      enabled: (id, item) => true,
    },
    {
      label: (id, item) => t('event:actions.viewDetails'),
      icon: (id, item) => <Visibility fontSize="small" />,
      onClick: (id, item) => {
        setSelectedEvent(item);
      },
      enabled: (id, item) => true,
    },
    {
      label: (id, item) => t('event:viewParticipants'),
      icon: (id, item) => <People fontSize="small" />,
      onClick: (id, item) => {
        setSelectedEvent(item);
        setShowParticipants(true);
      },
      enabled: (id, item) => true,
    },
  ];

  return (
    <>
      <ItemsTable<Event, CreateOneInput, UpdateOneInput, Row>
        namespace={Namespaces.Events}
        routes={Routes.Events}
        useItems={useEvents}
        columns={translatedColumns}
        itemToRow={itemToRow}
        showEdit={() => false}
        showDelete={() => true}
        showLock
        exportable
        actions={eventActions}
      />
      {showParticipants && selectedEvent && (
        <ParticipantsModal
          event={{ id: selectedEvent.id, name: selectedEvent.name }}
          open={showParticipants}
          onClose={() => setShowParticipants(false)}
        />
      )}
      {selectedEvent && (
        <UpdateEventModal
          event={selectedEvent}
          open={isOpenUpdateEventModal}
          onClose={() => setIsOpenUpdateEventModal(false)}
        />
      )}
    </>
  );
};

export default EventsTable;
