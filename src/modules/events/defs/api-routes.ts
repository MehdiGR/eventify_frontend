import { CrudApiRoutes } from '@common/defs/types';

// const prefix = '/events';

// const ApiRoutes:CrudApiRoutes = {
//   CreateOne: prefix,
//   ReadAll: prefix,
//   ReadOne: prefix + '/{id}',
//   UpdateOne: prefix + '/{id}',
//   DeleteOne: prefix + '/{id}',
//   Register: prefix + '/participant/{id}/register',
//   Unregister: prefix + '/participant/{id}/unregister',
// };

// export default ApiRoutes;
// modules/events/defs/apiRoutes.ts
const prefix = '/events';
const ApiRoutes: CrudApiRoutes = {
  CreateOne: prefix,
  ReadAll: prefix,
  ReadOne: `${prefix}/{id}`,
  UpdateOne: `${prefix}/{id}`,
  DeleteOne: `${prefix}/{id}`,
  ParticipantRegister: `${prefix}/participant/{id}/register`,
  ParticipantUnregister: `${prefix}/participant/{id}/unregister`,
};
export default ApiRoutes;
