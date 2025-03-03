// modules/admin/defs/types.ts
import { CrudObject, Id } from '@common/defs/types';
import { User } from '@modules/users/defs/types';

export interface Group extends CrudObject {
  name: string;
  description: string;
  organizer_id: Id;
  organizer: User;
  events?: Event[];
}
