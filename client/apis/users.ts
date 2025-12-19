import request from 'superagent'
import {
  User,
  GetUserFunction,
  AddUserFunction,
  UpdateUserFunction,
  DeleteUserFunction,
  UserActivitySnake,
} from '../../models/users.ts'

//const rootURL = new URL(`/api/v1`, document.baseURI) // document.baseURI is a built in browser property that give us the base URL of the current HTML document
const rootURL = '/api/v1'
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

// GET function for getting all user acitivity data
export async function getAllUserActivity({
  token,
}: GetUserFunction): Promise<UserActivitySnake[] | undefined> {
  try {
    const result = await request
      .get(`${rootURL}/users/activity`)
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
      .set('Authorization', `Bearer ${token}`)
      .send(formData)

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
