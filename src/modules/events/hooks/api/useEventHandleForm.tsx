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
  location: string;
  max_participants: number;
  image: File | null; // Changed to File type for proper form handling
}

export interface UpdateOneInput {
  name?: string;
  description?: string;
  start_date?: string; // ISO date string
  end_date?: string; // ISO date string
  location?: string;
  max_participants?: number;
  image?: File | null; // Changed to File type
}

export type UpsertOneInput = CreateOneInput | UpdateOneInput;

const useEvents: UseItems<Event, CreateOneInput, UpdateOneInput> = (
  opts: UseItemsOptions = defaultOptions
) => {
  const apiRoutes = ApiRoutes.Events;

  // Get base hook functionality
  const baseHook = useItems<Event, CreateOneInput, UpdateOneInput>(apiRoutes, opts);

  // Override createOne to properly handle file uploads
  const createOne = async (input: CreateOneInput, options?: any) => {
    // Create a FormData object to properly handle file uploads
    const formData = new FormData();

    // Add all text fields to FormData
    Object.entries(input).forEach(([key, value]) => {
      if (key !== 'image' || value === null) {
        formData.append(key, String(value));
      }
    });

    // Add image file if it exists
    if (input.image instanceof File) {
      formData.append('image', input.image);
    }

    // Call the base createOne with FormData
    return baseHook.createOne(formData as any, {
      ...options,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  // Similarly override updateOne if needed
  const updateOne = async (id: Id, input: UpdateOneInput, options?: any) => {
    // Similar FormData handling as createOne
    const formData = new FormData();

    Object.entries(input).forEach(([key, value]) => {
      if (key !== 'image' || value === null) {
        if (value !== undefined) {
          formData.append(key, String(value));
        }
      }
    });

    if (input.image instanceof File) {
      formData.append('image', input.image);
    }

    return baseHook.updateOne(id, formData as any, {
      ...options,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  return {
    ...baseHook,
    createOne,
    updateOne,
  };
};

export default useEvents;
