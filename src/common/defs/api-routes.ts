import  Participant  from '@modules/participant/defs/routes';
import  Organizer  from '@modules/organizer/defs/api-routes';
import Auth from '@modules/auth/defs/api-routes';
import Users from '@modules/users/defs/api-routes';
import Uploads from '@modules/uploads/defs/api-routes';
import Posts from '@modules/posts/defs/api-routes';
import Events from '@modules/events/defs/api-routes';

const ApiRoutes = {
  Auth,
  Users,
  Uploads,
  Posts,
  Events,
  Organizer,
  Participant
};

export default ApiRoutes;
