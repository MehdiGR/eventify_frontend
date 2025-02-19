import { CrudObject, Id } from '@common/defs/types';
import { User } from '@modules/users/defs/types';

// export interface Event extends CrudObject {
//   name: string;
//   imageUrl: string | null;
//   description: string;
//   start_date: string; // ISO date string
//   end_date: string; // ISO date string
//   organizer_id: Id;
//   organizer: User;
//   participants?: User[];

// }
export interface Event extends CrudObject {
  name: string;
  image: string | null;
  description: string;
  start_date: string;
  end_date: string;
  organizer_id?: Id;
  organizer: User;
  participants?: User[];
  // ticketTypes?: TicketType[];
  location?: string;
  max_participants?: number;
  participants_count?: number; // Add this if not present
  previous_period_count?: number; // New field for trend calculation
}