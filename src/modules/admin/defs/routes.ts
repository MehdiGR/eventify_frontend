// modules/admin/defs/apiRoutes.ts
const prefix = '/admin/dashboard';
const ApiRoutes = {
  Dashboard: prefix,
  // Events:`${prefix}/events`,
  // Users:`${prefix}/users`,
  OrganizerRequests: `${prefix}/organizer-requests`,
  ApproveRequest: `${prefix}/organizer-requests/{id}/approve`,
  RejectRequest: `${prefix}/organizer-requests/{id}/reject`,
  Groups: `${prefix}/groups`,
  GroupMembers: `${prefix}/groups/{id}/members`,
};
export default ApiRoutes;
