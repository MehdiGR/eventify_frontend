// components/UpdateEventModal.tsx
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
import UpdateEventForm from '@modules/events/components/partials/UpdateEventForm';
import { Event } from '@modules/events/defs/types';

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

interface UpdateEventModalProps {
  open: boolean;
  onClose: () => void;
  event:Event
}

const UpdateEventModal = ({ open, onClose, event }: UpdateEventModalProps) => {
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
        Update New Event
        <IconButton aria-label="close" onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <StyledDialogContent>
        {/* onSubmitSuccess={handleSubmitSuccess} */}
        <UpdateEventForm event={event} />
      </StyledDialogContent>
{/* 
      <DialogActions
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
          form="Update-event-form" // This will connect to the form's id
          variant="contained"
          color="primary"
        >
          Update Event
        </Button>
      </DialogActions> */}
    </StyledDialog>
  );
};

export default UpdateEventModal;
