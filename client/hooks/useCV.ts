import {
  useMutation,
  //useQueryClient,
  MutationFunction,
} from '@tanstack/react-query'
import { postCV } from '../apis/cv-reader.ts'

export function useCVMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  //const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: [''] })
    },
  })

  return mutation
}

export function usePostCV() {
  return useCVMutation(postCV)
}
// Query functions go here e.g. useAddFruit
/* function useAddFruit() {
  return useFruitsMutation(addFruit)
} */
