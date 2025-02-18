// components/CreateEventModal.tsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  styled,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import CreateEventForm from '@modules/events/components/partials/CreateEventForm';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    maxHeight: '90vh',
    width: '600px',
  },
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(3),
  overflowY: 'auto',
}));

interface CreateEventModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateEventModal = ({ open, onClose }: CreateEventModalProps) => {
  const handleSubmitSuccess = () => {
    onClose();
  };

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="md" fullWidth>
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
        Create New Event
        <IconButton aria-label="close" onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <StyledDialogContent>
        <CreateEventForm onSubmitSuccess={handleSubmitSuccess} />
      </StyledDialogContent>

      {/* <DialogActions
        sx={{
          padding: 2,
          borderTop: 1,
          borderColor: 'divider',
        }}
      >
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          type="submit"
          form="create-event-form" // This will connect to the form's id
          variant="contained"
          color="primary"
        >
          Create Event
        </Button>
      </DialogActions> */}
    </StyledDialog>
  );
};

export default CreateEventModal;
