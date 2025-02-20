import { CrudApiRoutes } from '@common/defs/types';

const prefix = '/events';
const ApiRoutes: CrudApiRoutes = {
  CreateOne: prefix,
  ReadAll: prefix,
  ReadOne: prefix + '/{id}',
  UpdateOne: prefix + '/{id}',
  DeleteOne: prefix + '/{id}',
  Participants: prefix + '/{eventId}/participants',
  Register: prefix + '/{id}/register',
  Unregister: prefix + '/{eventId}/unregister',
};

export default ApiRoutes;
