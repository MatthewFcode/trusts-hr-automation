import request from 'superagent'
import {
  User,
  GetUserFunction,
  AddUserFunction,
  UpdateUserFunction,
  DeleteUserFunction,
} from '../../models/users.ts'

const rootURL =
  typeof document !== 'undefined'
    ? new URL(`/api/v1`, document.baseURI)
    : 'http://localhost:3000/api/v1'

// function for the GET request to our servers back end and sending the auth0 token
export async function getUserById({
  token,
}: GetUserFunction): Promise<User | undefined> {
  try {
    const result = await request
      .get(`${rootURL}/users`)
      .set('Authorization', `Bearer ${token}`)
    return result.body
  } catch (err) {
    console.log(err)
  }
}

// function for posting a user object with an auth0token || uses form data as a type as Post request that send data over a HTTP network request are encoded so FormData gives us a type for this
export async function postUser({
  formData,
  token,
}: AddUserFunction): Promise<User | undefined> {
  try {
    const result = await request
      .post(`${rootURL}/users`)
      .send(formData)
      .set('Authorization', `Bearer ${token}`)
    return result.body
  } catch (err) {
    console.log(err)
  }
}

// function for sending the auth0Id plus the updated user form data
export async function updateUser({
  formData,
  token,
}: UpdateUserFunction): Promise<User | undefined> {
  try {
    const result = await request
      .patch(`${rootURL}/users`)
      .send(formData)
      .set('Authorization', `Bearer ${token}`)
    return result.body
  } catch (err) {
    console.log(err)
  }
}

export async function deleteUser({
  token,
}: DeleteUserFunction): Promise<number | undefined> {
  try {
    const response = await request
      .delete(`${rootURL}/users`)
      .set('Authorization', `Bearer ${token}`)
    return response.status
  } catch (err) {
    console.log(err)
  }
}
