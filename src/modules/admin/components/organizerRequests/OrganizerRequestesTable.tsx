import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Box, Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import dayjs from 'dayjs';

import { OrganizerRequest } from '@modules/admin/defs/types';
import { useDialogContext } from '@common/contexts/DialogContext';
import useOrganizerRequests from '@modules/admin/hooks/useOrganizerRequest';
import CustomTable, { Column } from '@common/components/partials/SimpleTable';

const OrganizerRequestsTable = () => {
  const { t } = useTranslation(['admin']);
  const { openConfirmDialog } = useDialogContext();
  const { listRequests, approveRequest, rejectRequest } = useOrganizerRequests();
  const [requests, setRequests] = useState<OrganizerRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await listRequests();
      console.log(response,"response")
      if (response.success) {
        setRequests(response.data || []);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = (id: number) => {
    openConfirmDialog(
      t('admin:organizer_requests.approve_title'),
      t('admin:organizer_requests.approve_confirmation'),
      async () => {
        const response = await approveRequest(id);
        if (response.success) {
          fetchRequests();
        }
      }
    );
  };

  const handleReject = (id: number) => {
    openConfirmDialog(
      t('admin:organizer_requests.reject_title'),
      t('admin:organizer_requests.reject_confirmation'),
      async () => {
        const response = await rejectRequest(id);
        if (response.success) {
          fetchRequests();
        }
      },
      t('admin:organizer_requests.reject_button'),
      'error'
    );
  };

  const getStatusChip = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <Chip
            icon={<CheckCircleIcon />}
            label={t('admin:organizer_requests.approved')}
            color="success"
            size="small"
          />
        );
      case 'rejected':
        return (
          <Chip
            icon={<CancelIcon />}
            label={t('admin:organizer_requests.rejected')}
            color="error"
            size="small"
          />
        );
      default:
        return <Chip label={t('admin:organizer_requests.pending')} color="warning" size="small" />;
    }
  };

  const columns: Column<OrganizerRequest>[] = [
    {
      id: 'id',
      label: 'ID',
      minWidth: 50,
    },
    {
      id: 'name',
      label: t('admin:organizer_requests.name'),
      minWidth: 150,
    },
    {
      id: 'email',
      label: t('admin:organizer_requests.email'),
      minWidth: 200,
    },
    {
      id: 'status',
      label: t('admin:organizer_requests.status'),
      minWidth: 120,
      format: (value) => getStatusChip(value),
    },
    {
      id: 'createdAt',
      label: t('admin:organizer_requests.created_at'),
      minWidth: 150,
      format: (value) => dayjs(value).format('DD/MM/YYYY HH:mm'),
    },
  ];

  const renderActions = (item: OrganizerRequest) => {
    if (item.status !== 'pending') {
      return null;
    }

    return (
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          color="success"
          size="small"
          startIcon={<CheckCircleIcon />}
          onClick={() => handleApprove(item.id)}
        >
          {t('admin:organizer_requests.approve')}
        </Button>
        <Button
          variant="outlined"
          color="error"
          size="small"
          startIcon={<CancelIcon />}
          onClick={() => handleReject(item.id)}
        >
          {t('admin:organizer_requests.reject')}
        </Button>
      </Box>
    );
  };

  return (
    <CustomTable<OrganizerRequest>
      title={t('admin:organizer_requests.title')}
      columns={columns}
      data={requests}
      loading={loading}
      keyExtractor={(item) => item.id}
      onRefresh={fetchRequests}
      renderActions={renderActions}
      emptyMessage={t('admin:organizer_requests.no_requests')}
      actionsLabel={t('admin:organizer_requests.actions')}
      pagination={true}
      defaultPageSize={10}
    />
  );
};

export default OrganizerRequestsTable;
