import useApi, { ApiResponse } from '@common/hooks/useApi';
import ApiRoutes from '@common/defs/api-routes';
import { Event } from '@modules/events/defs/types';
import useEvents, { CreateOneInput, UpdateOneInput } from '../../../events/hooks/api/useEvents';

const useOrganizerEvents = () => {
  const fetchApi = useApi();
  const baseEventsHook = useEvents();

  // Get events organized by the current user
  const getMyEvents = async (): Promise<ApiResponse<Event[]>> => {
    const route = ApiRoutes.Organizer.Events.ReadAll;
    return await fetchApi<Event[]>(route);
  };

  // Create a new event (reusing your existing input type)
  const createEvent = async (eventData: CreateOneInput): Promise<ApiResponse<Event>> => {
    const route = ApiRoutes.Organizer.Events.CreateOne;
    return await fetchApi<Event>(route, {
      method: 'POST',
      data: eventData,
    });
  };

  // Update an event
  const updateEvent = async (eventData: UpdateOneInput): Promise<ApiResponse<Event>> => {
    const route = ApiRoutes.Organizer.Events.UpdateOne.replace('{id}', eventData.id.toString());
    return await fetchApi<Event>(route, {
      method: 'PUT',
      data: eventData,
    });
  };

  // Delete an event
  const deleteEvent = async (eventId: number): Promise<ApiResponse<void>> => {
    const route = ApiRoutes.Organizer.Events.DeleteOne.replace('{id}', eventId.toString());
    return await fetchApi<void>(route, { method: 'DELETE' });
  };

  // Get organizer stats
  const getStats = async (): Promise<ApiResponse<any>> => {
    const route = ApiRoutes.Organizer.Events.Stats;
    return await fetchApi(route);
  };

  return {
    ...baseEventsHook, // Include base events operations
    getMyEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    getStats,
  };
};

export default useOrganizerEvents;
