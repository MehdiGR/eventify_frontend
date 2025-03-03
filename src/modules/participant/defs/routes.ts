import { CrudAppRoutes } from '@common/defs/types';

const prefix = '/participant';
const Routes= {
  ReadAll: prefix,
  // CreateOne: prefix + '/create',
  // ReadOne: prefix + '/{id}',
  // UpdateOne: prefix + '/{id}/edit',
  // DeleteOne: prefix + '/{id}/delete',
  RegisteredEvents: prefix + '/registered_events',
};

export default Routes;
