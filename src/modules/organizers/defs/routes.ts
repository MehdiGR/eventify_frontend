import { CrudAppRoutes } from '@common/defs/types';

const prefix = 'organizer/events';
const Routes: CrudAppRoutes = {
  ReadAll: prefix,
  CreateOne: prefix + '/create',
  ReadOne: prefix + '/{id}',
  UpdateOne: prefix + '/{id}/edit',
  DeleteOne: prefix + '/{id}/delete',
};

export default Routes;
