import { useState, useMemo } from 'react';

interface UseSearchProps<T> {
  data: T[];
  searchKeys: string[];
  customFilter?: (item: T, query: string) => boolean;
}

export function useSearch<T>({ data, searchKeys, customFilter }: UseSearchProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(() => {
    if (!searchQuery) return data;

    const lowerQuery = searchQuery.toLowerCase();

    return data.filter((item) => {
      // Check custom filter first
      if (customFilter?.(item, lowerQuery)) return true;

      // Check through specified keys
      return searchKeys.some((key) => {
        const value = item[key as keyof T];
        return typeof value === 'string'
          ? value.toLowerCase().includes(lowerQuery)
          : String(value).includes(lowerQuery);
      });
    });
  }, [data, searchQuery, searchKeys, customFilter]);

  return { filteredData, searchQuery, setSearchQuery };
}
