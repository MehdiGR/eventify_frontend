import { ROLE } from '@modules/permissions/defs/types';

export const ROLES_OPTIONS = [
  { value: ROLE.ADMIN, label: 'common:admin_role' },
  { value: ROLE.USER, label: 'common:user_role' },
  { value: ROLE.PARTICIPANT, label: 'common:participant_role' },
  { value: ROLE.ORGANIZER, label: 'common:organizer_role' },
];
