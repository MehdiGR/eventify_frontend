import Auth from '@modules/auth/defs/routes';
import Users from '@modules/users/defs/routes';
import Events from '@modules/events/defs/routes';
import Organizer from '@modules/organizer/defs/routes';
import Admin from '@modules/admin/defs/routes';
import Permissions from '@modules/permissions/defs/routes';

const Common = {
  Home: '/',
  NotFound: '/404',
};

const Routes = {
  Common,
  Auth,
  Permissions,
  Users,
  Events,
  Organizer,
  Admin,
};

export default Routes;
