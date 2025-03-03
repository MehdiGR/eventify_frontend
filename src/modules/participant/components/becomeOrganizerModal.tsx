import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  CircularProgress,
  Alert,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

import useApi from '@common/hooks/useApi';
import { useSnackbar } from 'notistack';
import ApiRoutes from '@modules/participant/defs/api-routes';

interface BecomeOrganizerModalProps {
  open: boolean;
  onClose: () => void;
}

const BecomeOrganizerModal = ({ open, onClose }: BecomeOrganizerModalProps) => {
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
   const { enqueueSnackbar } = useSnackbar();
  const  fetchApi  = useApi();


  const handleSubmit = async () => {
    if (!reason.trim()) {
      setError('Reason is required');
      return;
    }

    setLoading(true);
    try {
      const response = await fetchApi(ApiRoutes.SubmitRequest, {
        method: 'POST',
        data: { reason },
      });

      if (response.success) {
        enqueueSnackbar('Request submitted!', { variant: 'success' });
        onClose();
      } else {
          enqueueSnackbar('Submission failed!', { variant: 'error' });
          console.log(response || 'Submission failed');
      }
    } catch (err) {
          enqueueSnackbar('Unexpected error occurred', { variant: 'error' });
          console.error(err || 'Submission failed');

    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: 1,
          borderColor: 'divider',
          padding: 2,
        }}
      >
        Become an Organizer{' '}
        <IconButton aria-label="close" onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {/* {error && <Alert severity="error">{error}</Alert>} */}
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          disabled={loading}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          startIcon={loading && <CircularProgress size={20} />}
        >
          Submit Request
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default BecomeOrganizerModal;
