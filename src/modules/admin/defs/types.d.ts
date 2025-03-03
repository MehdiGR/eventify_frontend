// modules/admin/defs/types.ts
import { CrudObject, Id } from '@common/defs/types';
import { User } from '@modules/users/defs/types';

export interface OrganizerRequest extends CrudObject {
  user_id: Id;
  reason: string;
  status: string;
  user: User;
}
export interface AdminEvent extends Event {
  participants_count?: number;
  previous_period_count?: number;
}

