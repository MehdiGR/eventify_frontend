// modules/admin/hooks/useOrganizerRequests.ts
import useApi, { ApiResponse } from '@common/hooks/useApi';
import ApiRoutes from '@modules/admin/defs/api-routes';
// import ApiRoutes from '@modules/admin/defs/apiRoutes';
import { OrganizerRequest } from '@modules/admin/defs/types';

const useOrganizerRequests = () => {
  const fetchApi = useApi();

  // Get all organizer requests
  const listRequests = async (): Promise<ApiResponse<OrganizerRequest[]>> => {
    const route = ApiRoutes.OrganizerRequests.ReadAll;
    return await fetchApi<OrganizerRequest[]>(route);
  };

  // Approve an organizer request
  const approveRequest = async (id: number): Promise<ApiResponse<void>> => {
    const route = ApiRoutes.OrganizerRequests.ApproveOne.replace('{id}', id.toString());
    return await fetchApi<void>(route, {
      method: 'PUT',
    });
  };

  // Reject an organizer request
  const rejectRequest = async (id: number): Promise<ApiResponse<void>> => {
    const route = ApiRoutes.OrganizerRequests.RejectOne.replace('{id}', id.toString());
    return await fetchApi<void>(route, {
      method: 'PUT',
    });
  };

  return {
    listRequests,
    approveRequest,
    rejectRequest,
  };
};

export default useOrganizerRequests;
