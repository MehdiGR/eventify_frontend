import { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText } from '@mui/material';
import { EventParticipant } from '@modules/events/defs/types';
import useParticipantEvents from '@modules/participant/hook/api/useParticipantEvents';

interface ParticipantsModalProps {
  event: { id: number; name: string };
  open: boolean;
  onClose: () => void;
}

const ParticipantsModal = ({ event, open, onClose }: ParticipantsModalProps) => {
  const { getEventParticipants } = useParticipantEvents();
  const [participants, setParticipants] = useState<EventParticipant[]>([]);

  useEffect(() => {
    if (open && event) {
      getEventParticipants(event.id).then((response) => {
        if (response.success) {
          // Type assertion ensures that response.data is treated as EventParticipant[]
          setParticipants(response.data as EventParticipant[]);
        }
      });
    }
  }, [open, event, getEventParticipants]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Participants for {event?.name}</DialogTitle>
      <DialogContent dividers>
        <List>
          {participants.map((participant) => (
            <ListItem key={participant.user_id}>
              <ListItemText primary={participant.user.name} secondary={participant.user.email} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default ParticipantsModal;
