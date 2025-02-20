import useApi, { ApiResponse } from '@common/hooks/useApi';
import ApiRoutes from '@common/defs/api-routes';
import { EventParticipant } from '@modules/events/defs/types';

const useEventParticipants = () => {
  const fetchApi = useApi();

  const fetchParticipants = async (eventId: number): Promise<ApiResponse<EventParticipant[]>> => {
    const route = ApiRoutes.Events.Participants.replace('{id}', eventId.toString());
    const response = await fetchApi<EventParticipant[]>(route);
    return response;
  };

  const register = async (eventId: number): Promise<ApiResponse<any>> => {
    const route = ApiRoutes.Events.Register.replace('{id}', eventId.toString());
    const response = await fetchApi(route, { method: 'POST' });
    return response;
  };

  const unregister = async (eventId: number): Promise<ApiResponse<any>> => {
    const route = ApiRoutes.Events.Unregister.replace('{id}', eventId.toString());
    const response = await fetchApi(route, { method: 'DELETE' });
    return response;
  };
  const participantEvents = async (eventId: number): Promise<ApiResponse<any>> => {
    const route = ApiRoutes.Events.Unregister.replace('{id}', eventId.toString());
    const response = await fetchApi(route, { method: 'DELETE' });
    return response;
  };

  return { fetchParticipants, register, unregister, participantEvents };
};

export default useEventParticipants;
