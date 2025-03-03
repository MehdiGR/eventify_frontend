import useApi, { ApiResponse } from '@common/hooks/useApi';
import ApiRoutes from '@common/defs/api-routes';
import { Event, EventParticipant } from '@modules/events/defs/types';
import useEvents from '../../../events/hooks/api/useEvents';

const useParticipantEvents = () => {
  const fetchApi = useApi();
  const baseEventsHook = useEvents();

  // Get events the user is registered for
  const getRegisteredEvents = async (): Promise<ApiResponse<Event[]>> => {
    const route = ApiRoutes.Participant.RegisteredEvents;
    return await fetchApi<Event[]>(route);
  };

  // Register for an event
  const registerForEvent = async (eventId: number): Promise<ApiResponse<any>> => {
    const route = ApiRoutes.Events.ParticipantRegister.replace('{id}', eventId.toString());
    return await fetchApi(route, { method: 'POST' });
  };

  // Unregister from an event
  const unregisterFromEvent = async (eventId: number): Promise<ApiResponse<any>> => {
    const route = ApiRoutes.Events.ParticipantUnregister.replace(
      '{id}',
      eventId.toString()
    );
    return await fetchApi(route, { method: 'DELETE' });
  };

  // Get participants for an event
  const getEventParticipants = async (
    eventId: number
  ): Promise<ApiResponse<EventParticipant[]>> => {
    const route = ApiRoutes.Events.Participants.replace('{eventId}', eventId.toString());
    return await fetchApi<EventParticipant[]>(route);
  };

  return {
    ...baseEventsHook, // Include base events operations
    getRegisteredEvents,
    registerForEvent,
    unregisterFromEvent,
    getEventParticipants,
  };
};

export default useParticipantEvents;
