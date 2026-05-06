// example React Query hooks — wraps API functions from __entity__.api.ts
import { useQuery } from '@tanstack/react-query'

import { fetchExampleItem, fetchExampleItems } from './__entity__.api'

// list query — no params
export const useExampleItems = () => {
  return useQuery({
    queryKey: ['example-items'],
    queryFn: fetchExampleItems,
  })
}

// detail query — parameterised; disabled when id is absent
export const useExampleItem = (id: number | null) => {
  return useQuery({
    queryKey: ['example-items', id],
    queryFn: () => fetchExampleItem(id!),
    enabled: id !== null,

    // select transforms the raw response before returning to the component
    select: (data) => ({
      ...data,
      displayName: data.name.toUpperCase(),
    }),
  })
}
