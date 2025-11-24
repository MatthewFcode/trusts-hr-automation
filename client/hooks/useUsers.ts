import { getUserById, postUser, updateUser, deleteUser } from '../apis/users.ts'
import { useAuth0 } from '@auth0/auth0-react'
import {
  useQuery,
  useMutation,
  MutationFunction,
  useQueryClient,
} from '@tanstack/react-query'

export function useUserById() {
  const { user, getAccessTokenSilently } = useAuth0()

  const query = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      getUserById({ token })
    },
    enabled: !!user, // only run the query when the user is logged in
  })
  return query
}

export function useUserMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })

  return mutation
}

export function usePostUser() {
  return useUserMutation(postUser)
}

export function useUpdateUser() {
  return useUserMutation(updateUser)
}

export function useDeleteUser() {
  return useUserMutation(deleteUser)
}
