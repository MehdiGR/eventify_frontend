import ApiRoutes from '@common/defs/api-routes';
import { Event } from '@modules/events/defs/types';
import useItems, { UseItems, UseItemsOptions, defaultOptions } from '@common/hooks/useItems';
import { Id } from '@common/defs/types';

// Define input types for creating and updating events
export interface CreateOneInput {
  name: string;
  description: string;
  start_date: string; // ISO date string
  end_date: string; // ISO date string
  organizer_id: Id;
  location: string;
  max_participants: number;
  image?: string | null; // Changed from image: null to match Event interface
}

export interface UpdateOneInput {
  id: number;
  name?: string;
  description?: string;
  start_date?: string; // ISO date string
  end_date?: string; // ISO date string
  location: string;
  max_participants: number;
  image?: string | null; // Added to match Event interface
  // No organizer_id here, which is correct as we don't want to allow changing the organizer
}
export type UpsertOneInput = CreateOneInput | UpdateOneInput;

const useEvents: UseItems<Event, CreateOneInput, UpdateOneInput> = (
  opts: UseItemsOptions = defaultOptions
) => {
  const apiRoutes = ApiRoutes.Events; // Import API routes for events
  const useItemsHook = useItems<Event, CreateOneInput, UpdateOneInput>(apiRoutes, opts);
  return useItemsHook;
};

export default useEvents;
