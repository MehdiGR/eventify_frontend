import { CrudApiRoutes } from '@common/defs/types';

// modules/organizer/defs/apiRoutes.ts
const prefix = '/events/organizer';
const ApiRoutes = {
  Events: {
  CreateOne: prefix,
  ReadAll: prefix,
  ReadOne: `${prefix}/{id}`,
  UpdateOne: `${prefix}/{id}`,
  DeleteOne: `${prefix}/{id}`,
  Stats: `${prefix}/stats`,
  },
  AddParticipant: `${prefix}/{id}/participants/add`, // For Organizer adding participants
  RemoveParticipant: `${prefix}/{id}/participants/remove/{userId}`,
};
export default ApiRoutes;
