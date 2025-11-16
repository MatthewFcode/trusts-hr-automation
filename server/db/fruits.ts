import connection from './connection.ts'

export async function getAllFruits(db = connection) {
  return db('fruit').select()
}
