import connection from './connection'
import { Chat } from '../../models/chat.ts'

const db = connection

export async function getAllChats(): Promise<Chat[] | undefined> {
  try {
    const response = await db('chat')
      .join('users', 'chat.message_auth0Id', 'users.auth0Id')
      .select(
        'chat.message',
        'chat.time_sent',
        'chat.message_auth0Id',
        'users.username',
        'users.profile_photo',
      )
    console.log(response)
    return response
  } catch (err) {
    console.log(err)
  }
}

export async function postChat(newChat: {
  message: string
  time_sent: string
  auth0Id: string
}): Promise<Chat | undefined> {
  try {
    const result = await db('chat').insert(newChat).returning('*').first()
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
  }
}

export async function updateSpecificChat(
  id: number,
  auth0Id: string,
  updatedChat: { message: string; time_sent: string },
): Promise<Chat | undefined> {
  try {
    await db('chat')
      .where('chat.id', id)
      .andWhere('chat.message_auth0Id', auth0Id)
      .update(updatedChat)
    const result = await db('chat')
      .join('users', 'chat.message_auth0Id', 'users.auth0Id')
      .select(
        'chat.message',
        'chat.time_sent',
        'chat.message_auth0Id',
        'users.username',
        'users.profile_photo',
      )
      .first()
    return result
  } catch (err) {
    console.log(err)
  }
}

export async function deleteMessage(
  id: number,
  auth0Id: string,
): Promise<number | undefined> {
  try {
    const deleted = await db('chat')
      .where('chat.id', id)
      .andWhere('chat.message_auth0Id', auth0Id)
      .delete()
    console.log('deleted', deleted)
    return deleted
  } catch (err) {
    console.log(err)
  }
}
