import request from 'superagent'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getFruits() {
  const response = await request.get(`${rootURL}/fruits`)
  return response.body.fruits as string[]
}
 function plusA (a: number , b: number) {
  return a + b
 }
