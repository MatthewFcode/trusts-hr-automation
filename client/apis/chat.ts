import request from 'superagent'
import {
  ChatCamel,
  ClientChatFunction,
  ClientPostFunctionObject,
} from '../../models/chat.ts'

const rootURL = new URL('/api/v1', document.baseURI)

// making HTTP GET request to the Express serever backend and sending the auth0Id
export async function getAllChats({
  token,
}: ClientChatFunction): Promise<ChatCamel | undefined> {
  try {
    const result = await request
      .get(`${rootURL}/chat`)
      .set('Authorization', `Bearer ${token}`)

    console.log(result)
    return result.body // REFRESHER ALERT: we need to access the body because HTTP request wrap the request in headers and other metadat about the request but our JSON data lives in the body object of this request
  } catch (err) {
    console.log(err)
  }
}

// function for posting a new chat object and setting the auth0Id
export async function postChat(
  { token }: ClientChatFunction,
  newChat: ClientPostFunctionObject,
): Promise<ChatCamel | undefined> {
  try {
    const result = await request
      .post(`${rootURL}/chat`)
      .send(newChat) // REFRESHER ALERT: the .send() form superagent is putting our JSON object that we want to POST into the body section of our HTTP request
      .set('Authorization', `Bearer ${token}`)

    console.log(result)
    return result.body
  } catch (err) {
    console.log(err)
  }
}

// export async function updateChat(id: number)
