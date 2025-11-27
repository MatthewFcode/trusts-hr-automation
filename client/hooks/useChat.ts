import { getAllChats, postChat, updateChat, deleteChat } from '../apis/chat.ts'
import { ClientChatPostUpdateFunctionObject } from '../../models/chat.ts'
import { useAuth0 } from '@auth0/auth0-react'
import {
  useQuery,
  useMutation,
  MutationFunction,
  useQueryClient,
} from '@tanstack/react-query'

export function useGetAllChats() {
  const { user, getAccessTokenSilently } = useAuth0()
  const result = useQuery({
    queryKey: ['all-chats'],
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      return getAllChats({ token })
    },
    enabled: !!user,
  })
  return result
}

export function useChatMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-chats'] })
    },
  })

  return mutation
}
//REFRESHER ALERT: React mutations can only accept one thing as a parameter which is why when passing multiple parameters through a mutation we have to use wrapper functions
export function usePostChat() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0()

  const usePostChatWrapper = async (
    newChat: ClientChatPostUpdateFunctionObject,
  ) => {
    let token = undefined
    if (isAuthenticated) {
      token = await getAccessTokenSilently()
    }
    if (!token) {
      throw new Error('User is not authenticated')
    }
    return postChat({ token }, newChat)
  }
  return useChatMutation(usePostChatWrapper)
}

export function useUpdateChat() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0()
  const useUpdateFunctionWrapper = async ({
    id,
    updatedChat,
  }: {
    id: number
    updatedChat: ClientChatPostUpdateFunctionObject
  }) => {
    let token = undefined
    if (isAuthenticated) {
      token = await getAccessTokenSilently()
    }
    if (!token) {
      throw new Error('User is not authenticated')
    }
    return updateChat(id, { token }, updatedChat)
  }
  return useChatMutation(useUpdateFunctionWrapper)
}

export function useDeleteChat() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0()
  const useDeleteChatWrapper = async (id: number) => {
    let token = undefined
    if (isAuthenticated) {
      token = await getAccessTokenSilently()
    }
    if (!token) {
      throw new Error('User is not authenticatd')
    }
    deleteChat(id, { token })
  }
  return useChatMutation(useDeleteChatWrapper)
}
