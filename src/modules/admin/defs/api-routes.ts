const adminPrefix = '/admin';
const organizerRequestsPrefix = `${adminPrefix}/organizer-requests`;
const eventsOrganizedByPrefix = `${adminPrefix}/events/organized-by`;

const ApiRoutes = {
  OrganizerRequests: {
    ReadAll: `${organizerRequestsPrefix}`,
    ApproveOne: `${organizerRequestsPrefix}/{id}/approve`,
    RejectOne: `${organizerRequestsPrefix}/{id}/reject`,
  },
  EventsOrganizedBy: `${eventsOrganizedByPrefix}/{organizerId}`,
};

export default ApiRoutes;
