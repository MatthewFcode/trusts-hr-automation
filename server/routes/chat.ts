import * as db from '../db/chat.ts'
import { Router } from 'express'
import checkJwt, { JwtRequest } from '../auth0'
import camelcaseKeys from 'camelcase-keys'

const router = Router()

// helper function for formatting the time for message_sent to a human readable version to use on the front end you egg
function formatTime(dateString: string) {
  return new Date(dateString).toLocaleString()
}

// checking the auth0Id as middleware then getting all chats from the db
router.get('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    // const auth0Id = req.auth?.sub
    const snakeCase = await db.getAllChats() // object with the snake case
    const result = snakeCase ? camelcaseKeys(snakeCase, { deep: true }) : [] // camelcase library for convertin object keys from snake to camel case
    // ternary above checks if snakeCase doesn't evaluate to undefined and if it doesnt runs the conversion but if it does it returns an empty array
    console.log(result)
    res.status(200).json(result)
  } catch (err) {
    console.log(err)
    res.status(500).json('Internal Server Error')
  }
})

router.post('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub

    const convert = {
      auth0Id: auth0Id,
      message: req.body.message,
      time_sent: formatTime(new Date().toISOString()),
    }
    console.log(convert)
    res.status(201).json(convert)
  } catch (err) {
    console.log(err)
  }
})

// getting the auth0Id of the user || gettinf the chat id from the req.body and the updated chat
router.patch('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub

    // const result = await db.udpdate()
  }
})