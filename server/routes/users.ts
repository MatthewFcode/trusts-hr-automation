import { Router } from 'express'
import checkJwt, { JwtRequest } from '../auth0'
import * as db from '../db/users.ts'
import cloudinary from '../cloudinary.js'
import multer from 'multer'
import { unlink } from 'node:fs/promises'
import { User } from '../../models/users.ts'

const router = Router()
const upload = multer({ dest: 'tmp/' })

router.get('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub
    const userById = await db.getUserByAuth0Id(auth0Id as string)
    res.status(200).json(userById)
  } catch (err) {
    console.log(err)
    res.status(500).json('Internal Server Error')
  }
})

router.post(
  '/',
  upload.single('profile_photo'),
  checkJwt,
  async (req: JwtRequest, res) => {
    try {
      const auth0Id = req.auth?.sub

      let profilePhoto = ''

      if (req.file) {
        try {
          const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'trusts_automation',
            transformation: [{ width: 300, height: 300, crop: 'fill' }],
          })

          profilePhoto = result.secure_url

          await unlink(req.file.path)
        } catch (uploadErr) {
          console.error('Cloudinary upload error:', uploadErr)
          // Clean up temp file even if upload fails
          try {
            await unlink(req.file.path)
          } catch (unlinkErr) {
            console.error('Failed to delete temp file:', unlinkErr)
          }
          throw new Error('Failed to upload image')
        }
      }
      console.log(profilePhoto)

      const user: User = {
        auth0Id: auth0Id as string,
        username: req.body.username,
        position: req.body.position,
        profile_photo: profilePhoto,
      }

      const newUser = await db.addUser(user)
      console.log(newUser)
      res.status(201).json(newUser)
    } catch (err) {
      console.log(err)
    }
  },
)

export default router
