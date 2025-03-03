import ApiRoutes from '@common/defs/api-routes';
import { Event } from '@modules/events/defs/types';
import useItems, { UseItems, UseItemsOptions, defaultOptions } from '@common/hooks/useItems';
import { Id } from '@common/defs/types';

// Define input types for creating and updating events
export interface CreateOneInput {
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  organizer_id: Id;
  location: string;
  max_participants: number;
  image?: string | null;
}

export interface UpdateOneInput {
  id: number;
  name?: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  location?: string;
  max_participants?: number;
  image?: string | null;
}

export type UpsertOneInput = CreateOneInput | UpdateOneInput;

const useEvents: UseItems<Event, CreateOneInput, UpdateOneInput> = (
  opts: UseItemsOptions = defaultOptions
) => {
  const apiRoutes = {
    CreateOne: ApiRoutes.Events.CreateOne,
    ReadAll: ApiRoutes.Events.ReadAll,
    ReadOne: ApiRoutes.Events.ReadOne,
    UpdateOne: ApiRoutes.Events.UpdateOne,
    DeleteOne: ApiRoutes.Events.DeleteOne,
  };

  const useItemsHook = useItems<Event, CreateOneInput, UpdateOneInput>(apiRoutes, opts);
  return useItemsHook;
};

export default useEvents;
