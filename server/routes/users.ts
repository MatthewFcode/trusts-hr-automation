import { Router } from 'express'
import checkJwt, { JwtRequest } from '../auth0'
import * as db from '../db/users.ts'
import cloudinary from '../cloudinary.js'
import multer from 'multer'
import { unlink } from 'node:fs/promises'
import { User } from '../../models/users.ts'

const router = Router()
const upload = multer({ dest: 'tmp/' })

// need a general get route that doesnt get users by anthing but just gets their name - profile pic and their last activity needs to hit /activity API route lol

router.get('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub

    const userById = await db.getUserByAuth0Id(auth0Id as string)
    if (userById && auth0Id) {
      await db.updateUserActivity(auth0Id as string)
    }
    res.status(200).json(userById)
  } catch (err) {
    console.log(err)
    res.status(500).json('Internal Server Error')
  }
})

router.get('/activity', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub
    if (auth0Id) {
      const result = await db.getAllUserActivity()
      res.status(200).json(result)
    } else {
      console.log('Needs to be authenicated to view other user activity')
    }
  } catch (err) {
    console.log(err)
    res.status(500).json('Internal Server Error')
  }
})

router.post(
  '/',
  upload.single('profilePhoto'),
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

// router.post(
//   '/',
//   upload.single('profilePhoto'),
//   checkJwt,
//   async (req: JwtRequest, res) => {
//     console.log('=== POST /users Debug Info ===')
//     const auth0Id = req.auth?.sub
//     console.log('Auth0 ID:', auth0Id)
//     console.log('File received:', req.file ? 'YES' : 'NO')
//     if (req.file) {
//       console.log('File details:', {
//         filename: req.file.filename,
//         path: req.file.path,
//         mimetype: req.file.mimetype,
//         size: req.file.size,
//       })
//     }
//     console.log('Body:', req.body)

//     try {
//       if (!auth0Id) {
//         console.error('ERROR: No Auth0 ID found')
//         return res.status(401).json({ error: 'No Auth0 ID' })
//       }

//       let profilePhoto = ''
//       if (req.file) {
//         console.log('Attempting Cloudinary upload...')
//         try {
//           const result = await cloudinary.uploader.upload(req.file.path, {
//             folder: 'trusts_automation',
//             transformation: [{ width: 300, height: 300, crop: 'fill' }],
//           })
//           console.log('Cloudinary upload successful:', result.secure_url)
//           profilePhoto = result.secure_url
//           await unlink(req.file.path)
//         } catch (cloudinaryErr) {
//           console.error('Cloudinary upload failed:', cloudinaryErr)
//           // Clean up temp file
//           if (req.file?.path) {
//             try {
//               await unlink(req.file.path)
//             } catch (unlinkErr) {
//               console.error('Failed to delete temp file:', unlinkErr)
//             }
//           }
//           return res.status(500).json({
//             error: 'Failed to upload image',
//             details:
//               cloudinaryErr instanceof Error
//                 ? cloudinaryErr.message
//                 : 'Unknown error',
//           })
//         }
//       }

//       console.log('Creating user object...')
//       const user: User = {
//         auth0Id,
//         username: req.body.username,
//         position: req.body.position,
//         profile_photo: profilePhoto,
//       }

//       console.log('Calling db.addUser...')
//       const newUser = await db.addUser(user)
//       console.log('User created successfully:', newUser)
//       res.status(201).json(newUser)
//     } catch (err) {
//       console.error('=== POST /users ERROR ===')
//       console.error(
//         'Error type:',
//         err instanceof Error ? err.constructor.name : typeof err,
//       )
//       console.error('Error message:', err instanceof Error ? err.message : err)
//       console.error(
//         'Error stack:',
//         err instanceof Error ? err.stack : 'No stack trace',
//       )
//       res.status(500).json({
//         error: 'Failed to create user',
//         details: err instanceof Error ? err.message : 'Unknown error',
//       })
//     }
//   },
//)

router.patch(
  '/',
  upload.single('profilePhoto'),
  checkJwt,
  async (req: JwtRequest, res) => {
    try {
      const auth0Id = req.auth?.sub
      const currentUser = await db.getUserByAuth0Id(auth0Id as string)

      let profilePhoto = currentUser?.profile_photo

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

          // Try to clean temp file
          try {
            await unlink(req.file.path)
          } catch (unlinkErr) {
            console.error('Failed to delete temp file:', unlinkErr)
          }

          return res.status(500).json({ error: 'Failed to upload image' })
        }
      }
      console.log(profilePhoto)

      const updatedUser: User = {
        auth0Id: auth0Id as string,
        username: req.body.username,
        position: req.body.position,
        profile_photo: profilePhoto as string,
      }

      const result = await db.updateUser(auth0Id as string, updatedUser)
      console.log(result)
      res.status(200).json(result)
    } catch (err) {
      console.log(err)
      res.status(400).json('bad patch request')
    }
  },
)

router.delete('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub
    await db.deleteUser(auth0Id as string)

    res.status(204).send()
  } catch (err) {
    console.log(err)
    res.status(400).json('Bad delete request')
  }
})

export default router
