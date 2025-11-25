import connection from './connection.ts'
import { User } from '../../models/users.ts'

const db = connection
export async function getUserByAuth0Id(
  auth0Id: string,
): Promise<User | undefined> {
  try {
    const user = await db('users')
      .select()
      .where('users.auth0Id', auth0Id)
      .first()
    console.log(user)
    return user
  } catch (err) {
    console.log(err)
  }
}

// export async function addUser(newUser: User): Promise<User | undefined> {
//   try {
//     const user = await db('users').insert(newUser).returning('*').first()
//     console.log(user)
//     return user
//   } catch (err) {
//     console.log(err)
//   }
// }

export async function addUser(newUser: User): Promise<User | undefined> {
  try {
    console.log('=== DB: addUser called ===')
    console.log('New user data:', newUser)

    const user = await db('users').insert(newUser).returning('*').first()

    console.log('=== DB: User inserted successfully ===')
    console.log('Inserted user:', user)
    return user
  } catch (err) {
    console.error('=== DB: addUser ERROR ===')
    console.error(err)
    throw err // ← Important: re-throw so the route handler catches it
  }
}

export async function updateUser(
  auth0Id: string,
  updatedUser: User,
): Promise<User | undefined> {
  try {
    await db('users').where('users.auth0Id', auth0Id).update(updatedUser)
    const updated = await db('users')
      .select()
      .where('users.auth0Id', auth0Id)
      .first()
    console.log(updated)
    return updated
  } catch (err) {
    console.log(err)
  }
}

export async function deleteUser(auth0Id: string): Promise<number | undefined> {
  try {
    const deleted = await db('users').where('auth0Id', auth0Id).delete()
    console.log('Deleted:', deleted)
    return deleted
  } catch (err) {
    console.log(err)
  }
}

// function for updating the last active row
export async function updateUserActivity(auth0Id: string) {
  await db('users')
    .where('users.auth0Id', auth0Id)
    .update({ last_active: new Date().toISOString() })
}
