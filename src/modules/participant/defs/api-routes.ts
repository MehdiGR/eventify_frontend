// modules/participant/defs/apiRoutes.ts
const prefix = '/events/participant';
const ApiRoutes = {
  RegisteredEvents: `${prefix}/registered`,
  SubmitRequest: '/participant/request-organizer', // Fixed path (no prefix)
};
export default ApiRoutes;
