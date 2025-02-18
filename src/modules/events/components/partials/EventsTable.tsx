import Routes from '@common/defs/routes';
import ItemsTable from '@common/components/partials/ItemsTable';
import { Event } from '@modules/events/defs/types';
import useEvents, { CreateOneInput, UpdateOneInput } from '@modules/events/hooks/api/useEvents';
import { GridColumns } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import Namespaces from '@common/defs/namespaces';
import { CrudRow } from '@common/defs/types';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

// Define Row interface extending CrudRow like in Users example
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
    {
      field: 'createdAt',
      headerName: t('event:list.created_at'),
      type: 'dateTime',
      flex: 1,
      renderCell: (params) => dayjs(params.row.createdAt).format('DD/MM/YYYY HH:mm'),
    },
  ];

  // Add translation state handling like in Users example
  const [translatedColumns, setTranslatedColumns] = useState<GridColumns<Row>>(columns);

  useEffect(() => {
    setTranslatedColumns(columns);
  }, [t, i18n.language]);

  // Simplify itemToRow to match Users example pattern
  const itemToRow = (item: Event): Row => {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      start_date: item.start_date,
      end_date: item.end_date,
      createdAt: item.createdAt,
      organizer_id: item.organizer_id,
    };
  };

  return (
    <ItemsTable<Event, CreateOneInput, UpdateOneInput, Row>
      namespace={Namespaces.Events}
      routes={Routes.Events}
      useItems={useEvents}
      columns={translatedColumns}
      itemToRow={itemToRow}
      showEdit={() => true}
      showDelete={() => true}
      showLock
      exportable
    />
  );
};

export default EventsTable;
